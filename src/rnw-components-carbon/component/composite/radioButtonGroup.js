// Info: RadioButtonGroup composite [S4 compound]. A group of radio buttons
// where exactly one is selected. Uses M1 (a11y), M3 (useRovingTabIndex),
// M7 (createCompoundContext), M8 (useControllableState). Role radiogroup.
//   value       -> string (controlled)
//   defaultValue-> string (uncontrolled)
//   onChange    -> callback receiving the selected value
//   options     -> array of { value, label, disabled }
//   disabled    -> boolean (disables the entire group)
//   name        -> string (group name for form submission)
//   orientation -> 'horizontal' | 'vertical' (default 'vertical')
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the RadioButtonGroup composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The RadioButtonGroup component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const useControllableState = require('../useControllableState')(Lib);
  const useRovingTabIndex = require('../useRovingTabIndex')(Lib);
  const createCompoundContext = require('../createCompoundContext');

  // Create the compound context for RadioButtonGroup coordination
  const radioContext = createCompoundContext(Lib, 'RadioButtonGroup');

  return function RadioButtonGroup (props) {

    const {
      value, defaultValue, onChange, options, disabled, name, orientation,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const isDisabled = !!disabled;
    const optionList = options || [];
    const isVertical = orientation !== 'horizontal';

    // Controlled/uncontrolled state for the selected value
    const state = useControllableState({
      value: value,
      defaultValue: defaultValue,
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    // Find the active index for roving tab index
    let activeIndex = 0;
    for (let i = 0; i < optionList.length; i++) {
      if (optionList[i].value === resolvedValue) {
        activeIndex = i;
        break;
      }
    }

    const roving = useRovingTabIndex({
      count: optionList.length,
      activeIndex: activeIndex,
      onActiveIndexChange: function (index) {
        if (optionList[index] && !optionList[index].disabled) {
          setValue(optionList[index].value);
        }
      },
      orientation: isVertical ? 'vertical' : 'horizontal'
    });

    // Build aria state props for the group
    const ariaStateProps = a11y.state({
      disabled: isDisabled
    });

    // Build radio button children
    const radioButtons = optionList.map(function (opt, index) {
      const itemProps = roving.getItemProps(index);
      return React.createElement(Registry.RadioButton, Object.assign({
        key: opt.value,
        checked: opt.value === resolvedValue,
        onChange: function () {
          setValue(opt.value);
        },
        disabled: isDisabled || !!opt.disabled,
        label: opt.label
      }, itemProps));
    });

    // Context value for compound children
    const contextValue = {
      name: name,
      value: resolvedValue,
      onChange: setValue,
      disabled: isDisabled
    };

    return React.createElement(
      radioContext.Provider,
      { value: contextValue },
      React.createElement(
        RNView,
        Object.assign({
          accessibilityRole: 'radiogroup',
          accessibilityLabel: accessibilityLabel || name,
          style: [
            isVertical ? Style_.utilities['flex_col'] : Style_.utilities['flex_row'],
            isVertical ? null : Style_.utilities['flex_wrap'],
            style
          ]
        }, ariaStateProps, roving.containerProps, rest),
        radioButtons
      )
    );

  };

};
