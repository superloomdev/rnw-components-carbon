// Info: ProgressIndicator atom [S1 presentational]. A determinate or
// indeterminate progress bar. Determinate shows a filled portion based on
// `value` (0 to 1); indeterminate shows an animated bar when `value` is null.
//   value       -> 0 to 1 for determinate, null for indeterminate
//   color       -> background color token for the fill (default app_primary)
//   trackColor  -> background color token for the track (default surface)
//   height      -> bar height in pixels (default 4)
'use strict';

const { View: RNView, Animated } = require('react-native');


/********************************************************************
Build the ProgressIndicator atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ProgressIndicator component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function ProgressIndicator (props) {

    // Destructure props
    const { value, color, trackColor, height, style, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    // Resolve colors from tokens
    const colorMap = Style_.tokens.Color;
    const fillColor = (color && colorMap[color.toUpperCase()]) || colorMap.APP_PRIMARY || '#0f62fe';
    const trackFillColor = (trackColor && colorMap[trackColor.toUpperCase()]) || colorMap.SURFACE || '#e0e0e0';

    // Resolve height
    const barHeight = Lib.Utils.isNumber(height) ? height : 4;

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
      const clampedValue = Math.max(0, Math.min(1, value));
      const fillPercent = Math.round(clampedValue * 100);

      return Lib.React.createElement(
        RNView,
        Object.assign({
          style: [
            { backgroundColor: trackFillColor, height: barHeight, borderRadius: barHeight / 2, overflow: 'hidden' },
            style
          ]
        }, rest),
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
        style: [
          { backgroundColor: trackFillColor, height: barHeight, borderRadius: barHeight / 2, overflow: 'hidden' },
          style
        ]
      }, rest),
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
