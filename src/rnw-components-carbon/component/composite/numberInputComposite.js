// Info: NumberInputComposite composite [S2 interactive]. Wraps the NumberInput
// molecule with a label and optional unit display. Uses M1 (a11y),
// M8 (useControllableState).
//   label       -> string (label text above the input)
//   value       -> number (controlled)
//   defaultValue-> number (uncontrolled)
//   onChange    -> callback receiving the next number
//   min         -> number
//   max         -> number
//   step        -> number (default 1)
//   unit        -> string (optional unit suffix, e.g. 'px', '%')
//   disabled    -> boolean
//   invalid     -> boolean
'use strict';


/********************************************************************
Build the NumberInputComposite composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The NumberInputComposite component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const useControllableState = require('../useControllableState')(Lib);

  return function NumberInputComposite (props) {

    const {
      label, value, defaultValue, onChange, min, max, step, unit, disabled, invalid,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const isDisabled = !!disabled;
    const isInvalid = !!invalid;

    // Controlled/uncontrolled state for the number value
    const state = useControllableState({
      value: value,
      defaultValue: Lib.Utils.isNumber(defaultValue) ? defaultValue : 0,
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    // Render the label if provided
    const labelElement = label
      ? React.createElement(Registry.Text, {
        size: 'sm',
        color: isDisabled ? 'text_muted' : 'text_primary',
        weight: 'medium',
        style: Style_.utilities['m_b_xs']
      }, label)
      : null;

    return React.createElement(
      Registry.View,
      Object.assign({ style: [Style_.utilities['m_b_md'], style] }, rest),
      labelElement,
      React.createElement(
        Registry.View,
        { style: [Style_.utilities['flex_row'], Style_.utilities['align_center']] },
        React.createElement(
          Registry.View,
          { style: Style_.utilities['flex_1'] },
          React.createElement(Registry.NumberInput, {
            value: resolvedValue,
            onChange: setValue,
            min: min,
            max: max,
            step: step,
            disabled: isDisabled,
            invalid: isInvalid,
            accessibilityLabel: accessibilityLabel || label
          })
        ),
        unit
          ? React.createElement(Registry.Text, {
            size: 'md',
            color: 'text_secondary',
            style: [Style_.utilities['p_h_sm']]
          }, unit)
          : null
      )
    );

  };

};
