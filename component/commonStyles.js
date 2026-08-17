// Info: The token -> atomic-utility-style generator. Given an assembled theme
// ({ Color, Dimension, Font, Breakpoint }) and a breakpoint key, it produces a
// Tailwind-like stylesheet of utility classes that components consume by name.
// Regenerated whenever the theme changes (the runtime-theming seam).
//
// Spacing utilities are LOGICAL (start/end), so layouts mirror correctly under
// RTL with no per-component work. Each breakpoint generates its own utility set
// so components can switch sets without regenerating styles on resize.
//
// Pure function, no side effects. Called by build() once per breakpoint.

// Imports
import { StyleSheet as RNStyleSheet } from 'react-native';


// Build the padding style object for a logical/physical side
const paddingFor = function (side, value) {

  switch (side) {
  case 'a': return { padding: value };
  case 'h': return { paddingHorizontal: value };
  case 'v': return { paddingVertical: value };
  case 't': return { paddingTop: value };
  case 'b': return { paddingBottom: value };
  case 's': return { paddingStart: value };   // RTL-aware
  case 'e': return { paddingEnd: value };      // RTL-aware
  default: return {};
  }

};


// Build the margin style object for a logical/physical side
const marginFor = function (side, value) {

  switch (side) {
  case 'a': return { margin: value };
  case 'h': return { marginHorizontal: value };
  case 'v': return { marginVertical: value };
  case 't': return { marginTop: value };
  case 'b': return { marginBottom: value };
  case 's': return { marginStart: value };     // RTL-aware
  case 'e': return { marginEnd: value };        // RTL-aware
  default: return {};
  }

};


// Color tokens that get font_ utility classes
const FONT_COLOR_TOKENS = [
  'TEXT_PRIMARY', 'TEXT_SECONDARY', 'TEXT_MUTED', 'TEXT_DISABLED', 'TEXT_ON_PRIMARY',
  'APP_PRIMARY', 'STATUS_SUCCESS', 'STATUS_DANGER', 'STATUS_WARNING', 'STATUS_INFO'
];


// Color tokens that get background_ utility classes
const BACKGROUND_COLOR_TOKENS = [
  'APP_PRIMARY', 'APP_PRIMARY_HOVERED', 'APP_PRIMARY_PRESSED', 'APP_PRIMARY_DISABLED',
  'APP_PRIMARY_SUBTLE', 'BACKGROUND_PRIMARY', 'BACKGROUND_SECONDARY', 'SURFACE',
  'STATUS_SUCCESS', 'STATUS_SUCCESS_SUBTLE', 'STATUS_DANGER', 'STATUS_DANGER_SUBTLE',
  'STATUS_WARNING', 'STATUS_WARNING_SUBTLE', 'STATUS_INFO', 'STATUS_INFO_SUBTLE'
];


// Logical sides for spacing utilities
const SIDES = ['a', 'h', 'v', 't', 'b', 's', 'e'];


