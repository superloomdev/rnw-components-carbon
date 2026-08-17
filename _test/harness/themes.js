// Info: Theme fixtures for rnw-components-carbon tests.
//
// Provides the fixed-value control theme and the Poppins real-family theme.
// The themer-driven matrix is removed; tests use the fixed control theme.

// The fixed-value control theme. Deterministic, integer-only values.
export function createTestTheme () {

  return {
    Color: {
      APP_PRIMARY: '#0f62fe',
      APP_PRIMARY_HOVERED: '#0353e9',
      APP_PRIMARY_PRESSED: '#0043d9',
      APP_PRIMARY_DISABLED: '#a6c8ff',
      APP_PRIMARY_SUBTLE: '#edf5ff',
      TEXT_PRIMARY: '#161616',
      TEXT_SECONDARY: '#525252',
      TEXT_MUTED: '#6f6f6f',
      TEXT_DISABLED: '#a8a8a8',
      TEXT_ON_PRIMARY: '#ffffff',
      BACKGROUND_PRIMARY: '#ffffff',
      BACKGROUND_SECONDARY: '#f4f4f4',
      SURFACE: '#ffffff',
      BORDER: '#e0e0e0',
      BORDER_STRONG: '#8d8d8d',
      BORDER_SUBTLE: '#e0e0e0',
      STATUS_SUCCESS: '#0e6027',
      STATUS_SUCCESS_SUBTLE: '#e8f5e9',
      STATUS_DANGER: '#da1e28',
      STATUS_DANGER_SUBTLE: '#fff1f1',
      STATUS_WARNING: '#8e6a00',
      STATUS_WARNING_SUBTLE: '#fcf4d6',
      STATUS_INFO: '#0043ce',
      STATUS_INFO_SUBTLE: '#edf5ff'
    },
    Dimension: {
      fontSize: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 },
      space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
      radius: { sm: 4, md: 8, lg: 12, xl: 16, pill: 999 },
      lineHeightRatio: 1.4
    },
    Font: {
      family: { primary: 'System', secondary: 'System' },
      weight: { regular: '400', medium: '500', semibold: '600', bold: '700' }
    },
    Breakpoint: {
      base: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  };

}


// Real-family theme for exercising the native per-weight-face path.
// Uses Poppins family names to prove that Typeface.isSynthesizing returns
// false and fontWeight is omitted from the style fragment.
export function createRealFamilyTheme () {

  return {
    Color: {
      APP_PRIMARY: '#0f62fe',
      APP_PRIMARY_HOVERED: '#0353e9',
      APP_PRIMARY_PRESSED: '#0043d9',
      APP_PRIMARY_DISABLED: '#a6c8ff',
      APP_PRIMARY_SUBTLE: '#edf5ff',
      TEXT_PRIMARY: '#161616',
      TEXT_SECONDARY: '#525252',
      TEXT_MUTED: '#6f6f6f',
      TEXT_DISABLED: '#a8a8a8',
      TEXT_ON_PRIMARY: '#ffffff',
      BACKGROUND_PRIMARY: '#ffffff',
      BACKGROUND_SECONDARY: '#f4f4f4',
      SURFACE: '#ffffff',
      BORDER: '#e0e0e0',
      BORDER_STRONG: '#8d8d8d',
      BORDER_SUBTLE: '#e0e0e0',
      STATUS_SUCCESS: '#0e6027',
      STATUS_SUCCESS_SUBTLE: '#e8f5e9',
      STATUS_DANGER: '#da1e28',
      STATUS_DANGER_SUBTLE: '#fff1f1',
      STATUS_WARNING: '#8e6a00',
      STATUS_WARNING_SUBTLE: '#fcf4d6',
      STATUS_INFO: '#0043ce',
      STATUS_INFO_SUBTLE: '#edf5ff'
    },
    Dimension: {
      fontSize: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 },
      space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
      radius: { sm: 4, md: 8, lg: 12, xl: 16, pill: 999 },
      lineHeightRatio: 1.4
    },
    Font: {
      family: { primary: 'Poppins_400Regular', secondary: 'Poppins_600SemiBold' },
      weight: { regular: '400', medium: '500', semibold: '600', bold: '700' }
    },
    Breakpoint: {
      base: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  };

}
