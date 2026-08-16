// Info: OverflowMenuItem molecule [S2 interactive]. A single item in an
// overflow menu. Uses role="menuitem" for screen reader semantics. Uses M1
// (a11y) for aria-* state and M2 (usePressKeys) for keyboard activation.
//   text        -> string (item label)
//   onPress     -> function (press handler)
//   disabled    -> boolean
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the OverflowMenuItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The OverflowMenuItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function OverflowMenuItem (props) {

    const {
      text, onPress, disabled, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      disabled: !!disabled
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'menuitem',
      onActivate: onPress,
      disabled: !!disabled
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: disabled ? null : onPress,
        disabled: !!disabled,
        accessibilityRole: 'menuitem',
        accessibilityLabel: text
      }, ariaProps, pressKeysProps, {
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_sm'],
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: disabled ? 'text_muted' : 'text_primary',
        style: { flex: 1 }
      }, text)
    );

  };

};
