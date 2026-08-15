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
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The IconButton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);

  return function IconButton (props) {

    const {
      name, onPress, disabled, size, color, label, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
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
          Style_.utilities['p_h_sm'],
          Style_.utilities['p_v_sm'],
          Style_.utilities['br_md'],
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
