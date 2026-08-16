// Info: StructuredListInput molecule [S2 interactive]. A radio/checkbox
// input in a structured list. Uses role="radio" for screen reader
// semantics. Uses M1 (a11y) for aria-* state and M2 (usePressKeys) for
// keyboard activation.
//   name        -> string (radio group name)
//   value       -> string (input value)
//   checked     -> boolean (whether this input is selected)
//   onChange    -> function (called with the value)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the StructuredListInput molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The StructuredListInput component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function StructuredListInput (props) {

    const {
      name, value, checked, onChange, style,
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;
    const isChecked = !!checked;

    // Handle selection
    const handlePress = function () {
      if (Lib.Utils.isFunction(onChange)) {
        onChange(value);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      checked: isChecked
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'radio',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: handlePress,
        accessibilityRole: 'radio',
        accessibilityLabel: name || value
      }, ariaProps, pressKeysProps, {
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['justify_center'],
          {
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: isChecked
              ? (colorMap.APP_PRIMARY || '#0f62fe')
              : (colorMap.BORDER || '#a8a8a8')
          },
          style
        ]
      }, rest),
      isChecked
        ? React.createElement(RNView, {
          style: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colorMap.APP_PRIMARY || '#0f62fe'
          }
        })
        : null
    );

  };

};
