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

  const Lib = {
    Utils: shared_libs.Utils,
    Debug: shared_libs.Debug,
    React: shared_libs.React,
    Device: shared_libs.Device
  };

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

      const dashIndex = placement.indexOf('-');

      if (dashIndex < 0) {
        return { base: placement, alignment: null };
      }

      return { base: placement.substring(0, dashIndex), alignment: placement.substring(dashIndex + 1) };

    }

  };

  // Pure function: compute position from a measured rect
  const computePosition = function (rect, placement, offset, vw, vh, flip) {

    const parsed = _AnchoredPosition.parsePlacement(placement);
    let basePlacement = parsed.base;
    const alignment = parsed.alignment;

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

    const initialState = {
      position: null,
      actualPlacement: placement
    };

    const state = Lib.React.useState(initialState);
    const pos = state[0];
    const setPos = state[1];


    // Measure the anchor and compute the overlay position
    const measure = Lib.React.useCallback(function () {

      if (!anchorRef || !anchorRef.current) {
        return;
      }

      const anchor = anchorRef.current;

      // Web: use getBoundingClientRect
      if (RNPlatform.OS === 'web' && typeof anchor.getBoundingClientRect === 'function') {

        const rect = anchor.getBoundingClientRect();
        const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 0;

        const computed = computePosition(rect, placement, offset, vw, vh, flip);

        setPos({
          position: computed.position,
          actualPlacement: computed.actualPlacement
        });

        return;
      }

      // Native: use measureInWindow (async)
      if (Lib.Utils.isFunction(anchor.measureInWindow)) {

        anchor.measureInWindow(function (x, y, width, height) {

          const rect = { left: x, top: y, width: width, height: height,
            right: x + width, bottom: y + height };

          let vw = 0;
          let vh = 0;

          if (Lib.Device && Lib.Utils.isFunction(Lib.Device.getViewport)) {
            const vp = Lib.Device.getViewport();
            if (vp && vp.success) {
              vw = vp.width;
              vh = vp.height;
            }
          }

          const computed = computePosition(rect, placement, offset, vw, vh, flip);

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


  return useAnchoredPosition;

};/////////////////////////// createInterface END //////////////////////////////
