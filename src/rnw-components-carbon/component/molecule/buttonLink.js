// Info: ButtonLink molecule [S2 interactive] (CANONICAL). A text-only button
// styled as a link. Composes the Text atom inside a Pressable. Uses the
// primary color for the label and a subtle background on hover/press.
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the ButtonLink molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ButtonLink component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function ButtonLink (props) {

    // Destructure props
    const { title, onPress, disabled, style, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    const React = Lib.React;
    const [hovered, setHovered] = React.useState(false);

    // Container base styles
    const containerBase = [
      Style_.utilities['p_h_sm'],
      Style_.utilities['p_v_xs'],
      Style_.utilities['br_sm']
    ];

    // Resolve background from state
    const resolveBackground = function (pressed) {

      if (disabled) {
        return null;
      }

      if (pressed || hovered) {
        return Style_.utilities['background_app_primary_subtle'];
      }

      return null;

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
        accessibilityRole: 'link',
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
      Lib.React.createElement(Registry.Text, {
        color: disabled ? 'text_muted' : 'app_primary',
        weight: 'medium',
        size: 'md'
      }, title)
    );

  };

};
