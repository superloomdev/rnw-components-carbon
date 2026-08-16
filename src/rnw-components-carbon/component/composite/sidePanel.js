// Info: SidePanel composite [S3 overlay]. A side panel that slides in from
// the right. Uses M1 (a11y), M4 (Overlay). Uses useFocusTrap with
// trap: true. Composes View and Text atoms.
//   isOpen      -> boolean
//   onClose     -> function
//   title       -> string (optional panel header)
//   children    -> panel content
//   side        -> 'left' | 'right' (default 'right')
//   width       -> number (default 320)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable, Modal: RNModal, Platform } = require('react-native');


/********************************************************************
Build the SidePanel composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The SidePanel component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const useFocusTrap = require('../useFocusTrap')(Lib);
  const overlay = require('../Overlay')(Lib);
  const useOverlay = overlay.useOverlay;

  return function SidePanel (props) {

    const {
      isOpen, onClose, title, children, side, width, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const panelSide = side || 'right';
    const panelWidth = width || 320;

    // Focus trap
    const focusTrap = useFocusTrap({
      isOpen: isOpen,
      onClose: onClose,
      trap: true
    });

    // Render panel content
    const renderPanel = function () {
      return React.createElement(
        RNView,
        Object.assign({
          ref: focusTrap.containerRef,
          accessibilityRole: 'dialog',
          style: [
            Style_.utilities['background_surface'],
            Style_.utilities['shadow_lg'],
            {
              position: 'absolute',
              top: 0, bottom: 0,
              [panelSide]: 0,
              width: panelWidth
            },
            style
          ]
        }, focusTrap.accessibilityProps, rest),
        title
          ? React.createElement(Registry.Text, {
            size: 'xl',
            color: 'text_primary',
            weight: 'semibold',
            style: [Style_.utilities['p_h_lg'], Style_.utilities['p_v_md']]
          }, title)
          : null,
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

    if (!isOpen) {
      return null;
    }

    // On native, use RN Modal
    if (Platform.OS !== 'web') {
      return React.createElement(
        RNModal,
        { visible: true, transparent: true, animationType: 'slide', onRequestClose: onClose },
        renderBackdrop(),
        renderPanel()
      );
    }

    // On web, use Overlay
    const overlay = useOverlay({
      isOpen: true,
      trap: true,
      onClose: onClose,
      render: function () {
        return React.createElement(
          React.Fragment,
          null,
          renderBackdrop(),
          renderPanel()
        );
      }
    });

    if (overlay.layerIndex < 0) {
      return React.createElement(
        RNView,
        { style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 } },
        renderBackdrop(),
        renderPanel()
      );
    }

    return null;

  };

};
