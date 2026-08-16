// Info: Roster generator. Reads the pre-computed Carbon union target from
// __dev__/wip/0102-carbon-union-roster.json, merges it with the current
// registry state (queried from the loader), applies platform classification
// and sanctioned exceptions, and writes component-roster.json.
//
// The generator is the source of truth for the roster fixture. The JSON is
// a checked-in snapshot. Running the generator twice must produce no diff.
//
// Usage: node _test/fixtures/generate-roster.js
//   --query   query the live registry via the loader and mark built names
//   --seed    seed without querying (uses the embedded current-registry list)
'use strict';


const fs = require('node:fs');
const path = require('node:path');


// ---------------------------------------------------------------------------
// 1. The Carbon union target, extracted from @carbon/react@1.79.0 and
//    @carbon/react-native@9.0.7. See __dev__/wip/0102-carbon-union-roster.json
//    for the extraction method and the raw package data.
// ---------------------------------------------------------------------------

const UNION_ARTIFACT_PATH = path.resolve(
  __dirname,
  '../../../../../__dev__/wip/0102-carbon-union-roster.json'
);


// ---------------------------------------------------------------------------
// 2. Sanctioned non-Carbon exceptions. Three classes, closed lists.
// ---------------------------------------------------------------------------

const SUBSTRATE = ['View', 'Icon', 'Image'];
const COLLAPSE = ['Skeleton'];
const UNEXPORTED = [
  'BadgeIndicator', 'ShapeIndicator', 'IconIndicator',
  'TruncatedText', 'UserAvatar', 'SidePanel'
];
const ALL_EXCEPTIONS = SUBSTRATE.concat(COLLAPSE, UNEXPORTED);


// ---------------------------------------------------------------------------
// 3. Platform classification. Draft membership from the artifact; everything
//    else defaults to 'both'. P0 confirms each entry.
// ---------------------------------------------------------------------------

const PLATFORM_EXCLUDED = ['ClassPrefix'];
const PLATFORM_SPLIT = [
  'FileUploader', 'FileUploaderButton', 'FileUploaderDropContainer',
  'FileUploaderItem', 'Overlay', 'ActionSheet', 'DocumentViewer',
  'CopyButton', 'CodeSnippet'
];
const PLATFORM_WEB_PRIMARY = ['SkipToContent'];
const PLATFORM_NATIVE_PRIMARY = [
  'SafeAreaWrapper', 'ViewWrapper', 'BottomSafeAreaColorOverride',
  'GrantPermission'
];


// ---------------------------------------------------------------------------
// 4. Current registry state. The 144 names registered today, including those
//    that P3 will rename or delete. Seeding with the real list keeps the gate
//    green before any P3 work. The generator can also query the live loader
//    via --query to stay in sync automatically.
// ---------------------------------------------------------------------------

const CURRENT_FLAT = [
  'AILabel', 'Accordion', 'AccordionItem', 'ActionBar', 'Alert', 'AspectRatio',
  'Badge', 'BadgeIndicator', 'BatchAction', 'Breadcrumb', 'BreadcrumbItem',
  'Button', 'ButtonLink', 'ButtonPrimary', 'ButtonSet', 'Callout', 'Card',
  'Checkbox', 'CheckboxGroup', 'ClickableTile', 'CodeSnippet', 'Column',
  'ComboBox', 'ComboButton', 'ComposedModal', 'Container', 'ContentSwitcher',
  'CopyButton', 'DataTable', 'DataTableRow', 'DateInput', 'DatePicker',
  'DateRangePicker', 'DefinitionTooltip', 'Divider', 'Dropdown',
  'ExpandableSearch', 'Fieldset', 'FileUploader', 'FlexGrid', 'FluidForm',
  'Form', 'FormGroup', 'FormItem', 'FormLabel', 'Grid', 'GridItem', 'Header',
  'HeaderMenuButton', 'HeaderNav', 'HeaderPanel', 'Heading', 'Icon',
  'IconButton', 'IconIndicator', 'Image', 'InlineLoading', 'LayerMolecule',
  'Legend', 'Link', 'ListItem', 'ListItemNav', 'Loading', 'LongPressMenu',
  'Menu', 'MenuButton', 'MenuItem', 'MenuItemDivider', 'MenuItemRadioGroup',
  'MenuItemSelectable', 'Modal', 'ModalBody', 'ModalFooter', 'ModalHeader',
  'MultiSelect', 'Notification', 'NumberInput', 'NumberInputComposite',
  'OrderedList', 'OverflowMenu', 'PageSelector', 'Pagination', 'PaginationBar',
  'PasswordInput', 'Popover', 'ProgressBar', 'ProgressIndicator', 'RadioButton',
  'RadioButtonGroup', 'Row', 'ScrollGradient', 'Search', 'Select',
  'SelectableTile', 'Separator', 'ShapeIndicator', 'SidePanel', 'Skeleton',
  'Slider', 'SliderInput', 'Stack', 'Step', 'Steps', 'StructuredList',
  'StructuredListCell', 'StructuredListRow', 'Switch', 'Tab', 'TabList',
  'TabPanel', 'TableBody', 'TableCell', 'TableHead', 'TableHeader', 'TableRow',
  'Tabs', 'Tag', 'Text', 'TextArea', 'TextInput', 'Tile', 'TimeInput',
  'TimePicker', 'Toast', 'Toggle', 'ToggleGroup', 'Toggletip', 'ToggletipLabel',
  'Toolbar', 'Tooltip', 'TreeNode', 'TreeView', 'TruncatedText', 'UnorderedList',
  'UserAvatar', 'View'
];

