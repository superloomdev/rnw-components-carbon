// Info: Icon atom [S1 presentational]. Wraps an injected glyph component
// (Lib.Icons.Glyph).
//   name  -> glyph name (vendor-specific, set by the host adapter)
//   size  -> dimension token (xs..xxl) OR a raw number
//   color -> color token (e.g. 'TEXT_PRIMARY' / 'text_primary') OR a raw hex
// The icon source is injected as shared_libs.Icons (capability-named, never
// vendor-named) so the library does not couple to a specific icon set.
'use strict';


/********************************************************************
Build the Icon atom.

@param {Object} Lib      - { Utils, Debug, React, Icons }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Icon component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function Icon (props) {

    // Destructure token props from pass-through props
    const { name, size, color, style, ...rest } = props;

    // Guard: Icons must be injected by the host
    if (!Lib.Icons || !Lib.Icons.Glyph) {
      Lib.Debug.warn('Icons not injected; pass shared_libs.Icons with a Glyph component');
      return null;
    }

    // Resolve size: token -> px, number -> px, default md
    const fontSizeMap = Style.tokens.Dimension.fontSize;
    let px = fontSizeMap.md;

    if (Lib.Utils.isNumber(size)) {
      px = size;
    } else if (size && fontSizeMap[size]) {
      px = fontSizeMap[size];
    }

    // Resolve color: hex -> as-is, token -> palette, default TEXT_PRIMARY
    const colorMap = Style.tokens.Color;
    let hex = colorMap.TEXT_PRIMARY;

    if (color && color.charAt(0) === '#') {
      hex = color;
    } else if (color && colorMap[color.toUpperCase()]) {
      hex = colorMap[color.toUpperCase()];
    }

    return Lib.React.createElement(
      Lib.Icons.Glyph,
      Object.assign({ name: name, size: px, color: hex, style: style }, rest)
    );

  };

};
