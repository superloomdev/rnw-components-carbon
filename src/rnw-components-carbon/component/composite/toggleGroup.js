// Info: ToggleGroup composite [S4 compound]. A group of toggle buttons where
// one is pressed at a time. Uses M1 (a11y), M3 (useRovingTabIndex),
// M7 (createCompoundContext). Role toolbar.
//   value       -> string (controlled, the pressed toggle value)
//   defaultValue-> string (uncontrolled)
//   onChange    -> callback receiving the selected value
//   options     -> array of { value, label, disabled }
//   disabled    -> boolean (disables the entire group)
//   orientation -> 'horizontal' | 'vertical' (default 'horizontal')
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the ToggleGroup composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ToggleGroup component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const useControllableState = require('../useControllableState')(Lib);
  const useRovingTabIndex = require('../useRovingTabIndex')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);
  const createCompoundContext = require('../createCompoundContext');

  // Create the compound context for ToggleGroup coordination
  const toggleContext = createCompoundContext(Lib, 'ToggleGroup');

  return function ToggleGroup (props) {

    const {
      value, defaultValue, onChange, options, disabled, orientation,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const isDisabled = !!disabled;
    const optionList = options || [];
    const isVertical = orientation === 'vertical';
    const colorMap = Style_.tokens.Color;

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

    // Build toggle button children
    const toggleButtons = optionList.map(function (opt, index) {
      const isPressed = opt.value === resolvedValue;
      const itemProps = roving.getItemProps(index);
      const pressKeysProps = usePressKeys({
        role: 'button',
        onActivate: function () {
          setValue(opt.value);
        },
        disabled: isDisabled || !!opt.disabled
      });

      return React.createElement(
        Pressable,
        Object.assign({
          key: opt.value,
          onPress: function () {
            setValue(opt.value);
          },
          disabled: isDisabled || !!opt.disabled,
          accessibilityRole: 'button',
          accessibilityLabel: opt.label,
          style: [
            Style_.utilities['p_h_md'],
            Style_.utilities['p_v_sm'],
            Style_.utilities['br_md'],
            isPressed
              ? { backgroundColor: colorMap.APP_PRIMARY || '#0f62fe' }
              : Style_.utilities['background_surface'],
            { borderWidth: 1, borderColor: colorMap.BORDER || '#e0e0e0' }
          ]
        }, a11y.state({ pressed: isPressed, disabled: isDisabled || !!opt.disabled }), pressKeysProps, itemProps),
        React.createElement(Registry.Text, {
          size: 'sm',
          color: isPressed ? 'text_on_primary' : 'text_primary'
        }, opt.label)
      );
    });

    // Context value for compound children
    const contextValue = {
      value: resolvedValue,
      onChange: setValue,
      disabled: isDisabled
    };

    return React.createElement(
      toggleContext.Provider,
      { value: contextValue },
      React.createElement(
        RNView,
        Object.assign({
          accessibilityRole: 'toolbar',
          accessibilityLabel: accessibilityLabel || 'Toggle group',
          style: [
            isVertical ? Style_.utilities['flex_col'] : Style_.utilities['flex_row'],
            style
          ]
        }, roving.containerProps, rest),
        toggleButtons
      )
    );

  };

};
