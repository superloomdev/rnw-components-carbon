// Info: Slider atom [S2 interactive]. A range slider using RN Slider.
// Uses Platform.select for accessibilityRole: 'slider' on web, 'adjustable'
// on native (spinbutton has no native meaning, adjustable has no web meaning).
// Uses M1 (a11y) for aria-* state and value, M2 (usePressKeys) for keyboard.
//   value       -> number (controlled)
//   defaultValue-> number (uncontrolled)
//   min         -> number (default 0)
//   max         -> number (default 100)
//   step        -> number (default 1)
//   onChange    -> callback receiving the next number
//   disabled    -> boolean
'use strict';

const { Slider: RNSlider, Platform } = require('react-native');


/********************************************************************
Build the Slider atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Slider component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const useControllableState = require('../useControllableState')(Lib);

  // Role: 'slider' on web, 'adjustable' on native
  const sliderRole = Platform.select({
    web: 'slider',
    default: 'adjustable'
  });

  return function Slider (props) {

    const {
      value, defaultValue, min, max, step, onChange, disabled, style,
      isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Controlled/uncontrolled state
    const state = useControllableState({
      value: value,
      defaultValue: Lib.Utils.isNumber(defaultValue) ? defaultValue : (min || 0),
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    const isDisabled = !!disabled;
    const minVal = Lib.Utils.isNumber(min) ? min : 0;
    const maxVal = Lib.Utils.isNumber(max) ? max : 100;
    const stepVal = Lib.Utils.isNumber(step) ? step : 1;

    // Resolve colors from tokens
    const colorMap = Style_.tokens.Color;

    // Build aria state and value props through the a11y translator
    const ariaStateProps = a11y.state({
      disabled: isDisabled
    });

    const ariaValueProps = a11y.value({
      min: minVal,
      max: maxVal,
      now: resolvedValue,
      text: Math.round(resolvedValue) + ''
    });

    return React.createElement(
      RNSlider,
      Object.assign({
        value: resolvedValue,
        onValueChange: setValue,
        minimumValue: minVal,
        maximumValue: maxVal,
        step: stepVal,
        minimumTrackTintColor: isDisabled
          ? (colorMap.TEXT_MUTED || '#999')
          : (colorMap.APP_PRIMARY || '#0f62fe'),
        maximumTrackTintColor: colorMap.BACKGROUND_SECONDARY || '#e0e0e0',
        thumbTintColor: isDisabled
          ? (colorMap.TEXT_MUTED || '#999')
          : (colorMap.APP_PRIMARY || '#0f62fe'),
        disabled: isDisabled,
        accessibilityRole: sliderRole,
        accessibilityLabel: accessibilityLabel,
        style: style
      }, ariaStateProps, ariaValueProps, rest)
    );

  };

};
