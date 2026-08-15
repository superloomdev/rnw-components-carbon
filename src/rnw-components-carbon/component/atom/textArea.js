// Info: TextArea atom [S2 interactive]. A multiline text input with token
// consumption for border and background. Uses M1 (a11y) for aria-* state and
// M8 (useControllableState) for controlled/uncontrolled value.
//   value         -> string (controlled)
//   defaultValue  -> string (uncontrolled)
//   onChange      -> callback receiving the text value
//   disabled      -> boolean
//   invalid       -> boolean
//   placeholder   -> string
//   rows          -> number (visual height in lines, default 4)
'use strict';

const { TextInput: RNTextInput } = require('react-native');


/********************************************************************
Build the TextArea atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The TextArea component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const useControllableState = require('../useControllableState')(Lib);

  return function TextArea (props) {

    const {
      value, defaultValue, onChange, disabled, invalid, placeholder, rows,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Controlled/uncontrolled state
    const state = useControllableState({
      value: value,
      defaultValue: defaultValue || '',
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    const isDisabled = !!disabled;
    const isInvalid = !!invalid;

    // Base styles from tokens
    const colorMap = Style_.tokens.Color;
    const base = [
      Style_.utilities['p_h_md'],
      Style_.utilities['p_v_sm'],
      Style_.utilities['br_md'],
      Style_.utilities['border_default'],
      isInvalid
        ? { borderColor: colorMap.STATUS_DANGER || '#da1e28' }
        : null,
      isDisabled
        ? { backgroundColor: colorMap.BACKGROUND_SECONDARY || '#f4f4f4' }
        : Style_.utilities['background_surface'],
      {
        minHeight: (rows || 4) * 24,
        textAlignVertical: 'top'
      }
    ];

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      disabled: isDisabled,
      invalid: isInvalid
    });

    return React.createElement(
      RNTextInput,
      Object.assign({
        value: resolvedValue,
        onChangeText: setValue,
        placeholder: placeholder,
        placeholderTextColor: colorMap.TEXT_MUTED || '#999',
        editable: !isDisabled,
        multiline: true,
        numberOfLines: rows || 4,
        accessibilityRole: 'textbox',
        accessibilityLabel: accessibilityLabel,
        style: [...base, style]
      }, ariaProps, rest)
    );

  };

};
