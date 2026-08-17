// Info: Documentation generator. Rewrites marked regions of README.md,
// ROBOTS.md, docs/api.md, and docs/carbon-parity.md from the roster
// fixture. Also generates docs/platform-support.md in full.
//
// The generator is the source of truth for component tables. CI fails
// if running the generator produces a diff. Hand-maintained tables drift
// immediately at this scale (231+ components).
//
// Usage: node .github/ci-scripts/generate-docs.js
'use strict';


const fs = require('node:fs');
const path = require('node:path');


const ROOT = path.resolve(__dirname, '..', '..');
const FIXTURE_PATH = path.join(ROOT, '_test/fixtures/component-roster.json');


// ---------------------------------------------------------------------------
// Platform wording
// ---------------------------------------------------------------------------

const PLATFORM_WORDING = {
  'both': 'Both web and native',
  'split': 'Split (web and native differ)',
  'web-primary': 'Web primary (null on native)',
  'native-primary': 'Native primary (degrades on web)',
  'excluded': 'Excluded (cannot exist in RN)'
};


// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadRoster () {
  return JSON.parse(fs.readFileSync(FIXTURE_PATH, 'utf8'));
}

function replaceRegion (content, beginMarker, endMarker, replacement) {

  const beginIdx = content.indexOf(beginMarker);
  if (beginIdx === -1) {
    throw new Error('Begin marker not found: ' + beginMarker);
  }

  const endIdx = content.indexOf(endMarker, beginIdx);
  if (endIdx === -1) {
    throw new Error('End marker not found: ' + endMarker);
  }

  // Preserve content up to begin marker + newline, insert replacement,
  // preserve content after end marker
  const before = content.slice(0, beginIdx + beginMarker.length);
  const after = content.slice(endIdx);

  return before + '\n' + replacement + '\n' + after;

}

function readDoc (filename) {
  const p = path.join(ROOT, filename);
  if (!fs.existsSync(p)) {
    return '';
  }
  return fs.readFileSync(p, 'utf8');
}

function writeDoc (filename, content) {
  fs.writeFileSync(path.join(ROOT, filename), content);
}


// ---------------------------------------------------------------------------
// Component table for README.md
// ---------------------------------------------------------------------------

function generateComponentTable (roster) {

  const built = roster.components.filter(function (c) {
    return c.status === 'built';
  });

  const lines = [
    '| Component | Tier | Platform | Source |',
    '|---|---|---|---|'
  ];

  built.forEach(function (c) {
    lines.push(
      '| `' + c.name + '` | ' + c.tier + ' | ' + PLATFORM_WORDING[c.platform] +
      ' | ' + c.source + ' |'
    );
  });

  return lines.join('\n');

}


// ---------------------------------------------------------------------------
// Component count summary
// ---------------------------------------------------------------------------

function generateCountSummary (roster) {

  const built = roster.components.filter(function (c) {
    return c.status === 'built';
  });
  const excluded = roster.components.filter(function (c) {
    return c.status === 'excluded';
  });
  const both = built.filter(function (c) {
    return c.platform === 'both';
  });
  const split = built.filter(function (c) {
    return c.platform === 'split';
  });
  const webPrimary = built.filter(function (c) {
    return c.platform === 'web-primary';
  });
  const nativePrimary = built.filter(function (c) {
    return c.platform === 'native-primary';
  });

  return [
    '- **Total components:** ' + built.length,
    '- **Both web and native:** ' + both.length + ' (' + Math.round(both.length / built.length * 100) + '%)',
    '- **Split (platform-specific):** ' + split.length,
    '- **Web primary:** ' + webPrimary.length,
    '- **Native primary:** ' + nativePrimary.length,
    '- **Excluded (cannot exist in RN):** ' + excluded.length,
    '- **Providers:** ' + roster.counts.currentProvider,
    '- **Flat components:** ' + roster.counts.currentFlat
  ].join('\n');

}


// ---------------------------------------------------------------------------
// ROBOTS.md component list
// ---------------------------------------------------------------------------

function generateRobotsList (roster) {

  const built = roster.components.filter(function (c) {
    return c.status === 'built';
  });

  const lines = [
    '| Component | Role | Platform |',
    '|---|---|---|'
  ];

  built.forEach(function (c) {
    let role = c.tier;
    if (c.registry === 'provider') {
      role = 'provider';
    }
    lines.push(
      '| `' + c.name + '` | ' + role + ' | ' + c.platform + ' |'
    );
  });

  return lines.join('\n');

}


