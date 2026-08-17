// Info: Bridge between the themer engine and the component theme contract.
//
// Reshapes the flat emitted token map from Lib.Themer.buildTheme() into the
// nested { Color, Dimension, Font, Breakpoint } structure the component
// library consumes. Also adds the Breakpoint group, which the themer does
// not own (breakpoints are a layout concern, not a design token).
//
// Pure function, no side effects. Called at build time.


// Default breakpoint definitions. These are layout boundaries, not design
// tokens, so they live here rather than in the themer template.
const DEFAULT_BREAKPOINTS = {
  base: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280
};


/********************************************************************
Reshape the themer's flat emitted token map into the nested
{ Color, Dimension, Font, Breakpoint } structure the components expect.

Tokens named color.APP_PRIMARY -> Color.APP_PRIMARY
Tokens named dimension.font_size.xs -> Dimension.fontSize.xs
Tokens named font.family.primary -> Font.family.primary

@param {Object} themer_output - Result from Lib.Themer.buildTheme(), or
                                 a flat token map directly

@return {Object} - { Color, Dimension, Font, Breakpoint }
*********************************************************************/
export default function themeContract (themer_output) {

  // Accept either the full buildTheme result or just the tokens map
  const flat = (themer_output && themer_output.tokens) ? themer_output.tokens : themer_output;

  // Guard against null/undefined input
  if (!flat || typeof flat !== 'object') {
    return { Color: {}, Dimension: {}, Font: { family: {}, weight: {} }, Breakpoint: DEFAULT_BREAKPOINTS };
  }

  const Color = {};
  const Dimension = {};
  const Font = { family: {}, weight: {} };

  // Walk the flat token map and partition by prefix
  const flatKeys = Object.keys(flat);

  for (let i = 0; i < flatKeys.length; i++) {
    const key = flatKeys[i];
    const value = flat[key];

    // Skip helper tokens (prefixed with _)
    if (key.charAt(0) === '_') {
      continue;
    }

    // Split the dotted key into parts
    const parts = key.split('.');

    // Color tokens: color.APP_PRIMARY -> Color.APP_PRIMARY
    if (parts[0] === 'color') {
      Color[parts[1]] = value;

    // Dimension tokens: dimension.font_size.xs -> Dimension.fontSize.xs
    } else if (parts[0] === 'dimension') {

      if (parts.length === 3) {
        // Convert snake_case sub-group to camelCase: font_size -> fontSize
        const scaleName = parts[1].replace(/_([a-z])/g, function (_, c) {
          return c.toUpperCase();
        });

        if (!Dimension[scaleName]) {
          Dimension[scaleName] = {};
        }

        // Round font sizes to integers for clean native rendering
        Dimension[scaleName][parts[2]] = (scaleName === 'fontSize') ? Math.round(value) : value;

      } else {
        // Scalar dimension: dimension.line_height_ratio -> Dimension.lineHeightRatio
        const camelKey = parts[1].replace(/_([a-z])/g, function (_, c) {
          return c.toUpperCase();
        });
        Dimension[camelKey] = value;

      }

    // Font tokens: font.family.primary -> Font.family.primary
    } else if (parts[0] === 'font') {

      if (!Font[parts[1]]) {
        Font[parts[1]] = {};
      }
      Font[parts[1]][parts[2]] = value;

    }

  }

  // Return the nested structure with breakpoints
  return {
    Color: Color,
    Dimension: Dimension,
    Font: Font,
    Breakpoint: DEFAULT_BREAKPOINTS
  };

}
