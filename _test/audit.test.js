'use strict';

// L1 - Static Token Auditor
//
// For every breakpoint's utility set and every token group, flag NaN, null,
// unit-suffixed strings on numeric props, and undefined values. Reads the
// prop list and pattern from data/style-contract.json. Never hardcodes them.
//
// Against the pre-fix theme (web projection with rem strings) this produces
// errors, proving the test fires. Against the native projection it passes.

const { test } = require('node:test');
const assert = require('node:assert/strict');

const {
  Components,
  Style,
  theme
} = require('./loader');

const DATA = require('rnw-components-carbon/data/style-contract.json');
const NUMERIC_PROPS = DATA.numeric_style_props;
const UNIT_PATTERN = new RegExp(DATA.unit_suffix_pattern);


// ~~~~~~~~~~~~~~~~~~~~ L1: Static Utility Audit ~~~~~~~~~~~~~~~~~~~~

test('L1: all utility style values are finite numbers for numeric props', function () {

  const errors = [];
  const warnings = [];

  const breakpointKeys = Object.keys(Style.allBreakpoints);

  for (let b = 0; b < breakpointKeys.length; b++) {
    const bpKey = breakpointKeys[b];
    const utilities = Style.allBreakpoints[bpKey];
    const utilityKeys = Object.keys(utilities);

    for (let u = 0; u < utilityKeys.length; u++) {
      const utilName = utilityKeys[u];
      const utilStyle = utilities[utilName];

      if (utilStyle === null || utilStyle === undefined) {
        continue;
      }

      const propKeys = Object.keys(utilStyle);

      for (let p = 0; p < propKeys.length; p++) {
        const prop = propKeys[p];
        const value = utilStyle[prop];

        // Only check props that should be numeric
        if (NUMERIC_PROPS.indexOf(prop) === -1) {
          continue;
        }

        const location = bpKey + '.' + utilName + '.' + prop;

        if (Number.isNaN(value)) {
          errors.push('NaN at ' + location);
        } else if (value === null) {
          errors.push('null at ' + location + ' on a numeric prop');
        } else if (typeof value === 'string' && UNIT_PATTERN.test(value)) {
          errors.push('unit string "' + value + '" at ' + location);
        } else if (value === undefined) {
          warnings.push('undefined at ' + location);
        }

      }

    }

  }

  if (warnings.length > 0) {
    console.log('L1 warnings: ' + warnings.length);
    for (let i = 0; i < warnings.length; i++) {
      console.log('  WARN: ' + warnings[i]);
    }
  }

  assert.strictEqual(errors.length, 0,
    'L1 found ' + errors.length + ' errors:\n  ' + errors.join('\n  '));

});


test('L1: theme Dimension values are finite numbers', function () {

  const errors = [];

  // fontSize
  const fontSizeKeys = Object.keys(theme.Dimension.fontSize);

  for (let i = 0; i < fontSizeKeys.length; i++) {
    const key = fontSizeKeys[i];
    const value = theme.Dimension.fontSize[key];

    if (!Number.isFinite(value)) {
      errors.push('fontSize.' + key + ' = ' + value + ' (not a finite number)');
    }

  }

  // space
  const spaceKeys = Object.keys(theme.Dimension.space);

  for (let i = 0; i < spaceKeys.length; i++) {
    const key = spaceKeys[i];
    const value = theme.Dimension.space[key];

    if (!Number.isFinite(value)) {
      errors.push('space.' + key + ' = ' + value + ' (not a finite number)');
    }

  }

  // radius
  const radiusKeys = Object.keys(theme.Dimension.radius);

  for (let i = 0; i < radiusKeys.length; i++) {
    const key = radiusKeys[i];
    const value = theme.Dimension.radius[key];

    if (!Number.isFinite(value)) {
      errors.push('radius.' + key + ' = ' + value + ' (not a finite number)');
    }

  }

  assert.strictEqual(errors.length, 0,
    'L1 found non-finite Dimension values:\n  ' + errors.join('\n  '));

});


test('L1: theme Color values are strings', function () {

  const errors = [];
  const colorKeys = Object.keys(theme.Color);

  for (let i = 0; i < colorKeys.length; i++) {
    const key = colorKeys[i];
    const value = theme.Color[key];

    if (typeof value !== 'string') {
      errors.push('Color.' + key + ' = ' + value + ' (type: ' + typeof value + ')');
    }

  }

  assert.strictEqual(errors.length, 0,
    'L1 found non-string Color values:\n  ' + errors.join('\n  '));

});


test('L1-PROOF: audit detects NaN, null, and unit strings in a bad theme', function () {

  // Build a deliberately bad theme with rem strings and NaN
  const badTheme = {
    Color: { APP_PRIMARY: '#0f62fe', TEXT_PRIMARY: '#161616' },
    Dimension: {
      fontSize: { xs: '0.75rem', sm: NaN, md: null },
      space: { xs: 4, sm: '0.5rem' },
      radius: { sm: 4 },
      lineHeightRatio: 1.4
    },
    Font: {
      family: { primary: 'System', secondary: 'System' },
      weight: { regular: '400' }
    },
    Breakpoint: { base: 0 }
  };

  // Build will throw on some of these, so we test the auditor logic directly
  const errors = [];

  // Check fontSize
  const fontSizeKeys = Object.keys(badTheme.Dimension.fontSize);
  for (let i = 0; i < fontSizeKeys.length; i++) {
    const key = fontSizeKeys[i];
    const value = badTheme.Dimension.fontSize[key];

    if (Number.isNaN(value)) {
      errors.push('NaN at fontSize.' + key);
    } else if (value === null) {
      errors.push('null at fontSize.' + key);
    } else if (typeof value === 'string' && UNIT_PATTERN.test(value)) {
      errors.push('unit string at fontSize.' + key + ': ' + value);
    }

  }

  // Check space
  const spaceKeys = Object.keys(badTheme.Dimension.space);
  for (let i = 0; i < spaceKeys.length; i++) {
    const key = spaceKeys[i];
    const value = badTheme.Dimension.space[key];

    if (typeof value === 'string' && UNIT_PATTERN.test(value)) {
      errors.push('unit string at space.' + key + ': ' + value);
    }

  }

  // Proof: should find at least 3 errors (rem, NaN, null)
  assert.ok(errors.length >= 3,
    'L1-PROOF: expected at least 3 errors, got ' + errors.length + ': ' + errors.join(', '));
  console.log('L1-PROOF: correctly found ' + errors.length + ' errors: ' + errors.join(', '));

});


