// Info: Checkbox atom [S2 interactive]. A Pressable with role="checkbox"
// that toggles checked state. Supports 'mixed' for indeterminate.
// Uses M1 (a11y) for aria-* state and M2 (usePressKeys) for Space activation.
//   checked       -> true | false | 'mixed'
//   onChange      -> callback receiving the next boolean
//   disabled      -> boolean
//   label         -> string (rendered as Text child)
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the Checkbox atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Checkbox component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function Checkbox (props) {

    const {
      checked, onChange, disabled, label, style, isRtlActive, // eslint-disable-line no-unused-vars
      accessibilityLabel, ...rest
    } = props;

    const React = Lib.React;

    // Handle toggle: 'mixed' and false both go to true, true goes to false
    const handlePress = function () {
      if (disabled) {
        return;
      }
      if (Lib.Utils.isFunction(onChange)) {
        onChange(checked === true ? false : true);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      disabled: !!disabled,
      checked: checked
    });

    // Build keyboard activation props (Space activates checkbox role)
    const pressKeysProps = Parts.PressKeys({
      role: 'checkbox',
      onActivate: handlePress,
      disabled: !!disabled
    });

    // Resolve the checkbox box style based on checked state
    const colorMap = Style.tokens.Color;
    const boxBase = {
      width: 20,
      height: 20,
      borderRadius: 2,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center'
    };

    let boxStyle;

    if (checked === 'mixed') {
      boxStyle = {
        backgroundColor: colorMap.APP_PRIMARY || '#0f62fe',
        borderColor: colorMap.APP_PRIMARY || '#0f62fe'
      };
    } else if (checked === true) {
      boxStyle = {
        backgroundColor: colorMap.APP_PRIMARY || '#0f62fe',
        borderColor: colorMap.APP_PRIMARY || '#0f62fe'
      };
    } else {
      boxStyle = {
        backgroundColor: 'transparent',
        borderColor: disabled
          ? (colorMap.TEXT_MUTED || '#999')
          : (colorMap.BORDER || '#a8a8a8')
      };
    }

    // Checkmark for checked state
    let checkmark = null;

    if (checked === true) {
      checkmark = React.createElement(Registry.Text, {
        size: 'sm',
        color: 'text_on_primary',
        weight: 'bold'
      }, '\u2713');
    } else if (checked === 'mixed') {
      checkmark = React.createElement(RNView, {
        style: {
          width: 10,
          height: 2,
          backgroundColor: colorMap.TEXT_ON_PRIMARY || '#ffffff'
        }
      });
    }

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: handlePress,
        disabled: !!disabled,
        accessibilityRole: 'checkbox',
        accessibilityLabel: accessibilityLabel || label,
        style: [Style.utilities['flex_row'], Style.utilities['align_center'], style]
      }, ariaProps, pressKeysProps, rest),
      React.createElement(RNView, { style: [boxBase, boxStyle, Style.utilities['m_e_xs']] }, checkmark),
      label ? React.createElement(Registry.Text, {
        size: 'md',
        color: disabled ? 'text_muted' : 'text_primary'
      }, label) : null
    );

  };

};
