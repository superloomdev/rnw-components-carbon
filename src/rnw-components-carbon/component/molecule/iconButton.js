// Info: IconButton molecule [S2 interactive]. A button with only an icon.
// Uses M1 (a11y) for aria-* state and M5 (useAnchoredPosition) when used
// as an anchor for overlays. Composes Icon atom.
//   name        -> string (icon glyph name)
//   onPress     -> function
//   disabled    -> boolean
//   size        -> string (icon size token, default 'md')
//   color       -> string (icon color token)
//   label       -> string (accessibility label, required)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the IconButton molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The IconButton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function IconButton (props) {

    const {
      name, onPress, disabled, size, color, label, style,
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      disabled: !!disabled
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: disabled ? null : onPress,
        disabled: !!disabled,
        accessibilityRole: 'button',
        accessibilityLabel: label,
        style: [
          Style.utilities['p_h_sm'],
          Style.utilities['p_v_sm'],
          Style.utilities['br_md'],
          style
        ]
      }, ariaProps, rest),
      React.createElement(Registry.Icon, {
        name: name,
        size: size || 'md',
        color: color || 'TEXT_PRIMARY'
      })
    );

  };

};
