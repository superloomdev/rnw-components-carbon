// Info: CheckboxGroup composite [S4 compound]. A group of checkboxes where
// multiple can be selected. Uses M1 (a11y), M7 (createCompoundContext),
// M8 (useControllableState). Role group.
//   values      -> array (controlled)
//   defaultValues-> array (uncontrolled)
//   onChange    -> callback receiving the selected values array
//   options     -> array of { value, label, disabled }
//   disabled    -> boolean (disables the entire group)
//   name        -> string (group name for form submission)
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the CheckboxGroup composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The CheckboxGroup component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const useControllableState = require('../useControllableState')(Lib);
  const createCompoundContext = require('../createCompoundContext');

  // Create the compound context for CheckboxGroup coordination
  const checkboxContext = createCompoundContext(Lib, 'CheckboxGroup');

  return function CheckboxGroup (props) {

    const {
      values, defaultValues, onChange, options, disabled, name,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const isDisabled = !!disabled;
    const optionList = options || [];

    // Controlled/uncontrolled state for the selected values array
    const state = useControllableState({
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
    const ariaStateProps = a11y.state({
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
            Style_.utilities['flex_col'],
            style
          ]
        }, ariaStateProps, rest),
        checkboxes
      )
    );

  };

};
