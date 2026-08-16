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
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SideNavSwitcher component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function SideNavSwitcher (props) {

    const {
      label, options, onChange, style,
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
    const ariaProps = Parts.A11y.state({});

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'button',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      RNView,
      Object.assign({
        style: [
          Style.utilities['flex_col'],
          style
        ]
      }, rest),
      label
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_secondary',
          style: Style.utilities['m_b_xs']
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
            Style.utilities['flex_row'],
            Style.utilities['align_center'],
            Style.utilities['justify_between'],
            Style.utilities['p_h_md'],
            Style.utilities['p_v_sm'],
            Style.utilities['border_default'],
            Style.utilities['br_sm']
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
