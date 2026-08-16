// Info: Toggle atom [S2 interactive]. Wraps react-native Switch with token
// consumption for the track and thumb colors. Passes accessibilityRole="switch"
// and uses aria-checked for screen reader state announcement. Uses M2
// (usePressKeys) for Space activation on web where the switch role needs it.
//   value         -> boolean, whether the toggle is on
//   onValueChange -> callback when the value changes
//   disabled      -> boolean, whether the toggle is non-interactive
'use strict';

const { Switch: RNSwitch } = require('react-native');


/********************************************************************
Build the Toggle atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Toggle component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  // Build the a11y translator once per factory
  // Build the keyboard activation hook once per factory
  return function Toggle (props) {

    // Destructure props
    const {
      value, onValueChange, disabled, style, accessibilityLabel,
      ...rest
    } = props;

    const React = Lib.React;

    // Handle keyboard activation for the switch role
    const handleActivate = function () {
      if (disabled) {
        return;
      }
      if (Lib.Utils.isFunction(onValueChange)) {
        onValueChange(!value);
      }
    };

    // Build keyboard activation props (Space activates switch role)
    const pressKeysProps = Parts.PressKeys({
      role: 'switch',
      onActivate: handleActivate,
      disabled: !!disabled
    });

    // Resolve colors from tokens
    const colorMap = Style.tokens.Color;

    // Track color when on: app primary; when off: a muted surface
    const trackOnColor = colorMap.APP_PRIMARY || '#0f62fe';
    const trackOffColor = colorMap.BACKGROUND_SECONDARY || '#e0e0e0';

    // Thumb color: white or surface
    const thumbColor = colorMap.BACKGROUND_PRIMARY || '#ffffff';

    // Disabled colors are dimmed
    const disabledTrackColor = colorMap.BACKGROUND_SECONDARY || '#e0e0e0';
    const disabledThumbColor = colorMap.TEXT_MUTED || '#999';

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      disabled: !!disabled,
      checked: !!value
    });

    return React.createElement(
      RNSwitch,
      Object.assign({
        value: !!value,
        onValueChange: disabled ? null : onValueChange,
        disabled: !!disabled,
        trackColor: { true: disabled ? disabledTrackColor : trackOnColor, false: disabled ? disabledTrackColor : trackOffColor },
        thumbColor: disabled ? disabledThumbColor : thumbColor,
        accessibilityRole: 'switch',
        accessibilityLabel: accessibilityLabel,
        style: style
      }, ariaProps, pressKeysProps, rest)
    );

  };

};

