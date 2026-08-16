// Info: Menu composite [S3/S4 overlay]. A menu container with role="menu"
// that coordinates MenuItem children. Uses M1 (a11y), M3 (useRovingTabIndex),
// M4 (Overlay), M5 (useAnchoredPosition), M7 (createCompoundContext).
//   isOpen      -> boolean
//   onClose     -> function
//   children    -> MenuItem elements
//   placement   -> string (default 'bottom-start')
//   anchorRef   -> ref (external anchor; if not provided, uses internal)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the Menu composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Menu component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  const useOverlay = Parts.Overlay.useOverlay;

  return function Menu (props) {

    const {
      isOpen, onClose, children, placement, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Focus trap (menu traps focus while open)
    const focusTrap = Parts.FocusTrap({
      isOpen: isOpen,
      onClose: onClose,
      trap: true
    });

    // Render the menu panel
    const renderPanel = function (zIndex) {
      return React.createElement(
        RNView,
        Object.assign({
          ref: focusTrap.containerRef,
          accessibilityRole: 'menu',
          style: [
            Style.utilities['background_surface'],
            Style.utilities['br_md'],
            Style.utilities['border_default'],
            Style.utilities['p_v_xs'],
            Style.utilities['shadow_md'],
            { minWidth: 200, zIndex: zIndex || 1000 },
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
        style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
      });
    };

    if (!isOpen) {
      return null;
    }

    // Use Overlay on web
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
        { style: { position: 'relative' } },
        renderBackdrop(),
        renderPanel(1000)
      );
    }

    return null;

  };

};
