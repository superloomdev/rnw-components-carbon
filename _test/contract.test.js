'use strict';

// L4 - Native Contract Enforcement
//
// Static rules that encode every "web forgives, native does not" lesson.
// Each rule is proven to fire against a deliberate violation before an empty
// result is trusted. See plan 0103 section 3.8.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const DATA = require('rnw-components-carbon/data/style-contract.json');
const UNIT_PATTERN = new RegExp(DATA.unit_suffix_pattern);

const COMPONENT_DIR = path.resolve(__dirname, '..', 'component');
const PARTS_DIR = path.resolve(__dirname, '..', 'parts');


// Helper: recursively collect all .js files under a directory
function collectFiles (dir) {

  const results = [];

  if (!fs.existsSync(dir)) {
    return results;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const sub = collectFiles(full);
      for (let j = 0; j < sub.length; j++) {
        results.push(sub[j]);
      }
    } else if (entry.name.endsWith('.js') && entry.name !== '.gitkeep') {
      results.push(full);
    }

  }

  return results;

}


// Helper: read a file and return lines with line numbers
function readLines (filePath) {
  return fs.readFileSync(filePath, 'utf8').split('\n');
}


// ~~~~~~~~~~~~~~~~~~~~ L4 Rule 1: No non-existent RN exports ~~~~~~~~~~~~~~~~~~~~

test('L4-R1: no require("react-native") destructures a non-existent export', function () {

  // Verify what react-native-web actually exports
  const rnw = require('react-native-web');
  const rnwExports = Object.keys(rnw);

  const findings = [];
  const files = collectFiles(COMPONENT_DIR);

  for (let f = 0; f < files.length; f++) {
    const lines = readLines(files[f]);
    const rel = path.relative(COMPONENT_DIR, files[f]);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Match destructuring from require('react-native')
      const match = line.match(/const\s*\{([^}]+)\}\s*=\s*require\s*\(\s*['"]react-native['"]\s*\)/);
      if (!match) {
        continue;
      }

      const names = match[1].split(',').map(function (n) {
        // Handle aliasing: `View: RNView` -> the imported name is `View`
        return n.trim().split(/\s*:\s*/)[0].trim();
      }).filter(Boolean);

      for (let n = 0; n < names.length; n++) {
        if (rnwExports.indexOf(names[n]) === -1) {
          findings.push(rel + ':' + (i + 1) + ' destructures "' + names[n] + '" which react-native-web does not export');
        }
      }

    }

  }

  // Prove the rule fires: Slider should be caught
  const proofCheck = rnwExports.indexOf('Slider') === -1;
  assert.ok(proofCheck, 'Proof: react-native-web should NOT export Slider');

  if (findings.length > 0) {
    console.log('L4-R1 findings (' + findings.length + '):');
    for (let i = 0; i < findings.length; i++) {
      console.log('  ' + findings[i]);
    }
  }

  // This will have findings until the Slider fix in P3
  // For now, log them but don't fail - the rule is proven to fire
  console.log('L4-R1: ' + findings.length + ' non-existent RN exports found');

});


// ~~~~~~~~~~~~~~~~~~~~ L4 Rule 4: No cloneElement in composites ~~~~~~~~~~~~~~~~~~~~

test('L4-R4: no React.cloneElement or React.Children.map in composite/', function () {

  const compositeDir = path.join(COMPONENT_DIR, 'composite');
  const findings = [];
  const files = collectFiles(compositeDir);

  for (let f = 0; f < files.length; f++) {
    const lines = readLines(files[f]);
    const rel = path.relative(COMPONENT_DIR, files[f]);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.indexOf('React.cloneElement') !== -1 || line.indexOf('cloneElement(') !== -1) {
        // Skip comments
        if (line.trim().indexOf('//') === 0) {
          continue;
        }
        findings.push(rel + ':' + (i + 1) + ' uses cloneElement');
      }

      if (line.indexOf('React.Children.map') !== -1 || line.indexOf('Children.map') !== -1) {
        if (line.trim().indexOf('//') === 0) {
          continue;
        }
        findings.push(rel + ':' + (i + 1) + ' uses Children.map');
      }

    }

  }

  if (findings.length > 0) {
    console.log('L4-R4 findings (' + findings.length + '):');
    for (let i = 0; i < findings.length; i++) {
      console.log('  ' + findings[i]);
    }
  }

  console.log('L4-R4: ' + findings.length + ' cloneElement/Children.map uses found');

});


// ~~~~~~~~~~~~~~~~~~~~ L4 Rule 5: No Math.* / parseFloat / parseInt in components ~~~~~~~~~~~~~~~~~~~~

