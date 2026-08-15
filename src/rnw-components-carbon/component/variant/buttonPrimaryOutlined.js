// Info: ButtonPrimaryOutlined (STRUCTURED VARIANT). An outlined/ghost variant
// of the canonical ButtonPrimary: transparent surface, primary border +
// primary label, subtle primary tint on hover/press. It DEVIATES in
// composition but still consumes the token system, so it stays in sync with
// theme changes. Registered in the variant registry (Component.variant) -
// discoverable, not a loose one-off.
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the ButtonPrimaryOutlined variant.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ButtonPrimaryOutlined component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function ButtonPrimaryOutlined (props) {

    // Destructure props
    const { title, icon, onPress, disabled, fullWidth, style, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    const React = Lib.React;
    const [hovered, setHovered] = React.useState(false);

    // Container base styles
    const containerBase = [
      Style_.utilities['br_md'],
      Style_.utilities['p_h_lg'],
      Style_.utilities['p_v_md'],
      Style_.utilities['border_primary'],
      Style_.utilities['flex_center'],
      fullWidth ? Style_.utilities['flex_stretch'] : null
    ];

    // Resolve background from state
    const resolveBackground = function (pressed) {

      if (disabled) {
        return null;
      }

      if (pressed || hovered) {
        return Style_.utilities['background_app_primary_subtle'];
      }

      return Style_.utilities['background_surface'];

    };

    // Build accessibility state
    const accessibilityState = {
      disabled: !!disabled
    };

    return Lib.React.createElement(
      Pressable,
      Object.assign({
        onPress: disabled ? null : onPress,
        disabled: disabled,
        accessibilityRole: 'button',
        accessibilityLabel: title,
        accessibilityState: accessibilityState,
        onHoverIn: function () {
          setHovered(true);
        },
        onHoverOut: function () {
          setHovered(false);
        },
        style: function (state) {
          return [...containerBase, resolveBackground(state.pressed), style];
        }
      }, rest),
      icon
        ? Lib.React.createElement(Registry.Icon, {
          name: icon, size: 'md', color: 'APP_PRIMARY', style: Style_.utilities['m_e_sm']
        })
        : null,
      Lib.React.createElement(Registry.Text, {
        color: 'app_primary', weight: 'semibold', size: 'md'
      }, title)
    );

  };

};
