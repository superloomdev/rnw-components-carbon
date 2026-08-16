// Info: SideNavLink molecule [S2 interactive]. A navigation link in the side
// nav. Uses role="link" for screen reader semantics. Uses M1 (a11y) for
// aria-* state and M2 (usePressKeys) for keyboard activation.
//   text        -> string (link label)
//   onPress     -> function (press handler)
//   icon        -> string (optional leading icon name)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the SideNavLink molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SideNavLink component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function SideNavLink (props) {

    const {
      text, onPress, icon, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({});

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'link',
      onActivate: onPress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'link',
        accessibilityLabel: text
      }, ariaProps, pressKeysProps, {
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          style
        ]
      }, rest),
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
        color: 'text_primary',
        style: { flex: 1 }
      }, text || '')
    );

  };

};
