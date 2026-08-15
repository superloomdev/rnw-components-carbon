// Info: Card molecule [S1 or S2] (CANONICAL). A themed surface with border,
// radius, padding, and an elevation shadow. The shadow shows the ONLY kind
// of platform exception that exists (a platform-limited style prop, not a
// bundler feature):
//   web -> boxShadow string | ios -> shadow* props | android -> elevation
// When `onPress` is supplied, the card becomes S2 interactive (pressable).
'use strict';

const { Platform, Pressable } = require('react-native');


// Platform-limited elevation styling, resolved once
const SHADOW = Platform.select({
  web: { boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  android: { elevation: 2 }
});


/********************************************************************
Build the Card molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Card component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function Card (props) {

    // Destructure props
    const { onPress, disabled, style, children, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    // Card base styles
    const cardStyle = [
      Style_.utilities['p_a_lg'],
      SHADOW,
      style
    ];

    // Non-pressable card: S1 presentational, delegates to View atom
    if (!Lib.Utils.isFunction(onPress)) {
      return Lib.React.createElement(
        Registry.View,
        Object.assign({
          background: 'surface',
          radius: 'lg',
          border: true,
          style: cardStyle
        }, rest),
        children
      );

    }

    // Pressable card: S2 interactive, wraps in Pressable
    const accessibilityState = {
      disabled: !!disabled
    };

    return Lib.React.createElement(
      Pressable,
      Object.assign({
        onPress: disabled ? null : onPress,
        disabled: disabled,
        accessibilityRole: 'button',
        accessibilityState: accessibilityState,
        style: function () {
          return [
            Style_.utilities['background_surface'],
            Style_.utilities['br_lg'],
            Style_.utilities['border_default'],
            ...cardStyle
          ];
        }
      }, rest),
      children
    );

  };

};
