// Info: SliderInput composite [S2 interactive]. Wraps the Slider atom with a
// label and value display. Uses M1 (a11y), M8 (useControllableState).
//   label       -> string (label text above the slider)
//   value       -> number (controlled)
//   defaultValue-> number (uncontrolled)
//   onChange    -> callback receiving the next number
//   min         -> number (default 0)
//   max         -> number (default 100)
//   step        -> number (default 1)
//   disabled    -> boolean
//   invalid     -> boolean
'use strict';


/********************************************************************
Build the SliderInput composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The SliderInput component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const useControllableState = require('../useControllableState')(Lib);

  return function SliderInput (props) {

    const {
      label, value, defaultValue, onChange, min, max, step, disabled, invalid,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const isDisabled = !!disabled;
    const isInvalid = !!invalid;

    // Controlled/uncontrolled state for the slider value
    const state = useControllableState({
      value: value,
      defaultValue: Lib.Utils.isNumber(defaultValue) ? defaultValue : (min || 0),
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    const minVal = Lib.Utils.isNumber(min) ? min : 0;
    const maxVal = Lib.Utils.isNumber(max) ? max : 100;

    // Render the label if provided
    const labelElement = label
      ? React.createElement(
        Registry.Text,
        {
          size: 'sm',
          color: isDisabled ? 'text_muted' : 'text_primary',
          weight: 'medium',
          style: Style_.utilities['m_b_xs']
        },
        label
      )
      : null;

    // Render the value display
    const valueElement = React.createElement(
      Registry.Text,
      {
        size: 'sm',
        color: isInvalid ? 'status_danger' : 'text_secondary',
        weight: 'medium'
      },
      String(Math.round(resolvedValue))
    );

    return React.createElement(
      Registry.View,
      Object.assign({ style: [Style_.utilities['m_b_md'], style] }, rest),
      labelElement,
      React.createElement(
        Registry.View,
        {
          style: [
            Style_.utilities['flex_row'],
            Style_.utilities['align_center']
          ]
        },
        React.createElement(
          Registry.View,
          { style: Style_.utilities['flex_1'] },
          React.createElement(Registry.Slider, {
            value: resolvedValue,
            onChange: setValue,
            min: minVal,
            max: maxVal,
            step: step,
            disabled: isDisabled,
            accessibilityLabel: accessibilityLabel || label
          })
        ),
        React.createElement(
          Registry.View,
          { style: [Style_.utilities['p_h_sm'], { minWidth: 40, alignItems: 'flex-end' }] },
          valueElement
        )
      )
    );

  };

};
