// Info: ButtonPrimary molecule [S2 interactive] (CANONICAL). Composes atoms
// (Icon + Text) inside a Pressable and drives every visual from tokens +
// interaction state:
//   bg:  APP_PRIMARY -> _HOVERED (web) / _PRESSED / _DISABLED
//   fg:  TEXT_ON_PRIMARY (auto-contrast against the primary)
// Hover is web-only (Pressable onHoverIn/Out); press works on all platforms.
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the ButtonPrimary molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ButtonPrimary component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  // Build the a11y translator once per factory
  const a11y = require('../a11y')(Lib);

  return function ButtonPrimary (props) {

    // Destructure props
    const { title, icon, onPress, disabled, fullWidth, style, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    const React = Lib.React;
    const [hovered, setHovered] = React.useState(false);


    // Resolve background class from state
    const resolveBackground = function (pressed) {

      if (disabled) {
        return Style_.utilities['background_app_primary_disabled'];
      }

      if (pressed) {
        return Style_.utilities['background_app_primary_pressed'];
      }

      if (hovered) {
        return Style_.utilities['background_app_primary_hovered'];
      }

      return Style_.utilities['background_app_primary'];

    };

    // Container base styles
    const containerBase = [
      Style_.utilities['br_md'],
      Style_.utilities['p_h_lg'],
      Style_.utilities['p_v_md'],
      Style_.utilities['flex_center'],
      fullWidth ? Style_.utilities['flex_stretch'] : null
    ];

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      disabled: !!disabled
    });

    return Lib.React.createElement(
      Pressable,
      Object.assign({
        onPress: disabled ? null : onPress,
        disabled: disabled,
        accessibilityRole: 'button',
        accessibilityLabel: title,
        onHoverIn: function () {
          setHovered(true);
        },
        onHoverOut: function () {
          setHovered(false);
        },
        style: function (state) {
          return [...containerBase, resolveBackground(state.pressed), style];
        }
      }, ariaProps, rest),
      // Children: optional leading icon + label, both in the on-primary color
      function (state) { // eslint-disable-line no-unused-vars
        return Lib.React.createElement(
          React.Fragment,
          null,
          icon
            ? Lib.React.createElement(Registry.Icon, {
              name: icon,
              size: 'md',
              color: 'TEXT_ON_PRIMARY',
              style: Style_.utilities['m_e_sm']
            })
            : null,
          Lib.React.createElement(Registry.Text, {
            color: 'text_on_primary',
            weight: 'semibold',
            size: 'md'
          }, title)
        );
      }
    );

  };

};
