// Info: HeaderMenu molecule [S2 interactive]. A dropdown menu in the header.
// Uses role="menu" for screen reader semantics. Uses M1 (a11y) for aria-*
// state and M2 (usePressKeys) for keyboard activation on the toggle.
//   label       -> string (menu label)
//   children    -> HeaderMenuItem elements
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the HeaderMenu molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The HeaderMenu component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function HeaderMenu (props) {

    const {
      label, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({});

    // Build keyboard activation props for the menu toggle
    const pressKeysProps = Parts.PressKeys({
      role: 'button',
      onActivate: function () {},
      disabled: false
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'menu',
        accessibilityLabel: label,
        style: [
          Style.utilities['flex_col'],
          style
        ]
      }, rest),
      React.createElement(
        Pressable,
        Object.assign({
          onPress: function () {},
          accessibilityRole: 'button',
          accessibilityLabel: label
        }, ariaProps, pressKeysProps, {
          style: [
            Style.utilities['flex_row'],
            Style.utilities['align_center'],
            Style.utilities['p_h_sm'],
            Style.utilities['p_v_sm']
          ]
        }),
        React.createElement(Registry.Text, {
          size: 'md',
          color: 'text_primary'
        }, label || ''),
        React.createElement(Registry.Icon, {
          name: 'chevron--down',
          size: 'sm',
          color: 'TEXT_SECONDARY',
          style: Style.utilities['m_s_xs']
        })
      ),
      children
    );

  };

};
