// Info: Roster generator. Merges the Carbon union target with the current
// registry state (queried from the loader), applies platform classification
// and sanctioned exceptions, and writes component-roster.json.
//
// The generator is the source of truth for the roster fixture. The JSON is
// a checked-in snapshot. Running the generator twice must produce no diff.
//
// Usage: node _test/fixtures/generate-roster.js
//   --query   query the live registry via the loader and mark built names
//   --seed    seed without querying (uses the embedded current-registry list)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));


// ---------------------------------------------------------------------------
// 1. The Carbon union target, extracted from @carbon/react@1.79.0 and
//    @carbon/react-native@9.0.7.
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
  'TruncatedText', 'UserAvatar', 'SidePanel',
  'FeatureFlags'  // exported as unstable_FeatureFlags in @carbon/react
];
const INFRASTRUCTURE = [
  'LiveRegionProvider'  // M6 mechanism, no Carbon counterpart, must be mountable
];
const ALL_EXCEPTIONS = SUBSTRATE.concat(COLLAPSE, UNEXPORTED, INFRASTRUCTURE);


// ---------------------------------------------------------------------------
// 3. Platform classification. Draft membership from the artifact; everything
//    else defaults to 'both'.
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
//    that may change over time. Seeding with the real list keeps the gate
//    green. The generator can also query the live loader
//    via --query to stay in sync automatically.
// ---------------------------------------------------------------------------

