// Info: ContainedListItem molecule [S2 interactive]. A navigation list item with
// label, optional children, and press handling. Uses M1 (a11y) for aria-*
// state and M2 (usePressKeys) for keyboard activation. role="listitem".
//   label       -> primary text for the nav item
//   onPress     -> press handler
//   children    -> additional content (optional)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the ContainedListItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ContainedListItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function ContainedListItem (props) {

    const {
      label, onPress, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({});

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'button',
      onActivate: onPress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'listitem',
        accessibilityLabel: label,
        style: [
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_primary',
        weight: 'medium',
        style: Style.utilities['flex_1']
      }, label),
      children || null
    );

  };

};