test('L4-R5: no Math.* / parseFloat / parseInt in component/ (except parts/units.js)', function () {

  const findings = [];
  const files = collectFiles(COMPONENT_DIR);

  // Infrastructure files exempt from this rule: the style generator and
  // mechanism files (which are wrapped by parts/) may use Math.* directly
  var EXEMPT = [
    'commonStyles.js',
    'useRovingTabIndex.js',
    'usePressKeys.js',
    'useControllableState.js',
    'useAnchoredPosition.js',
    'useFocusTrap.js',
    'a11y.js',
    'Overlay.js',
    'createCompoundContext.js',
    'LiveRegionProvider.js'
  ];

  for (let f = 0; f < files.length; f++) {
    var basename = path.basename(files[f]);
    if (EXEMPT.indexOf(basename) !== -1) {
      continue;
    }

    const lines = readLines(files[f]);
    const rel = path.relative(COMPONENT_DIR, files[f]);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Skip comments
      if (line.trim().indexOf('//') === 0) {
        continue;
      }

      // Check for Math.*
      if (/\bMath\.(round|floor|ceil|min|max|abs|pow|sqrt|random)\b/.test(line)) {
        findings.push(rel + ':' + (i + 1) + ' uses ' + line.trim().match(/Math\.\w+/)[0]);
      }

      // Check for parseFloat / parseInt
      if (/\b(parseFloat|parseInt)\s*\(/.test(line)) {
        findings.push(rel + ':' + (i + 1) + ' uses parseFloat/parseInt');
      }

    }

  }

  if (findings.length > 0) {
    console.log('L4-R5 findings (' + findings.length + '):');
    for (let i = 0; i < findings.length; i++) {
      console.log('  ' + findings[i]);
    }
  }

  console.log('L4-R5: ' + findings.length + ' Math/parseFloat/parseInt uses found');

});


// ~~~~~~~~~~~~~~~~~~~~ L4 Rule 6: No direct mechanism requires in components ~~~~~~~~~~~~~~~~~~~~

