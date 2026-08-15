// Info: Switch atom [S2 interactive]. Wraps react-native Switch with token
// consumption for the track and thumb colors. Passes accessibilityRole="switch"
// and accessibilityState for screen reader state announcement.
//   value         -> boolean, whether the switch is on
//   onValueChange -> callback when the value changes
//   disabled      -> boolean, whether the switch is non-interactive
'use strict';

const { Switch: RNSwitch } = require('react-native');


/********************************************************************
Build the Switch atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Switch component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function Switch (props) {

    // Destructure props
    const {
      value, onValueChange, disabled, style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    // Resolve colors from tokens
    const colorMap = Style_.tokens.Color;

    // Track color when on: app primary; when off: a muted surface
    const trackOnColor = colorMap.APP_PRIMARY || '#0f62fe';
    const trackOffColor = colorMap.BACKGROUND_SECONDARY || '#e0e0e0';

    // Thumb color: white or surface
    const thumbColor = colorMap.BACKGROUND_PRIMARY || '#ffffff';

    // Disabled colors are dimmed
    const disabledTrackColor = colorMap.BACKGROUND_SECONDARY || '#e0e0e0';
    const disabledThumbColor = colorMap.TEXT_MUTED || '#999';

    // Build accessibility state object
    const accessibilityState = {
      disabled: !!disabled,
      checked: !!value
    };

    return Lib.React.createElement(
      RNSwitch,
      Object.assign({
        value: !!value,
        onValueChange: disabled ? null : onValueChange,
        disabled: !!disabled,
        trackColor: { true: disabled ? disabledTrackColor : trackOnColor, false: disabled ? disabledTrackColor : trackOffColor },
        thumbColor: disabled ? disabledThumbColor : thumbColor,
        accessibilityRole: 'switch',
        accessibilityLabel: accessibilityLabel,
        accessibilityState: accessibilityState,
        style: style
      }, rest)
    );

  };

};
