// Info: RadioButton atom [S2 interactive]. A Pressable with role="radio"
// that sets checked state on press. Uses M1 (a11y) for aria-* state and
// M2 (usePressKeys) for Space activation.
//   checked    -> boolean
//   onChange   -> callback receiving the next boolean (always true)
//   disabled   -> boolean
//   label      -> string (rendered as Text child)
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the RadioButton atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The RadioButton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function RadioButton (props) {

    const {
      checked, onChange, disabled, label, style, isRtlActive, // eslint-disable-line no-unused-vars
      accessibilityLabel, ...rest
    } = props;

    const React = Lib.React;

    // Radio buttons always set to true on press
    const handlePress = function () {
      if (disabled) {
        return;
      }
      if (Lib.Utils.isFunction(onChange)) {
        onChange(true);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      disabled: !!disabled,
      checked: !!checked
    });

    // Build keyboard activation props (Space activates radio role)
    const pressKeysProps = Parts.PressKeys({
      role: 'radio',
      onActivate: handlePress,
      disabled: !!disabled
    });

    // Resolve the radio circle style
    const colorMap = Style.tokens.Color;
    const circleBase = {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center'
    };

    const circleStyle = checked
      ? {
        borderColor: disabled
          ? (colorMap.TEXT_MUTED || '#999')
          : (colorMap.APP_PRIMARY || '#0f62fe')
      }
      : {
        borderColor: disabled
          ? (colorMap.TEXT_MUTED || '#999')
          : (colorMap.BORDER || '#a8a8a8')
      };

    // Inner dot for checked state
    let innerDot = null;

    if (checked) {
      innerDot = React.createElement(RNView, {
        style: {
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: disabled
            ? (colorMap.TEXT_MUTED || '#999')
            : (colorMap.APP_PRIMARY || '#0f62fe')
        }
      });
    }

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: handlePress,
        disabled: !!disabled,
        accessibilityRole: 'radio',
        accessibilityLabel: accessibilityLabel || label,
        style: [Style.utilities['flex_row'], Style.utilities['align_center'], style]
      }, ariaProps, pressKeysProps, rest),
      React.createElement(RNView, { style: [circleBase, circleStyle, Style.utilities['m_e_xs']] }, innerDot),
      label ? React.createElement(Registry.Text, {
        size: 'md',
        color: disabled ? 'text_muted' : 'text_primary'
      }, label) : null
    );

  };

};
