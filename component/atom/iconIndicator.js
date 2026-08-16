// Info: IconIndicator atom [S1 presentational]. A colored circle with an
// icon inside, for status display. Uses M1 (a11y) for aria-*.
// Uses shared_libs.Svg as an optional injection; degrades to colored View.
//   iconName    -> string (name of the icon to render)
//   color       -> string (background color token or hex)
//   iconColor   -> string (icon color token or hex, default 'text_on_primary')
//   size        -> number (pixels, default 24)
//   label       -> string (accessibility label)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the IconIndicator atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The IconIndicator component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function IconIndicator (props) {

    const {
      iconName, color, iconColor, size, label, style,
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;
    const s = Lib.Utils.isNumber(size) ? size : 24;

    // Resolve colors from token or raw hex
    const resolvedBg = (colorMap[color] || color || colorMap.APP_PRIMARY || '#0f62fe');
    const resolvedIcon = (colorMap[iconColor] || iconColor || colorMap.TEXT_ON_PRIMARY || '#ffffff');

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityLabel: label || 'Icon indicator',
        style: [
          {
            width: s,
            height: s,
            borderRadius: s / 2,
            backgroundColor: resolvedBg,
            justifyContent: 'center',
            alignItems: 'center'
          },
          style
        ]
      }, rest),
      Registry.Icon
        ? React.createElement(Registry.Icon, {
          name: iconName || 'info',
          size: 'sm',
          color: resolvedIcon
        })
        : null
    );

  };

};
