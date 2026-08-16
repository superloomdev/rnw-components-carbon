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
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The StructuredListInput component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function StructuredListInput (props) {

    const {
      name, value, checked, onChange, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;
    const isChecked = !!checked;

    // Handle selection
    const handlePress = function () {
      if (Lib.Utils.isFunction(onChange)) {
        onChange(value);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      checked: isChecked
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
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
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['justify_center'],
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
