// Info: ComposedModal composite [S3/S4 overlay]. A modal dialog with
// ModalHeader, ModalBody, ModalFooter coordination. Uses M1 (a11y),
// M4 (Overlay), M7 (createCompoundContext). Uses useFocusTrap with
// trap: true. Composes ModalHeader, ModalBody, ModalFooter molecules.
//   isOpen      -> boolean
//   onClose     -> function
//   children    -> ModalHeader, ModalBody, ModalFooter elements
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable, Modal: RNModal, Platform } = require('react-native');


/********************************************************************
Build the ComposedModal composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ComposedModal component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  const useOverlay = Parts.Overlay.useOverlay;

  return function ComposedModal (props) {

    const {
      isOpen, onClose, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      initialFocusRef, ...rest
    } = props;

    const React = Lib.React;

    // Focus trap with trap: true for modal
    const focusTrap = Parts.FocusTrap({
      isOpen: isOpen,
      onClose: onClose,
      trap: true,
      initialFocusRef: initialFocusRef
    });

    // Render the modal content
    const renderContent = function () {
      return React.createElement(
        RNView,
        Object.assign({
          ref: focusTrap.containerRef,
          accessibilityRole: 'dialog',
          style: [
            Style.utilities['background_surface'],
            Style.utilities['br_lg'],
            Style.utilities['shadow_lg'],
            { margin: 24, maxWidth: 600, alignSelf: 'center' },
            style
          ]
        }, focusTrap.accessibilityProps, rest),
        children
      );
    };

    // Backdrop
    const renderBackdrop = function () {
      return React.createElement(Pressable, {
        onPress: focusTrap.onOutsidePress,
        style: {
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)'
        }
      });
    };

    // On native, use RN Modal
    if (Platform.OS !== 'web') {
      if (!isOpen) {
        return null;
      }
      return React.createElement(
        RNModal,
        { visible: true, transparent: true, animationType: 'fade', onRequestClose: onClose },
        renderBackdrop(),
        renderContent()
      );
    }

    // On web, use Overlay
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

    if (overlay.layerIndex < 0 && isOpen) {
      return React.createElement(
        RNView,
        { style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, alignItems: 'center', justifyContent: 'center' } },
        renderBackdrop(),
        renderContent()
      );
    }

    return null;

  };

};
