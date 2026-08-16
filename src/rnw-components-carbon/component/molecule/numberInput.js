// Info: NumberInput molecule [S2 interactive]. A TextInput with increment and
// decrement buttons. Uses Platform.select for accessibilityRole: 'spinbutton'
// on web, 'adjustable' on native. Uses M1 (a11y) for aria-* state and value,
// M2 (usePressKeys) for keyboard activation, M8 (useControllableState) for
// controlled/uncontrolled value.
//   value         -> number (controlled)
//   defaultValue  -> number (uncontrolled)
//   onChange      -> callback receiving the next number
//   min           -> number
//   max           -> number
//   step          -> number (default 1)
//   disabled      -> boolean
//   invalid       -> boolean
'use strict';

const { View: RNView, Pressable, Platform } = require('react-native');


/********************************************************************
Build the NumberInput molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The NumberInput component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  // a11y is used for aria-* value props on the spinbutton role

  // Role: 'spinbutton' on web, 'adjustable' on native
  const spinRole = Platform.select({
    web: 'spinbutton',
    default: 'adjustable'
  });

  return function NumberInput (props) {

    const {
      value, defaultValue, onChange, min, max, step, disabled, invalid, style,
      isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Controlled/uncontrolled state
    const state = Parts.ControllableState({
      value: value,
      defaultValue: Lib.Utils.isNumber(defaultValue) ? defaultValue : 0,
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    const isDisabled = !!disabled;
    const isInvalid = !!invalid;
    const stepVal = Lib.Utils.isNumber(step) ? step : 1;
    const minVal = Lib.Utils.isNumber(min) ? min : null;
    const maxVal = Lib.Utils.isNumber(max) ? max : null;
    const colorMap = Style.tokens.Color;

    // Clamp a value to min/max
    const clamp = function (val) {
      let result = val;
      if (minVal !== null && result < minVal) {
        result = minVal;
      }
      if (maxVal !== null && result > maxVal) {
        result = maxVal;
      }
      return result;
    };

    // Increment handler
    const handleIncrement = function () {
      if (isDisabled) {
        return;
      }
      setValue(clamp(resolvedValue + stepVal));
    };

    // Decrement handler
    const handleDecrement = function () {
      if (isDisabled) {
        return;
      }
      setValue(clamp(resolvedValue - stepVal));
    };

    // Build aria value props through the a11y translator (state is handled by TextInput)
    const ariaValueProps = Parts.A11y.value({
      min: minVal,
      max: maxVal,
      now: resolvedValue
    });

    return React.createElement(
      RNView,
      {
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['br_md'],
          Style.utilities['border_default'],
          isInvalid
            ? { borderColor: colorMap.STATUS_DANGER || '#da1e28' }
            : null,
          isDisabled
            ? { backgroundColor: colorMap.BACKGROUND_SECONDARY || '#f4f4f4' }
            : Style.utilities['background_surface'],
          style
        ]
      },
      // Decrement button
      React.createElement(
        Pressable,
        {
          onPress: handleDecrement,
          disabled: isDisabled,
          accessibilityRole: 'button',
          accessibilityLabel: 'Decrement',
          style: [Style.utilities['p_h_sm'], Style.utilities['p_v_xs']]
        },
        React.createElement(Registry.Text, {
          size: 'lg',
          color: isDisabled ? 'text_muted' : 'text_primary',
          weight: 'bold'
        }, '-')
      ),
      // Text input
      React.createElement(
        Registry.TextInput,
        Object.assign({
          value: String(resolvedValue),
          onChangeText: function (text) {
            const parsed = Parts.Units.parseNumber(text);
            if (parsed !== null) {
              setValue(clamp(parsed));
            }
          },
          isDisabled: isDisabled,
          isInvalid: isInvalid,
          keyboardType: 'numeric',
          accessibilityRole: spinRole,
          accessibilityLabel: accessibilityLabel,
          style: { flex: 1, textAlign: 'center' }
        }, ariaValueProps, rest)
      ),
      // Increment button
      React.createElement(
        Pressable,
        {
          onPress: handleIncrement,
          disabled: isDisabled,
          accessibilityRole: 'button',
          accessibilityLabel: 'Increment',
          style: [Style.utilities['p_h_sm'], Style.utilities['p_v_xs']]
        },
        React.createElement(Registry.Text, {
          size: 'lg',
          color: isDisabled ? 'text_muted' : 'text_primary',
          weight: 'bold'
        }, '+')
      )
    );

  };

};
