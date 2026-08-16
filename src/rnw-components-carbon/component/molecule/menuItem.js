// Info: MenuItem molecule [S2 interactive]. A menu item with role="menuitem".
// Uses M1 (a11y) for aria-* state and M2 (usePressKeys) for keyboard activation.
//   label       -> string
//   onPress     -> function
//   disabled    -> boolean
//   icon        -> string (optional leading icon)
//   shortcut    -> string (optional shortcut hint)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the MenuItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The MenuItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function MenuItem (props) {

    const {
      label, onPress, disabled, icon, shortcut, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      disabled: !!disabled
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
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
        accessibilityLabel: label,
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      icon
        ? React.createElement(Registry.Icon, {
          name: icon,
          size: 'sm',
          color: 'TEXT_SECONDARY',
          style: Style.utilities['m_e_sm']
        })
        : null,
      React.createElement(Registry.Text, {
        size: 'md',
        color: disabled ? 'text_muted' : 'text_primary',
        style: { flex: 1 }
      }, label),
      shortcut
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_muted'
        }, shortcut)
        : null
    );

  };

};
