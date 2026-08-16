// Info: Text atom [S1 presentational]. Maps typography props to generated
// utility classes:
//   size  -> font_size_<size>     (xs|sm|md|lg|xl|xxl)
//   color -> font_<color>         (text_primary|text_secondary|app_primary|...)
//   weight-> font_weight_<weight> (regular|medium|semibold|bold)
// Applies iOS writingDirection under RTL (matches the reference's platform branch).
'use strict';

const { Text: RNText, StyleSheet, Platform } = require('react-native');


// Styles that are not token-derived and never change with the theme
const StaticStyle = StyleSheet.create({
  rtlIOS: { writingDirection: 'rtl' }
});


/********************************************************************
Build the Text atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Text component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function Text (props) {

    // Destructure token props from pass-through props
    const { size, color, weight, align, style, children, ...rest } = props;

    // Resolve token props to utility classes, falling back to defaults
    const classes = [];

    // Font size with fallback to default
    const sizeKey = 'font_size_' + (size || CONFIG.DEFAULT_FONT_SIZE);
    let sizeStyle = Style.utilities[sizeKey];

    if (!sizeStyle) {
      Lib.Debug.warn('unknown font size token, using default', { size: size });
      sizeStyle = Style.utilities['font_size_' + CONFIG.DEFAULT_FONT_SIZE];
    }

    classes.push(sizeStyle);

    // Font color with fallback to default
    const colorKey = 'font_' + (color || CONFIG.DEFAULT_FONT_COLOR);
    let colorStyle = Style.utilities[colorKey];

    if (!colorStyle) {
      Lib.Debug.warn('unknown font color token, using default', { color: color });
      colorStyle = Style.utilities['font_' + CONFIG.DEFAULT_FONT_COLOR];
    }

    classes.push(colorStyle);

    // Font weight with fallback to default
    const weightKey = 'font_weight_' + (weight || CONFIG.DEFAULT_FONT_WEIGHT);
    let weightStyle = Style.utilities[weightKey];

    if (!weightStyle) {
      Lib.Debug.warn('unknown font weight token, using default', { weight: weight });
      weightStyle = Style.utilities['font_weight_' + CONFIG.DEFAULT_FONT_WEIGHT];
    }

    classes.push(weightStyle);

    // Alignment is a plain style, not a token
    if (align) {
      classes.push({ textAlign: align });
    }

    // iOS needs an explicit writing direction under RTL
    if (Parts.Direction.isRtl() && Platform.OS === 'ios') {
      classes.push(StaticStyle.rtlIOS);
    }

    return Lib.React.createElement(
      RNText,
      Object.assign({ style: [...classes, style] }, rest),
      children
    );

  };

};
