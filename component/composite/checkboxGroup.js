// Info: CheckboxGroup composite [S4 compound]. A group of checkboxes where
// multiple can be selected. Uses A11y, CompoundContext,
// ControllableState. Role group.
//   values      -> array (controlled)
//   defaultValues-> array (uncontrolled)
//   onChange    -> callback receiving the selected values array
//   options     -> array of { value, label, disabled }
//   disabled    -> boolean (disables the entire group)
//   name        -> string (group name for form submission)


// Imports
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the CheckboxGroup composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The CheckboxGroup component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////

  // Create the compound context for CheckboxGroup coordination
  const checkboxContext = Parts.CompoundContext('CheckboxGroup');

  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const CheckboxGroup = function CheckboxGroup (props) {


    const {
      values, defaultValues, onChange, options, disabled, name,
      style, accessibilityLabel,
      ...rest
    } = props;

    const React = Lib.React;
    const isDisabled = !!disabled;
    const optionList = options || [];

    // Controlled/uncontrolled state for the selected values array
    const state = Parts.ControllableState({
      value: values,
      defaultValue: defaultValues || [],
      onChange: onChange
    });
    const resolvedValues = state[0];
    const setValues = state[1];
    const selectedArray = resolvedValues || [];

    // Toggle a single option value
    const handleToggle = function (optValue) {
      const isSelected = selectedArray.indexOf(optValue) >= 0;
      if (isSelected) {
        setValues(selectedArray.filter(function (v) {
          return v !== optValue;
        }));
      } else {
        setValues(selectedArray.concat([optValue]));
      }
    };

    // Build aria state props for the group
    const ariaStateProps = Parts.A11y.state({
      disabled: isDisabled
    });

    // Build checkbox children
    const checkboxes = optionList.map(function (opt) {
      return React.createElement(Registry.Checkbox, {
        key: opt.value,
        checked: selectedArray.indexOf(opt.value) >= 0,
        onChange: function () {
          handleToggle(opt.value);
        },
        disabled: isDisabled || !!opt.disabled,
        label: opt.label
      });
    });

    // Context value for compound children
    const contextValue = {
      name: name,
      values: selectedArray,
      onChange: setValues,
      disabled: isDisabled
    };

    return React.createElement(
      checkboxContext.Provider,
      { value: contextValue },
      React.createElement(
        RNView,
        Object.assign({
          accessibilityRole: 'group',
          accessibilityLabel: accessibilityLabel || name,
          style: [
            Style.utilities['flex_col'],
            style
          ]
        }, ariaStateProps, rest),
        checkboxes
      )
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _CheckboxGroup = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return CheckboxGroup;

}/////////////////////////// Component Factory END /////////////////////////////
