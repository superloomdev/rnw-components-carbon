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
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The HeaderMenu component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function HeaderMenu (props) {

    const {
      label, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({});

    // Build keyboard activation props for the menu toggle
    const pressKeysProps = usePressKeys({
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
          Style_.utilities['flex_col'],
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
            Style_.utilities['flex_row'],
            Style_.utilities['align_center'],
            Style_.utilities['p_h_sm'],
            Style_.utilities['p_v_sm']
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
          style: Style_.utilities['m_s_xs']
        })
      ),
      children
    );

  };

};