/********************************************************************
Generate the atomic utility stylesheet from a theme for a specific
breakpoint. The breakpoint key is accepted for future per-breakpoint
spacing scale adjustments; currently all breakpoints share the same
space tokens.

@param {Object} theme      - { Color, Dimension, Font, Breakpoint }
@param {String} breakpoint - Breakpoint key (e.g. 'base', 'sm', 'md')
@param {Object} Parts      - Mechanism parts; uses Parts.Typeface for
                              font weight resolution

@return {Object} - StyleSheet of utility classes keyed by name
*********************************************************************/
export default function generateCommonStyles (theme, breakpoint, Parts) {

  const Color = theme.Color;
  const Dimension = theme.Dimension;
  const Font = theme.Font;

  const styles = {};


  // ~~~~~~~~~~ Font sizes (+ derived line-height) ~~~~~~~~~~
  const fontSizeKeys = Object.keys(Dimension.fontSize);

  for (let i = 0; i < fontSizeKeys.length; i++) {
    const key = fontSizeKeys[i];
    const size = Dimension.fontSize[key];

    styles['font_size_' + key] = {
      fontSize: size,
      lineHeight: Math.round(size * (Dimension.lineHeightRatio || 1.4))
    };

  }


  // ~~~~~~~~~~ Font colors (curated token subset) ~~~~~~~~~~
  for (let i = 0; i < FONT_COLOR_TOKENS.length; i++) {
    const token = FONT_COLOR_TOKENS[i];

    if (Color[token] !== undefined) {
      styles['font_' + token.toLowerCase()] = { color: Color[token] };
    }

  }


  // ~~~~~~~~~~ Font weights (resolved through Parts.Typeface) ~~~~~~~~~~
  const weightKeys = Object.keys(Font.weight);

  for (let i = 0; i < weightKeys.length; i++) {
    const w = weightKeys[i];

    // Typeface.styleFor returns { fontFamily } for per-weight-face families
    // or { fontFamily, fontWeight } for synthesizing families (System, etc.)
    styles['font_weight_' + w] = Parts.Typeface.styleFor('primary', Font.weight[w], Font);

  }

  // Secondary family is available as a named utility
  if (Font.family.secondary) {
    styles['font_family_secondary'] = { fontFamily: Font.family.secondary };
  }


  // ~~~~~~~~~~ Backgrounds ~~~~~~~~~~
  for (let i = 0; i < BACKGROUND_COLOR_TOKENS.length; i++) {
    const token = BACKGROUND_COLOR_TOKENS[i];

    if (Color[token] !== undefined) {
      styles['background_' + token.toLowerCase()] = { backgroundColor: Color[token] };
    }

  }


  // ~~~~~~~~~~ Borders ~~~~~~~~~~
  if (Color.BORDER !== undefined) {
    styles['border_default'] = { borderWidth: 1, borderColor: Color.BORDER };
    styles['border_top'] = { borderTopWidth: 1, borderColor: Color.BORDER };
  }

  if (Color.APP_PRIMARY !== undefined) {
    styles['border_primary'] = { borderWidth: 1, borderColor: Color.APP_PRIMARY };
  }

  // Focus ring border for the focused interaction state
  if (Color.APP_PRIMARY !== undefined) {
    styles['border_focused'] = { borderWidth: 2, borderColor: Color.APP_PRIMARY };
  }


  // ~~~~~~~~~~ Radii ~~~~~~~~~~
  const radiusKeys = Object.keys(Dimension.radius);

  for (let i = 0; i < radiusKeys.length; i++) {
    const key = radiusKeys[i];

    styles['br_' + key] = { borderRadius: Dimension.radius[key] };

  }


  // ~~~~~~~~~~ Spacing (logical sides for RTL: a/h/v/t/b/s/e) ~~~~~~~~~~
  const spaceKeys = Object.keys(Dimension.space);

  for (let i = 0; i < spaceKeys.length; i++) {
    const token = spaceKeys[i];
    const value = Dimension.space[token];

    for (let j = 0; j < SIDES.length; j++) {
      const side = SIDES[j];

      styles['p_' + side + '_' + token] = paddingFor(side, value);
      styles['m_' + side + '_' + token] = marginFor(side, value);

    }

  }


  // ~~~~~~~~~~ Flexbox utilities ~~~~~~~~~~
  styles['flex_row'] = { flexDirection: 'row' };
  styles['flex_col'] = { flexDirection: 'column' };
  styles['flex_center'] = { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' };
  styles['flex_between'] = { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' };
  styles['flex_stretch'] = { alignSelf: 'stretch' };
  styles['flex_wrap'] = { flexWrap: 'wrap' };
  styles['flex_1'] = { flex: 1 };
  styles['align_center'] = { alignItems: 'center' };
  styles['align_start'] = { alignItems: 'flex-start' };
  styles['align_end'] = { alignItems: 'flex-end' };
  styles['justify_center'] = { justifyContent: 'center' };
  styles['justify_start'] = { justifyContent: 'flex-start' };
  styles['justify_end'] = { justifyContent: 'flex-end' };
  styles['justify_between'] = { justifyContent: 'space-between' };


  // ~~~~~~~~~~ Display utilities ~~~~~~~~~~
  styles['display_none'] = { display: 'none' };
  styles['position_absolute'] = { position: 'absolute' };
  styles['position_relative'] = { position: 'relative' };


  // Freeze into a native StyleSheet
  return RNStyleSheet.create(styles);

}
