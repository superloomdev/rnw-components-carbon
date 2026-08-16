// Info: HeaderMenuButton molecule [S2 interactive]. A menu toggle button
// for the Header composite with role="button". Uses M1 (a11y) for
// aria-expanded when active, and M2 (usePressKeys) for keyboard activation.
//   onPress     -> function (press handler)
//   label       -> string (button label)
//   isActive    -> boolean, whether the menu is currently open
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the HeaderMenuButton molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The HeaderMenuButton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function HeaderMenuButton (props) {

    const {
      onPress, label, isActive, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    // Handle press
    const handlePress = function () {
      if (Lib.Utils.isFunction(onPress)) {
        onPress();
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      expanded: !!isActive
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'button',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: handlePress,
        accessibilityRole: 'button',
        accessibilityLabel: label || 'Menu',
        style: [
          Style.utilities['p_h_sm'],
          Style.utilities['p_v_sm'],
          Style.utilities['br_sm'],
          {
            backgroundColor: isActive
              ? (colorMap.BACKGROUND_SECONDARY || '#f4f4f4')
              : 'transparent'
          },
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_primary'
      }, '\u2630')
    );

  };

};