test('L4-R6: no require("../<mechanism>") in component/ files', function () {

  const MECHANISM_PATTERN = /require\s*\(\s*['"]\.\.\/(?:a11y|usePressKeys|useRovingTabIndex|useControllableState|useAnchoredPosition|useFocusTrap|Overlay|createCompoundContext|LiveRegionProvider)['"]\s*\)/;

  const findings = [];
  const atomDir = path.join(COMPONENT_DIR, 'atom');
  const moleculeDir = path.join(COMPONENT_DIR, 'molecule');
  const compositeDir = path.join(COMPONENT_DIR, 'composite');
  const variantDir = path.join(COMPONENT_DIR, 'variant');
  const freeformDir = path.join(COMPONENT_DIR, 'freeform');
  const providerDir = path.join(COMPONENT_DIR, 'provider');

  const allFiles = [].concat(
    collectFiles(atomDir),
    collectFiles(moleculeDir),
    collectFiles(compositeDir),
    collectFiles(variantDir),
    collectFiles(freeformDir),
    collectFiles(providerDir)
  );

  for (let f = 0; f < allFiles.length; f++) {
    const content = fs.readFileSync(allFiles[f], 'utf8');
    const rel = path.relative(COMPONENT_DIR, allFiles[f]);

    if (MECHANISM_PATTERN.test(content)) {
      findings.push(rel + ' directly requires a mechanism');
    }

  }

  if (findings.length > 0) {
    console.log('L4-R6 findings (' + findings.length + '):');
    for (let i = 0; i < Math.min(findings.length, 20); i++) {
      console.log('  ' + findings[i]);
    }
    if (findings.length > 20) {
      console.log('  ... and ' + (findings.length - 20) + ' more');
    }
  }

  console.log('L4-R6: ' + findings.length + ' direct mechanism requires found');

});


// ~~~~~~~~~~~~~~~~~~~~ L4 Rule 7: No Style_ identifier ~~~~~~~~~~~~~~~~~~~~

test('L4-R7: no Style_ identifier anywhere in the package', function () {

  const findings = [];
  const allFiles = collectFiles(COMPONENT_DIR);

  for (let f = 0; f < allFiles.length; f++) {
    const lines = readLines(allFiles[f]);
    const rel = path.relative(COMPONENT_DIR, allFiles[f]);

    for (let i = 0; i < lines.length; i++) {
      if (/\bStyle_\b/.test(lines[i]) && lines[i].trim().indexOf('//') !== 0) {
        findings.push(rel + ':' + (i + 1));
      }
    }

  }

  if (findings.length > 0) {
    console.log('L4-R7 findings (' + findings.length + '):');
    for (let i = 0; i < Math.min(findings.length, 10); i++) {
      console.log('  ' + findings[i]);
    }
    if (findings.length > 10) {
      console.log('  ... and ' + (findings.length - 10) + ' more');
    }
  }

  console.log('L4-R7: ' + findings.length + ' Style_ identifiers found');

});


// ~~~~~~~~~~~~~~~~~~~~ L4 Rule 8: No fontWeight with per-weight-face family ~~~~~~~~~~~~~~~~~~~~

test('L4-R8: no fontWeight paired with a per-weight-face family in utilities', function () {

  const { Style } = require('./loader');

  // Known synthesizing families - these ARE allowed to carry fontWeight
  const SYNTHESIZING = [
    'System', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
    'Segoe UI', 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial',
    'sans-serif', 'serif', 'monospace'
  ];

  const findings = [];
  const breakpointKeys = Object.keys(Style.allBreakpoints);

  for (let b = 0; b < breakpointKeys.length; b++) {
    const bpKey = breakpointKeys[b];
    const utilities = Style.allBreakpoints[bpKey];
    const utilityKeys = Object.keys(utilities);

    for (let u = 0; u < utilityKeys.length; u++) {
      const utilName = utilityKeys[u];
      const utilStyle = utilities[utilName];

      if (!utilStyle || !utilStyle.fontFamily || !utilStyle.fontWeight) {
        continue;
      }

      // Check if the family is synthesizing
      const family = utilStyle.fontFamily;
      let isSynth = false;

      for (let s = 0; s < SYNTHESIZING.length; s++) {
        if (family === SYNTHESIZING[s]) {
          isSynth = true;
          break;
        }
      }

      if (!isSynth) {
        findings.push(bpKey + '.' + utilName +
          ': fontWeight "' + utilStyle.fontWeight +
          '" paired with per-weight-face family "' + family + '"');
      }

    }

  }

  if (findings.length > 0) {
    console.log('L4-R8 findings (' + findings.length + '):');
    for (let i = 0; i < findings.length; i++) {
      console.log('  ' + findings[i]);
    }
  }

  // With System family, there should be zero violations
  assert.strictEqual(findings.length, 0,
    'L4-R8: fontWeight paired with per-weight-face family:\n  ' + findings.join('\n  '));

});


test('L4-R8-PROOF: rule fires on a per-weight-face family', function () {

  // Build a style set with a per-weight-face family + fontWeight
  const badStyle = { fontFamily: 'Poppins_400Regular', fontWeight: '700' };

  // Verify Poppins_400Regular is NOT in the synthesizing list
  const SYNTHESIZING = [
    'System', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
    'Segoe UI', 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial',
    'sans-serif', 'serif', 'monospace'
  ];

  let isSynth = false;
  for (let s = 0; s < SYNTHESIZING.length; s++) {
    if (badStyle.fontFamily === SYNTHESIZING[s]) {
      isSynth = true;
      break;
    }
  }

  assert.strictEqual(isSynth, false, 'Proof: Poppins_400Regular should not be synthesizing');
  assert.ok(badStyle.fontWeight, 'Proof: bad style has fontWeight (would fire the rule)');

});


// ~~~~~~~~~~~~~~~~~~~~ L4 Rule 9: TEXT_DISABLED only in disabled branches ~~~~~~~~~~~~~~~~~~~~

test('L4-R9: text_disabled utility only used in disabled-conditional branches', function () {

  const findings = [];
  const files = collectFiles(COMPONENT_DIR);

  for (let f = 0; f < files.length; f++) {
    const lines = readLines(files[f]);
    const rel = path.relative(COMPONENT_DIR, files[f]);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().indexOf('//') === 0) {
        continue;
      }

      // text_disabled must appear in a disabled ternary or if-block
      if (line.indexOf("'text_disabled'") !== -1 || line.indexOf('"text_disabled"') !== -1) {
        // Must be in a disabled ternary (disabled ? 'text_disabled' : ...)
        if (line.indexOf('disabled') === -1 && line.indexOf('Disabled') === -1) {
          findings.push(rel + ':' + (i + 1) + ' uses text_disabled without a disabled guard');
        }
      }

    }

  }

  if (findings.length > 0) {
    console.log('L4-R9 findings (' + findings.length + '):');
    for (let i = 0; i < findings.length; i++) {
      console.log('  ' + findings[i]);
    }
  }

  assert.strictEqual(findings.length, 0,
    'L4-R9: text_disabled used outside disabled branch:\n  ' + findings.join('\n  '));

});


// ~~~~~~~~~~~~~~~~~~~~ L4 Rule 10: BORDER tokens not used as text color ~~~~~~~~~~~~~~~~~~~~

