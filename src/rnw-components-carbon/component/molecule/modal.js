// Info: Modal molecule [S3 overlay] (CANONICAL). A dialog overlay with focus
// trap, Escape/back dismissal, outside-press dismissal, and focus restoration.
// Uses Overlay (M4) for stacking and useFocusTrap for focus management.
//
// S3 obligations (all six, from the plan):
//   1. On open: record the previously focused element and move focus into the overlay
//   2. While open: trap focus so Tab cycles within the overlay
//   3. On Escape (web) or hardware back (Android): close
//   4. On outside press: close
//   5. On close: restore focus to the recorded element
//   6. Set aria-modal on the overlay container for screen reader trapping
//
// Overlay integration: registers with the host so a Popover opened from
// inside a Modal paints above it. The host assigns zIndex from the stack
// position. On native, uses RN Modal for hardware back support.
'use strict';

const { View: RNView, Pressable, Modal: RNModal, Platform } = require('react-native');


/********************************************************************
Build the Modal molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Modal component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  // Build the focus trap hook once
  // Build the overlay host hook once
  const useOverlay = Parts.Overlay.useOverlay;

  return function Modal (props) {

    // Destructure props
    const {
      isOpen, onClose, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      initialFocusRef, finalFocusRef, ...rest
    } = props;

    const React = Lib.React;

    // Use the focus trap hook for all six S3 obligations
    // trap=true for Modal: Tab cycles within the dialog
    const focusTrap = Parts.FocusTrap({
      isOpen: isOpen,
      onClose: onClose,
      trap: true,
      initialFocusRef: initialFocusRef,
      finalFocusRef: finalFocusRef
    });

    const containerRef = focusTrap.containerRef;
    const onOutsidePress = focusTrap.onOutsidePress;
    const accessibilityProps = focusTrap.accessibilityProps;

    // Backdrop: pressable overlay that closes on outside press
    const renderBackdrop = function () {
      return React.createElement(Pressable, {
        onPress: onOutsidePress,
        style: {
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)'
        }
      });
    };

    // Content container with focus trap accessibility props
    const renderContent = function () {
      return React.createElement(
        RNView,
        Object.assign({
          ref: containerRef,
          style: [
            Style.utilities['background_surface'],
            Style.utilities['br_lg'],
            Style.utilities['p_a_lg'],
            Style.utilities['border_default'],
            {
              margin: 24,
              maxWidth: 600,
              alignSelf: 'center'
            },
            style
          ]
        }, accessibilityProps, rest),
        children
      );
    };

    // On native, use RN Modal for native modal behavior + hardware back
    if (Platform.OS !== 'web') {

      if (!isOpen) {
        return null;
      }

      return React.createElement(
        RNModal,
        {
          visible: isOpen,
          transparent: true,
          animationType: 'fade',
          onRequestClose: onClose
        },
        renderBackdrop(),
        renderContent()
      );

    }

    // On web, register with Overlay for stacking
    const overlay = useOverlay({
      isOpen: !!isOpen,
      trap: true,
      onClose: onClose,
      render: function () {
        return React.createElement(
          React.Fragment,
          null,
          renderBackdrop(),
          renderContent()
        );
      }
    });

    // When no Overlay is mounted, fall back to fixed positioning
    if (overlay.layerIndex < 0) {

      if (!isOpen) {
        return null;
      }

      return React.createElement(
        RNView,
        {
          style: {
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 1000,
            alignItems: 'center',
            justifyContent: 'center'
          }
        },
        renderBackdrop(),
        renderContent()
      );

    }

    // Overlay renders the content; return null here
    return null;

  };

};