// ---------------------------------------------------------------------------
// API.md component sections
// ---------------------------------------------------------------------------

function generateApiSections (roster) {

  const built = roster.components.filter(function (c) {
    return c.status === 'built';
  });

  const sections = [];

  built.forEach(function (c) {
    sections.push('### ' + c.name);
    sections.push('');
    sections.push('**Tier:** ' + c.tier + ' | **Platform:** ' + PLATFORM_WORDING[c.platform] + ' | **Source:** ' + c.source);
    sections.push('');
    sections.push('See `component/' + c.tier + '/' + c.name.charAt(0).toLowerCase() + c.name.slice(1) + '.js` for the Info header and prop list.');
    sections.push('');
  });

  return sections.join('\n');

}


// ---------------------------------------------------------------------------
// Platform support document (generated in full)
// ---------------------------------------------------------------------------

function generatePlatformSupport (roster) {

  const built = roster.components.filter(function (c) {
    return c.status === 'built';
  });
  const excluded = roster.components.filter(function (c) {
    return c.status === 'excluded';
  });
  const exceptions = built.filter(function (c) {
    return c.platform !== 'both';
  });

  const both = built.filter(function (c) {
    return c.platform === 'both';
  });
  const bothPct = Math.round(both.length / built.length * 100);

  let doc = '# Platform Support\n\n';
  doc += '## Headline\n\n';
  doc += built.length + ' components ship. ' + both.length + ' (' + bothPct + '%) work identically on web and native with no platform branch. ' + exceptions.length + ' need platform attention.\n\n';
  doc += '## Platform selection at build time\n\n';
  doc += 'Platform-specific implementations use `.web.js` and `.native.js` file extensions. The React Native bundler resolves the correct variant at build time, with no runtime cost. A component that works on both platforms has a single `.js` file.\n\n';
  doc += '## Safe area is not native-only\n\n';
  doc += 'CSS `env(safe-area-inset-*)` is a W3C spec shipped in browsers. `react-native-safe-area-context` supports web. `SafeAreaWrapper` returns real insets in an iOS PWA with `viewport-fit=cover` and zeros on desktop. It does not gate behind `Platform.OS === \'ios\'`.\n\n';
  doc += 'To enable safe area insets on web, add this meta tag to your HTML:\n\n';
  doc += '```html\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n```\n\n';
  doc += '## All ' + exceptions.length + ' exceptions\n\n';
  doc += '| Component | Platform | Behavior |\n';
  doc += '|---|---|---|\n';

  exceptions.forEach(function (c) {
    let behavior = '';
    if (c.platform === 'split') {
      behavior = 'One API, two build-time implementations (.web.js and .native.js)';
    } else if (c.platform === 'web-primary') {
      behavior = 'Renders on web, returns null on native';
    } else if (c.platform === 'native-primary') {
      behavior = 'Full features on native, degrades safely on web';
    } else if (c.platform === 'excluded') {
      behavior = 'Cannot exist in React Native';
    }
    doc += '| `' + c.name + '` | ' + c.platform + ' | ' + behavior + ' |\n';
  });

  doc += '\n## Excluded components\n\n';
  doc += 'These components cannot exist in React Native and are not in the registry:\n\n';
  doc += '| Component | Reason |\n';
  doc += '|---|---|\n';

  excluded.forEach(function (c) {
    doc += '| `' + c.name + '` | ' + (c.name === 'ClassPrefix' ? 'RN has no CSS classes to prefix' : 'Not applicable') + ' |\n';
  });

  return doc;

}


// ---------------------------------------------------------------------------
// Carbon parity document (both directions)
// ---------------------------------------------------------------------------

