// Info: DatePickerInput molecule [S2 interactive]. A text input that opens a
// DatePicker. Composes Registry.TextInput and Registry.DatePicker. Uses M1
// (a11y) for aria-* state and M8 (useControllableState) for controlled/
// uncontrolled value.
//   value       -> string (controlled)
//   onChange    -> callback receiving the selected date string
//   placeholder -> string
//   disabled    -> boolean
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the DatePickerInput molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The DatePickerInput component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const useControllableState = require('../useControllableState')(Lib);

  return function DatePickerInput (props) {

    const {
      value, onChange, placeholder, disabled, style,
      isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Controlled/uncontrolled state for the date value
    const state = useControllableState({
      value: value,
      defaultValue: '',
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    const [isOpen, setIsOpen] = React.useState(false);
    const isDisabled = !!disabled;

    return React.createElement(
      RNView,
      {
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          style
        ]
      },
      // Text input that displays the date value
      React.createElement(
        Registry.TextInput,
        Object.assign({
          value: resolvedValue,
          onChangeText: setValue,
          placeholder: placeholder || 'YYYY-MM-DD',
          isDisabled: isDisabled,
          accessibilityRole: 'combobox',
          style: { flex: 1 }
        }, rest)
      ),
      // Calendar trigger button that opens the DatePicker
      React.createElement(
        Pressable,
        {
          onPress: function () {
            if (!isDisabled) {
              setIsOpen(!isOpen);
            }
          },
          disabled: isDisabled,
          accessibilityRole: 'button',
          accessibilityLabel: 'Open date picker',
          style: Style_.utilities['m_s_xs']
        },
        React.createElement(Registry.Icon, {
          name: 'calendar',
          size: 'sm',
          color: 'TEXT_SECONDARY'
        })
      ),
      // DatePicker overlay
      isOpen
        ? React.createElement(Registry.DatePicker, {
          value: resolvedValue,
          onChange: function (nextValue) {
            setValue(nextValue);
            setIsOpen(false);
          },
          disabled: isDisabled
        })
        : null
    );

  };

};
