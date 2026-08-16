// Info: ViewWrapper molecule [S1 presentational]. A platform-aware wrapper
// that applies safe area padding on native and degrades to a plain View on
// web. Uses role="group" for screen reader semantics.
//   children    -> wrapped content
//   style       -> custom style overrides
'use strict';

const { View: RNView, Platform } = require('react-native');


/********************************************************************
Build the ViewWrapper molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ViewWrapper component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  return function ViewWrapper (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // On native, apply safe area insets as padding; on web, no padding
    const safeAreaStyle = Platform.select({
      web: null,
      default: (function () {
        let insets = { top: 0, bottom: 0, left: 0, right: 0 };

        if (Lib.Device && Lib.Utils.isFunction(Lib.Device.getSafeAreaInsets)) {
          const result = Lib.Device.getSafeAreaInsets();
          if (result && result.success) {
            insets = {
              top: result.top || 0,
              bottom: result.bottom || 0,
              left: result.left || 0,
              right: result.right || 0
            };
          }
        }

        return {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        };
      })()
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          { flex: 1 },
          safeAreaStyle,
          style
        ]
      }, rest),
      children
    );

  };

};
