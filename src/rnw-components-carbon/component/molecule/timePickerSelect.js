// Info: TimePickerSelect molecule [S2 interactive]. A select dropdown for
// choosing time values. Composes Registry.Select. Role="combobox".
//   value       -> string (controlled, the selected time value)
//   onChange    -> callback receiving the selected value
//   options     -> array of { value, label }
//   style       -> custom style overrides
'use strict';


/********************************************************************
Build the TimePickerSelect molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The TimePickerSelect component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) { // eslint-disable-line no-unused-vars

  return function TimePickerSelect (props) {

    const {
      value, onChange, options, style,
      isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      Registry.Select,
      Object.assign({
        value: value,
        onChange: onChange,
        options: options || [],
        accessibilityRole: 'combobox',
        style: style
      }, rest)
    );

  };

};
