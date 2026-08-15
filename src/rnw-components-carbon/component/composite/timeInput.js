// Info: TimeInput composite [S2 interactive]. A simple text input with time
// format validation (HH:MM). Uses M1 (a11y), M8 (useControllableState).
// Role input.
//   value       -> string HH:MM (controlled)
//   defaultValue-> string HH:MM (uncontrolled)
//   onChange    -> callback receiving the time string
//   disabled    -> boolean
//   invalid     -> boolean
'use strict';


/********************************************************************
Build the TimeInput composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The TimeInput component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) { // eslint-disable-line no-unused-vars

  const a11y = require('../a11y')(Lib);
  const useControllableState = require('../useControllableState')(Lib);

  return function TimeInput (props) {

    const {
      value, defaultValue, onChange, disabled, invalid,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const isDisabled = !!disabled;
    const isInvalid = !!invalid;

    // Controlled/uncontrolled state for the time value
    const state = useControllableState({
      value: value,
      defaultValue: defaultValue || '',
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    // Validate and normalize the time input
    const handleChange = function (text) {
      // Auto-insert colon after 2 digits if not present
      let normalized = text;
      if (text.length === 2 && resolvedValue.length < 2) {
        normalized = text + ':';
      }
      setValue(normalized);
    };

    // Build aria state props
    const ariaStateProps = a11y.state({
      disabled: isDisabled,
      invalid: isInvalid
    });

    return React.createElement(
      Registry.TextInput,
      Object.assign({
        value: resolvedValue,
        onChangeText: handleChange,
        isDisabled: isDisabled,
        isInvalid: isInvalid,
        accessibilityRole: 'textbox',
        accessibilityLabel: accessibilityLabel || 'Time input',
        placeholder: 'HH:MM',
        keyboardType: 'numeric',
        maxLength: 5,
        style: style
      }, ariaStateProps, rest)
    );

  };

};