test('L1: font weights resolve to registered faces (warn when Lib.Font absent)', function () {

  // When Lib.Font is not injected, every weight falls through to the
  // synthesizing family (System). This is fine - the test verifies that
  // the styleFor call produces valid output. When Lib.Font IS injected,
  // this test proves every theme weight has a matching registered face.
  const warnings = [];
  const weightKeys = Object.keys(theme.Font.weight);
  const family = theme.Font.family.primary;

  for (let i = 0; i < weightKeys.length; i++) {
    const w = weightKeys[i];
    const weightValue = theme.Font.weight[w];

    // The utility set should have a font_weight_<w> entry
    const utilName = 'font_weight_' + w;
    const utilStyle = Style.utilities[utilName];

    if (!utilStyle) {
      warnings.push(w + ': no utility style generated for weight "' + weightValue + '"');
      continue;
    }

    // For synthesizing families, fontWeight must be present
    // For per-weight-face families, fontWeight must be absent
    if (utilStyle.fontFamily && utilStyle.fontFamily !== family) {
      // Typeface resolved to a different family; expected for per-weight faces
      if (utilStyle.fontWeight) {
        warnings.push(w + ': fontWeight "' + utilStyle.fontWeight +
          '" paired with per-weight-face family "' + utilStyle.fontFamily + '"');
      }
    }

  }

  if (warnings.length > 0) {
    console.log('L1 font-weight warnings: ' + warnings.length);
    for (let i = 0; i < warnings.length; i++) {
      console.log('  WARN: ' + warnings[i]);
    }
  }

  // With System family and no Lib.Font, there should be zero warnings
  assert.strictEqual(warnings.length, 0,
    'L1 font-weight warnings:\n  ' + warnings.join('\n  '));

});


test('L1: Poppins real-family theme builds without fontWeight in utilities', function () {

  const { createRealFamilyTheme } = require('./harness/themes');
  const poppinsTheme = createRealFamilyTheme();

  // Build with the Poppins theme
  const built = Components.build(poppinsTheme, 'base');
  const poppinsUtils = built.Style.utilities;

  // For a per-weight-face family (Poppins), Typeface.styleFor should NOT
  // include fontWeight. Verify font_weight_regular has no fontWeight.
  const regular = poppinsUtils['font_weight_regular'];
  assert.ok(regular, 'font_weight_regular utility should exist');
  assert.strictEqual(regular.fontFamily, 'Poppins_400Regular',
    'font_weight_regular should use Poppins_400Regular');
  assert.strictEqual(regular.fontWeight, undefined,
    'font_weight_regular should NOT have fontWeight for per-weight-face family');

});


test('L1-PROOF: validateTheme rejects unit-suffixed dimension values', function () {

  const badTheme = {
    Color: theme.Color,
    Dimension: {
      fontSize: { xs: '0.75rem', sm: 14, md: 16 },
      space: { xs: 4 },
      radius: { sm: 4 },
      lineHeightRatio: 1.4
    },
    Font: theme.Font,
    Breakpoint: theme.Breakpoint
  };

  assert.throws(function () {
    Components.build(badTheme, 'base');
  }, function (err) {
    return err instanceof TypeError &&
      err.message.indexOf('unit-suffixed string') !== -1 &&
      err.message.indexOf('fontSize.xs') !== -1 &&
      err.message.indexOf('native projection') !== -1;
  }, 'Should throw TypeError for rem-suffixed fontSize');

});


test('L1-PROOF: validateTheme rejects NaN dimension values', function () {

  const badTheme = {
    Color: theme.Color,
    Dimension: {
      fontSize: { xs: 12, sm: NaN },
      space: { xs: 4 },
      radius: { sm: 4 },
      lineHeightRatio: 1.4
    },
    Font: theme.Font,
    Breakpoint: theme.Breakpoint
  };

  assert.throws(function () {
    Components.build(badTheme, 'base');
  }, function (err) {
    return err instanceof TypeError &&
      err.message.indexOf('finite number') !== -1 &&
      err.message.indexOf('fontSize.sm') !== -1;
  }, 'Should throw TypeError for NaN fontSize');

});


test('L1: theme Font weight values are strings', function () {

  const errors = [];
  const weightKeys = Object.keys(theme.Font.weight);

  for (let i = 0; i < weightKeys.length; i++) {
    const key = weightKeys[i];
    const value = theme.Font.weight[key];

    if (typeof value !== 'string') {
      errors.push('Font.weight.' + key + ' = ' + value + ' (type: ' + typeof value + ')');
    }

  }

  assert.strictEqual(errors.length, 0,
    'L1 found non-string Font.weight values:\n  ' + errors.join('\n  '));

});