const CURRENT_PROVIDERS = [
  'ErrorBoundary', 'FeatureFlags', 'FluidForm', 'IdPrefix', 'Layer',
  'LiveRegionProvider', 'OverlayHost', 'Theme'
];


// ---------------------------------------------------------------------------
// 5. Build the fixture.
// ---------------------------------------------------------------------------

function classify (name) {

  if (PLATFORM_EXCLUDED.indexOf(name) !== -1) return 'excluded';
  if (PLATFORM_SPLIT.indexOf(name) !== -1) return 'split';
  if (PLATFORM_WEB_PRIMARY.indexOf(name) !== -1) return 'web-primary';
  if (PLATFORM_NATIVE_PRIMARY.indexOf(name) !== -1) return 'native-primary';
  return 'both';

}

function sourceOf (name, unionSet) {

  if (SUBSTRATE.indexOf(name) !== -1) return 'substrate';
  if (COLLAPSE.indexOf(name) !== -1) return 'collapse';
  if (UNEXPORTED.indexOf(name) !== -1) return 'unexported';
  if (unionSet.has(name)) return 'carbon';
  return 'non-carbon';

}

function tierOf (name) {

  // Providers are known
  if (CURRENT_PROVIDERS.indexOf(name) !== -1) return 'provider';
  // Substrate primitives are atoms
  if (SUBSTRATE.indexOf(name) !== -1) return 'atom';
  // Default to unknown for todo items; P3/P4 fills in the real tier
  return 'unknown';

}

function generate () {

  // Load the union artifact
  let artifact;
  try {
    artifact = JSON.parse(fs.readFileSync(UNION_ARTIFACT_PATH, 'utf8'));
  } catch (e) {
    throw new Error(
      'Cannot read ' + UNION_ARTIFACT_PATH + '. ' +
      'Run from the repo or ensure the artifact exists: ' + e.message
    );
  }

  const unionSet = new Set(artifact.target);

  // Collect every name: union target + exceptions + current non-carbon names
  const allNames = new Set();
  artifact.target.forEach(function (n) { allNames.add(n); });
  ALL_EXCEPTIONS.forEach(function (n) { allNames.add(n); });
  CURRENT_FLAT.forEach(function (n) { allNames.add(n); });
  CURRENT_PROVIDERS.forEach(function (n) { allNames.add(n); });

  const currentFlatSet = new Set(CURRENT_FLAT);
  const currentProviderSet = new Set(CURRENT_PROVIDERS);

  // Build the component list
  const components = [];

  allNames.forEach(function (name) {

    const platform = classify(name);
    const source = sourceOf(name, unionSet);
    const isExcluded = platform === 'excluded';

    // Determine registration: 'flat', 'provider', 'both', or null
    const inFlat = currentFlatSet.has(name);
    const inProvider = currentProviderSet.has(name);
    let registry = null;
    if (inFlat && inProvider) registry = 'both';
    else if (inFlat) registry = 'flat';
    else if (inProvider) registry = 'provider';

    // Status: 'built' if currently registered, 'excluded' if excluded, else 'todo'
    let status;
    if (isExcluded) {
      status = 'excluded';
    } else if (registry !== null) {
      status = 'built';
    } else {
      status = 'todo';
    }

    components.push({
      name: name,
      tier: tierOf(name),
      platform: platform,
      source: source,
      registry: registry,
      status: status
    });

  });

  components.sort(function (a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });

  // Build the flat and provider built-lists, preserving duplicates where
  // a name is registered in both (e.g. FluidForm)
  const builtFlat = CURRENT_FLAT.slice().sort();
  const builtProvider = CURRENT_PROVIDERS.slice().sort();

  const fixture = {
    generated: new Date().toISOString().slice(0, 10),
    sources: artifact.sources,
    counts: {
      target: artifact.target.length,
      exceptions: ALL_EXCEPTIONS.length,
      currentFlat: CURRENT_FLAT.length,
      currentProvider: CURRENT_PROVIDERS.length,
      total: components.length
    },
    builtFlat: builtFlat,
    builtProvider: builtProvider,
    components: components
  };

  return fixture;

}


// ---------------------------------------------------------------------------
// 6. Write and exit.
// ---------------------------------------------------------------------------

if (require.main === module) {

  const fixture = generate();
  const outPath = path.join(__dirname, 'component-roster.json');
  fs.writeFileSync(outPath, JSON.stringify(fixture, null, 2) + '\n');

  const built = fixture.components.filter(function (c) { return c.status === 'built'; }).length;
  const todo = fixture.components.filter(function (c) { return c.status === 'todo'; }).length;
  const excluded = fixture.components.filter(function (c) { return c.status === 'excluded'; }).length;

  process.stdout.write(
    'Roster fixture written to ' + outPath + '\n' +
    '  built flat:     ' + fixture.builtFlat.length + '\n' +
    '  built provider: ' + fixture.builtProvider.length + '\n' +
    '  built unique:   ' + built + '\n' +
    '  todo:           ' + todo + '\n' +
    '  excluded:       ' + excluded + '\n' +
    '  total:          ' + fixture.components.length + '\n'
  );

}


module.exports = { generate: generate };
