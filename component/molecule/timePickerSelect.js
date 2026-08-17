// Info: TimePickerSelect molecule [S2 interactive]. A select dropdown for
// choosing time values. Composes Registry.Select. Role="combobox".
//   value       -> string (controlled, the selected time value)
//   onChange    -> callback receiving the selected value
//   options     -> array of { value, label }
//   style       -> custom style overrides


// Imports



/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the TimePickerSelect molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TimePickerSelect component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  /////////////////////////// Static Constants START ////////////////////////////


  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const TimePickerSelect = function TimePickerSelect (props) {


    const {
      value, onChange, options, style,
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
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _TimePickerSelect = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return TimePickerSelect;

}/////////////////////////// Component Factory END /////////////////////////////