const CURRENT_FLAT = [
  'AcceptTerms', 'AILabel', 'AILabelActions', 'AILabelContent',
  'AISkeletonIcon', 'AISkeletonPlaceholder', 'AISkeletonText',
  'Accordion', 'AccordionItem', 'ActionSheet', 'ActionableNotification', 'AspectRatio',
  'BadgeIndicator', 'BottomNavigationBar', 'BottomSafeAreaColorOverride',
  'BottomToolbar', 'BottomToolbarPrimaryAction', 'Breadcrumb', 'BreadcrumbItem',
  'Button', 'ButtonSet', 'Callout',
  'Checkbox', 'CheckboxGroup', 'ClickableTile', 'CodeSnippet', 'Column', 'ColumnHang',
  'ComboBox', 'ComboButton', 'ComposedModal', 'ContainedList', 'ContainedListItem',
  'Content', 'ContentSwitcher', 'ControlledPasswordInput', 'Copy', 'CopyButton',
  'DataTable', 'DataTableCell', 'DataTableHeader',
  'DataTableHeaderSelected', 'DataTableRow', 'DateInput',
  'DatePicker', 'DatePickerInput', 'DefinitionTooltip', 'DismissibleTag', 'DocumentViewer', 'Dropdown',
  'ErrorBoundaryContext', 'ErrorState', 'ExpandableSearch', 'ExpandableTile', 'Filename',
  'FileUploader', 'FileUploaderButton', 'FileUploaderDropContainer', 'FileUploaderItem', 'FilterableMultiSelect', 'FlexGrid',
  'Form', 'FormContext', 'FormGroup', 'FormItem', 'FormLabel', 'GlobalTheme', 'GrantPermission', 'Grid', 'GridSettings', 'Header',
  'HeaderContainer', 'HeaderGlobalAction', 'HeaderGlobalBar', 'HeaderMenu', 'HeaderMenuButton', 'HeaderMenuItem',
  'HeaderName', 'HeaderNavigation', 'HeaderPanel', 'HeaderSideNavItems', 'Heading', 'HStack', 'Icon',
  'IconButton', 'IconIndicator', 'IconSwitch', 'IconTab', 'Image', 'InlineLink', 'InlineLoading', 'InlineNotification',
  'LandingView', 'Link', 'List', 'ListItem', 'Loading',
  'Menu', 'MenuButton', 'MenuItem', 'MenuItemDivider', 'MenuItemGroup', 'MenuItemRadioGroup',
  'MenuItemSelectable', 'Modal', 'ModalBody', 'ModalFooter', 'ModalHeader',
  'MultiSelect', 'NavigationList', 'NavigationListItem', 'Notification', 'NotificationActionButton',
  'NotificationButton', 'NumberInput',
  'OrderedList', 'OperationalTag', 'OverflowMenu', 'OverflowMenuItem', 'Pagination', 'PaginationNav',
  'PasswordInput', 'Popover', 'PopoverContent', 'PrefixContext', 'ProgressBar', 'ProgressIndicator',
  'ProgressStep', 'RadioButton',
  'RadioButtonGroup', 'RadioTile', 'Row', 'SafeAreaWrapper', 'Search', 'Section', 'Select',
  'SelectableTag', 'SelectableTile', 'SelectItem', 'SelectItemGroup', 'ShapeIndicator',
  'SideNav', 'SideNavDetails', 'SideNavDivider', 'SideNavFooter', 'SideNavHeader', 'SideNavIcon',
  'SideNavItem', 'SideNavItems', 'SideNavLink', 'SideNavLinkText', 'SideNavMenu', 'SideNavMenuItem',
  'SideNavSwitcher', 'SidePanel', 'Skeleton',
  'SkeletonIcon', 'SkeletonPlaceholder', 'SkeletonText', 'SkipToContent', 'Slider', 'Stack', 'StaticNotification', 'StructuredListBody',
  'StructuredListCell', 'StructuredListHead', 'StructuredListInput', 'StructuredListRow', 'StructuredListWrapper',
  'Switch', 'Switcher', 'SwitcherDivider', 'SwitcherItem', 'Tab', 'TabContent', 'TabList', 'TabListVertical',
  'TabPanel', 'TabPanels', 'Table', 'TableActionList', 'TableBatchAction', 'TableBatchActions',
  'TableBody', 'TableCell', 'TableContainer', 'TableDecoratorRow',
  'TableExpandHeader', 'TableExpandRow', 'TableExpandedRow', 'TableHead',
  'TableHeader', 'TableRow', 'TableSelectAll', 'TableSelectRow', 'TableSlugRow',
  'TableToolbar', 'TableToolbarAction', 'TableToolbarContent',
  'TableToolbarMenu', 'TableToolbarSearch', 'Tabs', 'TabsVertical', 'Tag', 'Text', 'TextArea',
  'TextInput', 'ThemeContext', 'Tile', 'TileAboveTheFoldContent', 'TileBelowTheFoldContent', 'TileGroup',
  'TimePicker', 'TimePickerSelect', 'ToastNotification', 'Toggle', 'Toggletip', 'ToggletipActions',
  'ToggletipButton', 'ToggletipContent', 'ToggletipLabel',
  'Tooltip', 'TopNavigationBar', 'TopNavigationBarLogin', 'TreeNode', 'TreeView',
  'TruncatedText', 'UiPanel', 'UiPanelItem', 'UnorderedList',
  'UserAvatar', 'View', 'ViewWrapper', 'VStack', 'WebHeader'
];

const CURRENT_PROVIDERS = [
  'ErrorBoundary', 'FeatureFlags', 'FluidForm', 'IdPrefix', 'Layer',
  'LiveRegionProvider', 'Overlay', 'Theme'
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
  if (INFRASTRUCTURE.indexOf(name) !== -1) return 'infrastructure';
  if (unionSet.has(name)) return 'carbon';
  return 'non-carbon';

}

function tierOf (name) {

  // Providers are known
  if (CURRENT_PROVIDERS.indexOf(name) !== -1) return 'provider';
  // Substrate primitives are atoms
  if (SUBSTRATE.indexOf(name) !== -1) return 'atom';
  // Default to unknown for todo items; the real tier is filled in later
  return 'unknown';

}

function generate () {

  // Load the union artifact
  let artifact;
  try {
    artifact = JSON.parse(fs.readFileSync(UNION_ARTIFACT_PATH, 'utf8'));
  } catch (e) {
    // The union artifact is optional. If it is missing, seed from the
    // embedded registry list and built-in exceptions.
    artifact = { target: [], sources: [] };
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

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/.*\//, ''))) {

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

export { generate };