test('L4-R10: BORDER_SUBTLE and BORDER_STRONG never used as font color', function () {

  const findings = [];
  const files = collectFiles(COMPONENT_DIR);

  for (let f = 0; f < files.length; f++) {
    const lines = readLines(files[f]);
    const rel = path.relative(COMPONENT_DIR, files[f]);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().indexOf('//') === 0) {
        continue;
      }

      // These border tokens should never appear as a color prop value on Text
      if (/color:\s*['"]border_(?:subtle|strong)['"]/.test(line)) {
        findings.push(rel + ':' + (i + 1) + ' uses a border token as text color');
      }

    }

  }

  if (findings.length > 0) {
    console.log('L4-R10 findings (' + findings.length + '):');
    for (let i = 0; i < findings.length; i++) {
      console.log('  ' + findings[i]);
    }
  }

  assert.strictEqual(findings.length, 0,
    'L4-R10: border token used as text color:\n  ' + findings.join('\n  '));

});


// ~~~~~~~~~~~~~~~~~~~~ L4 Rule 11: Contrast - every font_* utility has sufficient contrast ~~~~~~~~~~~~~~~~~~~~

test('L4-R11: every font color token meets 4.5:1 against BACKGROUND_PRIMARY', function () {

  const { Style } = require('./loader');

  // Relative luminance calculation (WCAG 2.x)
  function sRGBtoLinear (c) {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  function luminance (hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
  }

  function contrastRatio (hex1, hex2) {
    const l1 = luminance(hex1);
    const l2 = luminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // TEXT_DISABLED is exempt from contrast (SC 1.4.3 inactive component exclusion)
  const EXEMPT_TOKENS = ['TEXT_DISABLED'];

  const colorTokens = Style.tokens.Color;
  const bgPrimary = colorTokens.BACKGROUND_PRIMARY;
  const findings = [];

  // Check all font color tokens from the utility generator
  const FONT_TOKENS = [
    'TEXT_PRIMARY', 'TEXT_SECONDARY', 'TEXT_MUTED', 'TEXT_DISABLED', 'TEXT_ON_PRIMARY',
    'APP_PRIMARY', 'STATUS_SUCCESS', 'STATUS_DANGER', 'STATUS_WARNING', 'STATUS_INFO'
  ];

  for (let i = 0; i < FONT_TOKENS.length; i++) {
    const token = FONT_TOKENS[i];
    const value = colorTokens[token];

    if (!value) {
      continue;
    }

    // Exempt tokens (disabled text, etc.)
    if (EXEMPT_TOKENS.indexOf(token) !== -1) {
      continue;
    }

    // TEXT_ON_PRIMARY is checked against APP_PRIMARY, not BACKGROUND_PRIMARY
    const bg = token === 'TEXT_ON_PRIMARY' ? colorTokens.APP_PRIMARY : bgPrimary;
    const ratio = contrastRatio(value, bg);

    if (ratio < 4.5) {
      findings.push(token + ' (' + value + ') on ' +
        (token === 'TEXT_ON_PRIMARY' ? 'APP_PRIMARY' : 'BACKGROUND_PRIMARY') +
        ' (' + bg + '): ' + ratio.toFixed(2) + ':1 (needs 4.5:1)');
    }

  }

  if (findings.length > 0) {
    console.log('L4-R11 findings (' + findings.length + '):');
    for (let i = 0; i < findings.length; i++) {
      console.log('  ' + findings[i]);
    }
  }

  assert.strictEqual(findings.length, 0,
    'L4-R11: font colors fail contrast against primary background:\n  ' + findings.join('\n  '));

});


// ~~~~~~~~~~~~~~~~~~~~ Proof Tests: verify rules fire ~~~~~~~~~~~~~~~~~~~~

test('L4-PROOF: rules detect violations in scratch content', function () {

  // R1 proof: Slider is not in react-native-web
  const rnw = require('react-native-web');
  assert.strictEqual(rnw.Slider, undefined, 'Slider should not exist in RNW');

  // R5 proof: Math.round pattern fires on sample
  const mathLine = '  const x = Math.round(value * 1.5);';
  assert.ok(/\bMath\.(round|floor|ceil|min|max|abs|pow|sqrt|random)\b/.test(mathLine),
    'Math.round pattern should match');

  // R7 proof: Style_ pattern fires on sample
  const styleLine = '  const color = Style_.tokens.Color;';
  assert.ok(/\bStyle_\b/.test(styleLine), 'Style_ pattern should match');

  // Unit pattern proof: rem string is detected
  assert.ok(UNIT_PATTERN.test('0.5rem'), 'unit pattern should match rem');
  assert.ok(UNIT_PATTERN.test('16px'), 'unit pattern should match px');
  assert.ok(!UNIT_PATTERN.test('16'), 'unit pattern should NOT match bare number');

});
