// Info: TableToolbarAction molecule [S2 interactive]. A single action button
// in the table toolbar. Uses role="button" for screen reader semantics and
// M2 (usePressKeys) for keyboard activation. Composes Icon and Text atoms.
//   icon        -> string (icon glyph name)
//   onPress     -> function (press handler)
//   label       -> string (button text / accessibility label)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the TableToolbarAction molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableToolbarAction component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function TableToolbarAction (props) {

    const {
      icon, onPress, label, style,
      ...rest
    } = props;

    const React = Lib.React;

    const pressKeysProps = Parts.PressKeys({
      role: 'button',
      onActivate: onPress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'button',
        accessibilityLabel: label,
        style: [
          Style.utilities['p_h_sm'],
          Style.utilities['p_v_sm'],
          Style.utilities['br_md'],
          style
        ]
      }, pressKeysProps, rest),
      icon
        ? React.createElement(Registry.Icon, {
          name: icon,
          size: 'md',
          color: 'TEXT_PRIMARY'
        })
        : null,
      label
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_primary'
        }, label)
        : null
    );

  };

};
