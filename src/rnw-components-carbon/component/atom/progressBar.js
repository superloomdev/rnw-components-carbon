// Info: ProgressBar atom [S1 presentational]. A determinate or
// indeterminate progress bar. Determinate shows a filled portion based on
// `value` (0 to 1); indeterminate shows an animated bar when `value` is null.
// Uses aria-valuenow / aria-valuemin / aria-valuemax for screen reader
// state announcement.
//   value       -> 0 to 1 for determinate, null for indeterminate
//   color       -> background color token for the fill (default app_primary)
//   trackColor  -> background color token for the track (default surface)
//   height      -> bar height in pixels (default 4)
'use strict';

const { View: RNView, Animated } = require('react-native');


/********************************************************************
Build the ProgressBar atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ProgressBar component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  // Build the a11y translator once per factory
  return function ProgressBar (props) {

    // Destructure props
    const { value, color, trackColor, height, style, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    // Resolve colors from tokens
    const colorMap = Style.tokens.Color;
    const fillColor = (color && colorMap[color.toUpperCase()]) || colorMap.APP_PRIMARY || '#0f62fe';
    const trackFillColor = (trackColor && colorMap[trackColor.toUpperCase()]) || colorMap.SURFACE || '#e0e0e0';

    // Resolve height
    const barHeight = Lib.Utils.isNumber(height) ? height : 4;

    // Build aria value props through the a11y translator
    const ariaProps = Parts.A11y.value({
      min: 0,
      max: 1,
      now: Lib.Utils.isNumber(value) ? Parts.Units.clamp(value, 0, 1) : undefined
    });

    // Indeterminate mode: animated bar
    const React = Lib.React;
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    // Start the indeterminate animation when value is null
    React.useEffect(function () {

      if (Lib.Utils.isNumber(value)) {
        return;
      }

      // Loop the animation for indeterminate mode
      const animation = Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false
        })
      );

      animation.start();

      // Cleanup: stop the animation on unmount
      return function () {
        animation.stop();
      };

    }, [value]);

    // Determinate mode: static fill width
    if (Lib.Utils.isNumber(value)) {
      const clampedValue = Parts.Units.clamp(value, 0, 1);
      const fillPercent = Parts.Units.round(clampedValue * 100);

      return Lib.React.createElement(
        RNView,
        Object.assign({
          accessibilityRole: 'progressbar',
          style: [
            { backgroundColor: trackFillColor, height: barHeight, borderRadius: barHeight / 2, overflow: 'hidden' },
            style
          ]
        }, ariaProps, rest),
        Lib.React.createElement(RNView, {
          style: {
            width: fillPercent + '%',
            height: barHeight,
            backgroundColor: fillColor,
            borderRadius: barHeight / 2
          }
        })
      );

    }

    // Indeterminate mode: animated sliding bar
    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['-100%', '100%']
    });

    return Lib.React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'progressbar',
        style: [
          { backgroundColor: trackFillColor, height: barHeight, borderRadius: barHeight / 2, overflow: 'hidden' },
          style
        ]
      }, ariaProps, rest),
      Lib.React.createElement(Animated.View, {
        style: {
          width: '40%',
          height: barHeight,
          backgroundColor: fillColor,
          borderRadius: barHeight / 2,
          transform: [{ translateX: translateX }]
        }
      })
    );

  };

};
