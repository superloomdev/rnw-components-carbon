// Info: Anchored position calculation for overlays.
//
// For Popover, Tooltip, Toggletip, Menu, OverflowMenu, Dropdown, Select,
// ComboBox, MultiSelect, AILabel.
//
// Measures the anchor and the viewport, computes a position for the
// requested placement, and flips to the opposite side when the content
// would overflow the viewport. Web path uses getBoundingClientRect.
// Native path uses measureInWindow, which is async, so the first frame
// renders with opacity 0 and the measured position is applied on the
// next frame.
//
// Does not add @floating-ui/react or @floating-ui/react-native. The
// former is DOM-only; the latter drops middleware fidelity and adds a
// dependency for behavior we need in ~40 lines.

// Imports
import { Platform as RNPlatform } from 'react-native';


/////////////////////////// Module-Loader START ////////////////////////////////

/********************************************************************
    Factory part loader. Uniform parts signature.

    @param {Object} shared_libs - Lib container with Utils, Debug, React, Device
    @param {Object} config - Merged config from the parent module
    @param {Object} errors - Frozen error catalog from the parent module

    @return {Function} - useAnchoredPosition hook
*********************************************************************/
export default function (shared_libs, config, errors) { // eslint-disable-line no-unused-vars

  // Extract the shared libraries we need from the provided container
  const Lib = {
    Utils: shared_libs.Utils,
    Debug: shared_libs.Debug,
    React: shared_libs.React,
    Device: shared_libs.Device
  };

  // Delegate to createInterface to build and return the hook
  return createInterface(Lib);

}/////////////////////////// Module-Loader END /////////////////////////////////



/////////////////////////// createInterface START //////////////////////////////

/********************************************************************
    Build the useAnchoredPosition hook.

    @param {Object} Lib - The shared Lib container (requires React)

    @return {Function} - useAnchoredPosition(options) -> { position, actualPlacement, measure }
*********************************************************************/
const createInterface = function (Lib) {


  ///////////////////////////Private Functions START///////////////////////////////

  const _AnchoredPosition = {

    // Parse a placement string into base and alignment parts
    parsePlacement: function (placement) {

      // Locate the dash separating base placement from alignment
      const dashIndex = placement.indexOf('-');

      // Return early when no alignment suffix is present
      if (dashIndex < 0) {
        // Return the placement as-is with no alignment
        return { base: placement, alignment: null };
      }

      // Split the placement string into base and alignment components
      return { base: placement.substring(0, dashIndex), alignment: placement.substring(dashIndex + 1) };

    }

  };

  // Pure function: compute position from a measured rect
  const computePosition = function (rect, placement, offset, vw, vh, flip) {

    // Parse the placement string into base and alignment parts
    const parsed = _AnchoredPosition.parsePlacement(placement);
    let basePlacement = parsed.base;
    const alignment = parsed.alignment;

    // Initialize tracking variables for the computed position
    let actualPlacement = placement;
    let top = 0;
    let left = 0;

    // Flip if the content would overflow the viewport
    if (flip) {

      if (basePlacement === 'bottom' && rect.bottom + offset > vh) {
        actualPlacement = (alignment ? 'top-' + alignment : 'top');
        basePlacement = 'top';
      } else if (basePlacement === 'top' && rect.top - offset < 0) {
        actualPlacement = (alignment ? 'bottom-' + alignment : 'bottom');
        basePlacement = 'bottom';
      } else if (basePlacement === 'right' && rect.right + offset > vw) {
        actualPlacement = (alignment ? 'left-' + alignment : 'left');
        basePlacement = 'left';
      } else if (basePlacement === 'left' && rect.left - offset < 0) {
        actualPlacement = (alignment ? 'right-' + alignment : 'right');
        basePlacement = 'right';
      }

    }

    // Compute base position
    if (basePlacement === 'bottom') {
      top = rect.bottom + offset;
    } else if (basePlacement === 'top') {
      top = rect.top - offset;
    } else if (basePlacement === 'right') {
      left = rect.right + offset;
    } else if (basePlacement === 'left') {
      left = rect.left - offset;
    }

    // Apply alignment for vertical placements
    if (basePlacement === 'top' || basePlacement === 'bottom') {

      if (alignment === 'start') {
        left = rect.left;
      } else if (alignment === 'end') {
        left = rect.right;
      } else {
        // Center
        left = rect.left + rect.width / 2;
      }

    } else {

      // Horizontal placements: align vertically
      if (alignment === 'start') {
        top = rect.top;
      } else if (alignment === 'end') {
        top = rect.bottom;
      } else {
        top = rect.top + rect.height / 2;
      }

    }

    // Return the final position and the placement that was actually used
    return {
      position: { top: top, left: left },
      actualPlacement: actualPlacement
    };

  };


  ///////////////////////////Public Functions START//////////////////////////////

  const useAnchoredPosition = function (options) {

    // Destructure positioning options: placement, offset, flip, anchorRef
    const placement = options.placement || 'bottom';
    const offset = options.offset || 8;
    const flip = options.flip !== false;
    const anchorRef = options.anchorRef;

    // Define the initial state before any measurement has occurred
    const initialState = {
      position: null,
      actualPlacement: placement
    };

    // Create the React state slot that holds the current position
    const state = Lib.React.useState(initialState);
    const pos = state[0];
    const setPos = state[1];


    // Measure the anchor and compute the overlay position
    const measure = Lib.React.useCallback(function () {

      // Bail out when there is no anchor element to measure
      if (!anchorRef || !anchorRef.current) {
        // Return early since there is nothing to position against
        return;
      }

      // Grab the anchor element for measurement
      const anchor = anchorRef.current;

      // Web: use getBoundingClientRect
      if (RNPlatform.OS === 'web' && typeof anchor.getBoundingClientRect === 'function') {

        // Measure the anchor rect and viewport dimensions on web
        const rect = anchor.getBoundingClientRect();
        const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 0;

        // Compute the overlay position from the measured rect
        const computed = computePosition(rect, placement, offset, vw, vh, flip);

        // Update state with the computed position and placement
        setPos({
          position: computed.position,
          actualPlacement: computed.actualPlacement
        });

        // Return after web measurement since there is no async path needed
        return;
      }

      // Native: use measureInWindow (async)
      if (Lib.Utils.isFunction(anchor.measureInWindow)) {

        anchor.measureInWindow(function (x, y, width, height) {

          // Build a normalized rect from the native measurement callback
          const rect = { left: x, top: y, width: width, height: height,
            right: x + width, bottom: y + height };

          // Default viewport dimensions to zero until measured
          let vw = 0;
          let vh = 0;

          // Query the device for viewport dimensions when available
          if (Lib.Device && Lib.Utils.isFunction(Lib.Device.getViewport)) {
            const vp = Lib.Device.getViewport();
            if (vp && vp.success) {
              vw = vp.width;
              vh = vp.height;
            }
          }

          // Compute the overlay position from the measured rect
          const computed = computePosition(rect, placement, offset, vw, vh, flip);

          // Update state with the computed position and placement
          setPos({
            position: computed.position,
            actualPlacement: computed.actualPlacement
          });

        });

      }

    }, [anchorRef, placement, offset, flip]);


    // Return the computed position, actual placement, and measure callback
    return {
      position: pos.position,
      actualPlacement: pos.actualPlacement,
      measure: measure
    };

  };


  // Return the public hook as the module's interface
  return useAnchoredPosition;

};/////////////////////////// createInterface END //////////////////////////////