function generateCarbonParity (roster) {

  const built = roster.components.filter(function (c) {
    return c.status === 'built';
  });
  const excluded = roster.components.filter(function (c) {
    return c.status === 'excluded';
  });

  let doc = '# Carbon Parity\n\n';
  doc += '## What we ship\n\n';
  doc += 'The registry is the union of `@carbon/react` (web) and `@carbon/react-native`, plus sanctioned non-Carbon exceptions (substrate primitives, collapsed variants, unexported indicators, and infrastructure providers).\n\n';
  doc += 'Total: ' + built.length + ' built, ' + excluded.length + ' excluded.\n\n';
  doc += '### Shipped components\n\n';
  doc += '| Component | Source | Platform |\n';
  doc += '|---|---|---|\n';

  built.forEach(function (c) {
    doc += '| `' + c.name + '` | ' + c.source + ' | ' + c.platform + ' |\n';
  });

  doc += '\n## What Carbon has that we deliberately do not\n\n';
  doc += 'Someone porting Carbon code needs to look up a missing component and find what replaced it, not conclude the library is incomplete.\n\n';
  doc += '| Carbon component | Status | Replacement / Reason |\n';
  doc += '|---|---|---|\n';

  // Excluded
  excluded.forEach(function (c) {
    let reason = '';
    if (c.name === 'ClassPrefix') {
      reason = 'RN has no CSS classes to prefix';
    }
    doc += '| `' + c.name + '` | Excluded | ' + reason + ' |\n';
  });

  // Collapses
  doc += '| `Fluid*` variants | Collapsed | `FluidForm` provider with a `fluid` prop |\n';
  doc += '| `ButtonPrimary`, `ButtonLink` | Collapsed | `Button kind="primary" \\| "ghost"` |\n';
  doc += '| `Card` | Collapsed | `Tile` covers the container use case |\n';
  doc += '| `Badge` | Collapsed | `Tag` and `BadgeIndicator` (both shipped) |\n';
  doc += '| `Separator` | Collapsed | Contextual dividers: `MenuItemDivider`, `SideNavDivider`, `SwitcherDivider` |\n';
  doc += '| `Divider` | Collapsed | Same as Separator |\n';
  doc += '| `DateRangePicker` | Collapsed | `DatePicker datePickerType="range"` |\n';
  doc += '| `SliderInput` | Collapsed | `Slider hideTextInput={false}` |\n';
  doc += '| `GridItem` | Collapsed | `Column span={n}` |\n';
  doc += '| `Fieldset`, `Legend` | Collapsed | Internal parts of `FormGroup` |\n';
  doc += '| `ToggleGroup` | Collapsed | `ContentSwitcher` is the segmented control |\n';
  doc += '| `ScrollGradient` | Deleted | Not in either Carbon package |\n';
  doc += '| `PaginationBar` | Collapsed | `Pagination` |\n';
  doc += '| `NumberInputComposite` | Collapsed | `NumberInput` molecule |\n';
  doc += '| `LayerMolecule` | Collapsed | `provider.Layer` |\n';
  doc += '| 24 `Skeleton*` variants | Collapsed | One `Skeleton` atom with shape props |\n';

  return doc;

}


// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main () {

  const roster = loadRoster();

  // Generate platform-support.md (full document)
  const platformDoc = generatePlatformSupport(roster);
  writeDoc(path.join('docs', 'platform-support.md'), platformDoc);
  process.stdout.write('Generated docs/platform-support.md\n');

  // Generate carbon-parity.md (full document)
  const parityDoc = generateCarbonParity(roster);
  writeDoc(path.join('docs', 'carbon-parity.md'), parityDoc);
  process.stdout.write('Generated docs/carbon-parity.md\n');

  // Update README.md (component table + count summary)
  let readme = readDoc('README.md');
  if (readme) {
    readme = replaceRegion(readme,
      '<!-- BEGIN GENERATED: component-table -->',
      '<!-- END GENERATED: component-table -->',
      generateComponentTable(roster));
    readme = replaceRegion(readme,
      '<!-- BEGIN GENERATED: count-summary -->',
      '<!-- END GENERATED: count-summary -->',
      generateCountSummary(roster));
    writeDoc('README.md', readme);
    process.stdout.write('Updated README.md\n');
  }

  // Update ROBOTS.md (component list)
  let robots = readDoc('ROBOTS.md');
  if (robots) {
    robots = replaceRegion(robots,
      '<!-- BEGIN GENERATED: component-list -->',
      '<!-- END GENERATED: component-list -->',
      generateRobotsList(roster));
    writeDoc('ROBOTS.md', robots);
    process.stdout.write('Updated ROBOTS.md\n');
  }

  // Update docs/api.md (component sections)
  let api = readDoc(path.join('docs', 'api.md'));
  if (api) {
    api = replaceRegion(api,
      '<!-- BEGIN GENERATED: component-sections -->',
      '<!-- END GENERATED: component-sections -->',
      generateApiSections(roster));
    writeDoc(path.join('docs', 'api.md'), api);
    process.stdout.write('Updated docs/api.md\n');
  }

  process.stdout.write('Documentation generation complete.\n');

}

if (require.main === module) {
  main();
}

module.exports = {
  generateComponentTable: generateComponentTable,
  generateCountSummary: generateCountSummary,
  generatePlatformSupport: generatePlatformSupport,
  generateCarbonParity: generateCarbonParity
};
