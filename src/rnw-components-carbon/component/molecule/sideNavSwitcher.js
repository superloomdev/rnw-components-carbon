// Info: SideNavSwitcher molecule [S2 interactive]. A switcher in the side
// nav. Uses role="button" for screen reader semantics. Uses M1 (a11y) for
// aria-* state and M2 (usePressKeys) for keyboard activation.
//   label       -> string (switcher label)
//   options     -> array (switcher options)
//   onChange    -> function (called with selected option)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the SideNavSwitcher molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The SideNavSwitcher component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function SideNavSwitcher (props) {

    const {
      label, options, onChange, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Handle press (cycles through options)
    const handlePress = function () {
      if (Array.isArray(options) && options.length > 0 && Lib.Utils.isFunction(onChange)) {
        onChange(options[0]);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({});

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      RNView,
      Object.assign({
        style: [
          Style_.utilities['flex_col'],
          style
        ]
      }, rest),
      label
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_secondary',
          style: Style_.utilities['m_b_xs']
        }, label)
        : null,
      React.createElement(
        Pressable,
        Object.assign({
          onPress: handlePress,
          accessibilityRole: 'button',
          accessibilityLabel: label || 'Switcher'
        }, ariaProps, pressKeysProps, {
          style: [
            Style_.utilities['flex_row'],
            Style_.utilities['align_center'],
            Style_.utilities['justify_between'],
            Style_.utilities['p_h_md'],
            Style_.utilities['p_v_sm'],
            Style_.utilities['border_default'],
            Style_.utilities['br_sm']
          ]
        }),
        React.createElement(Registry.Text, {
          size: 'md',
          color: 'text_primary'
        }, Array.isArray(options) && options.length > 0 ? String(options[0]) : ''),
        React.createElement(Registry.Icon, {
          name: 'chevron--down',
          size: 'sm',
          color: 'TEXT_SECONDARY'
        })
      )
    );

  };

};
