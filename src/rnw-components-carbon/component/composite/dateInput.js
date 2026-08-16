// Info: DateInput composite [S2 interactive]. A simple text input with date
// format validation (YYYY-MM-DD). Uses M1 (a11y), M8 (useControllableState).
// Role input.
//   value       -> string YYYY-MM-DD (controlled)
//   defaultValue-> string YYYY-MM-DD (uncontrolled)
//   onChange    -> callback receiving the date string
//   disabled    -> boolean
//   invalid     -> boolean
'use strict';


/********************************************************************
Build the DateInput composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The DateInput component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars
  return function DateInput (props) {

    const {
      value, defaultValue, onChange, disabled, invalid,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const isDisabled = !!disabled;
    const isInvalid = !!invalid;

    // Controlled/uncontrolled state for the date value
    const state = Parts.ControllableState({
      value: value,
      defaultValue: defaultValue || '',
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    // Auto-insert dashes as the user types YYYY-MM-DD
    const handleChange = function (text) {
      const digits = text.replace(/[^0-9]/g, '');
      let normalized;
      if (digits.length <= 4) {
        normalized = digits;
      } else if (digits.length <= 6) {
        normalized = digits.substring(0, 4) + '-' + digits.substring(4);
      } else {
        normalized = digits.substring(0, 4) + '-' + digits.substring(4, 6) + '-' + digits.substring(6, 8);
      }
      setValue(normalized);
    };

    // Build aria state props
    const ariaStateProps = Parts.A11y.state({
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
        accessibilityLabel: accessibilityLabel || 'Date input',
        placeholder: 'YYYY-MM-DD',
        keyboardType: 'numeric',
        maxLength: 10,
        style: style
      }, ariaStateProps, rest)
    );

  };

};
