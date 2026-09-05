// Generates carbon-fidelity.json from the local roster and pinned upstream exports.
// Reference: @carbon/react v11.115.0 (web), @carbon/react-native v9.0.7 (native).
// Run: node _test/fixtures/generate-fidelity.js

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..', '..');

// --- Local exports ---
const roster = JSON.parse(readFileSync(join(__dirname, 'component-roster.json'), 'utf8'));
const flat = roster.builtFlat;
const providers = roster.builtProvider;
const variant = ['buttonPrimaryOutlined'];
const freeform = ['rawBox'];

// --- Upstream web component exports (@carbon/react v11.115.0) ---
// Extracted from packages/react/src/index.ts at tag v11.115.0.
// Each entry is the top-level component name; sub-components are listed under their parent.
// Includes named exports (export { X } from) and sub-components exported via export *.
const upstreamWeb = {
  // Direct export * entries (component directory names)
  Accordion: ['Accordion', 'AccordionItem', 'AccordionItemButton', 'AccordionItemHeading', 'AccordionItemPanel', 'AccordionItemTitle'],
  AspectRatio: ['AspectRatio'],
  Breadcrumb: ['Breadcrumb', 'BreadcrumbItem'],
  Button: ['Button', 'DangerButton', 'PrimaryButton', 'SecondaryButton', 'IconButton'],
  ButtonSet: ['ButtonSet'],
  Checkbox: ['Checkbox', 'InlineCheckbox'],
  CheckboxGroup: ['CheckboxGroup'],
  ClassPrefix: ['ClassPrefix'],
  CodeSnippet: ['CodeSnippet'],
  ComboBox: ['ComboBox'],
  ComboButton: ['ComboButton'],
  ComposedModal: ['ComposedModal', 'ModalHeader', 'ModalBody', 'ModalFooter'],
  ContainedList: ['ContainedList', 'ContainedListItem'],
  ContentSwitcher: ['ContentSwitcher', 'Switch'],
  ContextMenu: ['ContextMenu'],
  Copy: ['Copy'],
  CopyButton: ['CopyButton'],
  DataTable: ['DataTable', 'Table', 'TableBody', 'TableCell', 'TableContainer', 'TableContext', 'TableHead', 'TableHeader', 'TableRow', 'TableSelectAll', 'TableSelectRow', 'TableToolbar', 'TableToolbarAction', 'TableToolbarContent', 'TableToolbarMenu', 'TableToolbarSearch', 'TableBatchAction', 'TableBatchActions', 'TableActionButton', 'DataTableCell', 'DataTableHeader', 'DataTableRow', 'DataTableHeaderSelected'],
  DataTableSkeleton: ['DataTableSkeleton'],
  DatePicker: ['DatePicker', 'DatePickerInput'],
  Dropdown: ['Dropdown'],
  ErrorBoundary: ['ErrorBoundary'],
  ExpandableSearch: ['ExpandableSearch'],
  FileUploader: ['FileUploader', 'FileUploaderButton', 'FileUploaderDropContainer', 'FileUploaderItem', 'Filename'],
  FluidForm: ['FluidForm'],
  Form: ['Form'],
  FormGroup: ['FormGroup'],
  FormItem: ['FormItem'],
  FormLabel: ['FormLabel'],
  Grid: ['Grid', 'Row', 'Column', 'FlexGrid', 'Stack'],
  Heading: ['Heading'],
  Icon: ['Icon', 'IconSkeleton'],
  IdPrefix: ['IdPrefix'],
  InlineLoading: ['InlineLoading'],
  Layer: ['Layer'],
  Link: ['Link'],
  ListItem: ['ListItem'],
  Loading: ['Loading'],
  Menu: ['Menu', 'MenuButton', 'MenuItem', 'MenuItemDivider', 'MenuItemGroup', 'MenuItemRadioGroup', 'MenuItemSelectable'],
  Modal: ['Modal'],
  ModalWrapper: ['ModalWrapper'],
  MultiSelect: ['MultiSelect', 'FilterableMultiSelect'],
  Notification: ['Notification', 'NotificationActionButton', 'NotificationButton', 'ToastNotification', 'InlineNotification', 'ActionableNotification', 'StaticNotification', 'Callout'],
  NumberInput: ['NumberInput'],
  OrderedList: ['OrderedList'],
  OverflowMenu: ['OverflowMenu', 'OverflowMenuItem'],
  Pagination: ['Pagination'],
  PaginationNav: ['PaginationNav'],
  PasswordInput: ['PasswordInput'],
  Popover: ['Popover', 'PopoverContent'],
  ProgressBar: ['ProgressBar'],
  ProgressIndicator: ['ProgressIndicator', 'ProgressStep'],
  RadioButton: ['RadioButton'],
  RadioButtonGroup: ['RadioButtonGroup'],
  RadioTile: ['RadioTile', 'TileGroup'],
  Search: ['Search'],
  Select: ['Select', 'SelectItem', 'SelectItemGroup'],
  SkeletonIcon: ['SkeletonIcon'],
  SkeletonPlaceholder: ['SkeletonPlaceholder'],
  SkeletonText: ['SkeletonText'],
  Slider: ['Slider'],
  StructuredList: ['StructuredList', 'StructuredListWrapper', 'StructuredListHead', 'StructuredListBody', 'StructuredListRow', 'StructuredListCell', 'StructuredListInput'],
  Switch: ['Switch'],
  Tab: ['Tab', 'Tabs', 'TabList', 'TabPanels', 'TabContent', 'TabPanel', 'TabListVertical', 'TabsVertical'],
  Tag: ['Tag', 'DismissibleTag', 'OperationalTag', 'SelectableTag'],
  TextArea: ['TextArea'],
  TextInput: ['TextInput', 'TextInput.PasswordInput', 'TextInput.ControlledPasswordInput', 'ControlledPasswordInput'],
  Theme: ['Theme'],
  Tile: ['Tile', 'ClickableTile', 'ExpandableTile', 'SelectableTile', 'TileAboveTheFoldContent', 'TileBelowTheFoldContent'],
  TimePicker: ['TimePicker', 'TimePickerSelect'],
  Toggle: ['Toggle', 'ToggleSmall'],
  Toggletip: ['Toggletip', 'ToggletipButton', 'ToggletipContent', 'ToggletipActions', 'ToggletipLabel'],
  Tooltip: ['Tooltip', 'DefinitionTooltip'],
  TreeView: ['TreeView', 'TreeNode'],
  UIShell: ['Header', 'HeaderContainer', 'HeaderGlobalAction', 'HeaderGlobalBar', 'HeaderMenu', 'HeaderMenuButton', 'HeaderMenuItem', 'HeaderName', 'HeaderNavigation', 'HeaderPanel', 'HeaderSideNavItems', 'SideNav', 'SideNavDetails', 'SideNavDivider', 'SideNavFooter', 'SideNavHeader', 'SideNavIcon', 'SideNavItem', 'SideNavItems', 'SideNavLink', 'SideNavLinkText', 'SideNavMenu', 'SideNavMenuItem', 'SideNavSwitcher', 'SkipToContent', 'Switcher', 'SwitcherItem', 'SwitcherDivider', 'HeaderContainer'],
  UnorderedList: ['UnorderedList'],
  // Named exports (export { X } from './components/...')
  AILabel: ['AILabel', 'AILabelContent', 'AILabelActions'],
  AISkeleton: ['AISkeletonIcon', 'AISkeletonPlaceholder', 'AISkeletonText', 'ChatButtonSkeleton'],
  // SidePanel is commented out in the v11.115.0 index.ts: // export { SidePanel } from './components/SidePanel';
  // It exists in the source but is not exported. Classified as structured-extension with a note.
};

// Flatten web exports into a Set
const webSet = new Set();
for (const subs of Object.values(upstreamWeb)) {
  for (const name of subs) {
    webSet.add(name);
  }
}

// --- Upstream native component exports (@carbon/react-native v9.0.7) ---
// Extracted from src/index.tsx at tag v9.0.7.
const upstreamNative = [
  'Button', 'Text', 'WebHeader', 'LandingView', 'Link', 'InlineLink',
  'TextInput', 'TextArea', 'PasswordInput', 'Checkbox', 'RadioButton',
  'Toggle', 'Loading', 'FileUploaderItem', 'NumberInput', 'Menu', 'MenuItem',
  'BottomNavigationBar', 'TopNavigationBar', 'TopNavigationBarLogin',
  'NavigationListItem', 'NavigationList', 'BottomToolbar', 'ErrorState',
  'DocumentViewer', 'AcceptTerms', 'ViewWrapper', 'GrantPermission',
  'BottomToolbarPrimaryAction', 'Search', 'Tile', 'Dropdown', 'ActionSheet',
  'Modal', 'Accordion', 'Tag', 'Notification', 'ContentSwitcher', 'Tabs',
  'ProgressIndicator', 'List', 'Overlay', 'Pagination', 'DataTable',
  'UiPanel', 'UiPanelItem', 'Tooltip', 'DateInput', 'Slider', 'FormItem',
  'SafeAreaWrapper',
];

// Native sub-components (inferred from source structure)
const nativeSubs = {
  Accordion: ['AccordionItem'],
  Tabs: ['Tab', 'TabList', 'TabPanel', 'TabPanels', 'TabContent'],
  Tag: ['OperationalTag'],
  Notification: ['NotificationActionButton', 'NotificationButton', 'ToastNotification', 'InlineNotification', 'ActionableNotification'],
  Menu: ['MenuButton', 'MenuItemDivider', 'MenuItemGroup', 'MenuItemRadioGroup', 'MenuItemSelectable'],
  DataTable: ['TableBody', 'TableCell', 'TableContainer', 'TableHead', 'TableHeader', 'TableRow', 'TableSelectAll', 'TableSelectRow', 'TableToolbar', 'TableToolbarAction', 'TableToolbarContent', 'TableToolbarMenu', 'TableToolbarSearch', 'TableBatchAction', 'TableBatchActions', 'TableActionList', 'TableExpandHeader', 'TableExpandRow', 'TableExpandedRow', 'TableDecoratorRow', 'TableSlugRow'],
  Modal: ['ModalBody', 'ModalFooter', 'ModalHeader'],
  List: ['ListItem'],
  Pagination: ['PaginationNav'],
  Tile: ['ClickableTile', 'ExpandableTile', 'SelectableTile', 'TileAboveTheFoldContent', 'TileBelowTheFoldContent', 'TileGroup'],
  Search: ['ExpandableSearch'],
  ProgressIndicator: ['ProgressStep'],
  ContentSwitcher: ['Switch'],
  Tooltip: ['DefinitionTooltip', 'Toggletip', 'ToggletipButton', 'ToggletipContent', 'ToggletipActions', 'ToggletipLabel'],
  TopNavigationBar: ['Header', 'HeaderContainer', 'HeaderGlobalAction', 'HeaderGlobalBar', 'HeaderMenu', 'HeaderMenuButton', 'HeaderMenuItem', 'HeaderName', 'HeaderNavigation', 'HeaderPanel', 'HeaderSideNavItems', 'WebHeader'],
  SafeAreaWrapper: ['BottomSafeAreaColorOverride'],
  Slider: ['Slider'],
};

const nativeSet = new Set(upstreamNative);
for (const subs of Object.values(nativeSubs)) {
  for (const name of subs) {
    nativeSet.add(name);
  }
}

// --- Substrate / infrastructure components (no direct upstream counterpart) ---
const substrate = new Set([
  'ErrorBoundary', 'ErrorBoundaryContext', 'FeatureFlags', 'FluidForm',
  'FormContext', 'GlobalTheme', 'IdPrefix', 'Layer', 'LiveRegionProvider',
  'Overlay', 'PrefixContext', 'Theme', 'ThemeContext', 'View', 'ViewWrapper',
  'Content', 'Section', 'Form', 'FlexGrid', 'Grid', 'Row', 'Column', 'ColumnHang',
  'HStack', 'VStack', 'Stack', 'SafeAreaWrapper', 'BottomSafeAreaColorOverride',
  'AspectRatio', 'Icon', 'IconIndicator', 'IconSwitch', 'IconTab',
  'ShapeIndicator', 'BadgeIndicator', 'UserAvatar', 'Image', 'Copy',
  'TruncatedText', 'CopyButton', 'InlineLink',
]);

// --- Local source type mapping ---
function getSourceType(name) {
  if (providers.includes(name)) return 'provider';
  if (variant.includes(name)) return 'variant';
  if (freeform.includes(name)) return 'freeform';

  // Check atom, molecule, composite directories
  const dirs = ['atom', 'molecule', 'composite'];
  for (const dir of dirs) {
    const path = join(repoRoot, 'component', dir, name.charAt(0).toLowerCase() + name.slice(1) + '.js');
    if (existsSync(path)) return dir;
  }
  return 'unknown';
}

function getSourcePath(name) {
  const type = getSourceType(name);
  if (type === 'provider' || type === 'variant' || type === 'freeform') {
    return `component/${type}/${name.charAt(0).toLowerCase() + name.slice(1)}.js`;
  }
  return `component/${type}/${name.charAt(0).toLowerCase() + name.slice(1)}.js`;
}

// --- Classify each export ---
function classify(name) {
  const inWeb = webSet.has(name);
  const inNative = nativeSet.has(name);
  const isSubstrate = substrate.has(name);
  const isFreeform = freeform.includes(name);
  const isVariant = variant.includes(name);

  if (isFreeform) return 'freeform';
  if (isVariant) return 'structured-extension';
  if (inWeb && inNative) return 'both-with-explicit-platform-mapping';
  if (inWeb) return 'upstream-web';
  if (inNative) return 'upstream-native';
  if (isSubstrate) return 'substrate';

  // Check if it's a sub-component of an upstream component
  // These are structured extensions or sub-components
  return 'structured-extension';
}

// --- Build the fidelity rows ---
const all = [...flat, ...providers, ...variant, ...freeform];
const rows = [];
const seen = new Set();

for (const name of all) {
  if (seen.has(name)) {
    throw new Error('Duplicate namespace: ' + name);
  }
  seen.add(name);

  const sourceType = getSourceType(name);
  const inWeb = webSet.has(name);
  const inNative = nativeSet.has(name);
  const classification = classify(name);

  rows.push({
    name,
    sourceType,
    sourcePath: getSourcePath(name),
    upstreamWeb: inWeb,
    upstreamNative: inNative,
    classification,
    status: 'pending',
    notes: name === 'SidePanel' ? 'upstream-web source exists but export is commented out in v11.115.0 index.ts' : '',
  });
}

// --- Verify counts ---
const counts = {
  total: rows.length,
  flat: flat.length,
  provider: providers.length,
  variant: variant.length,
  freeform: freeform.length,
  upstreamWeb: rows.filter(r => r.upstreamWeb).length,
  upstreamNative: rows.filter(r => r.upstreamNative).length,
  both: rows.filter(r => r.upstreamWeb && r.upstreamNative).length,
  substrate: rows.filter(r => r.classification === 'substrate').length,
  structuredExtension: rows.filter(r => r.classification === 'structured-extension').length,
  freeform: rows.filter(r => r.classification === 'freeform').length,
  upstreamWebOnly: rows.filter(r => r.upstreamWeb && !r.upstreamNative).length,
  upstreamNativeOnly: rows.filter(r => !r.upstreamWeb && r.upstreamNative).length,
};

// --- Verify no unassigned or unknown ---
const unassigned = rows.filter(r => r.classification === 'unknown');
const unknown = rows.filter(r => r.sourceType === 'unknown');

// --- Write the fixture ---
const fixture = {
  generated: new Date().toISOString().slice(0, 10),
  references: {
    web: '@carbon/react v11.115.0 (commit 7518c84ffd00f22434fe19d83119692c12fccb2f)',
    native: '@carbon/react-native v9.0.7 (commit 047e8695533db64c3fdb88c649a045030cefcb0e)',
  },
  counts,
  rows,
};

writeFileSync(join(__dirname, 'carbon-fidelity.json'), JSON.stringify(fixture, null, 2) + '\n');

// --- Report ---
console.log('Generated carbon-fidelity.json');
console.log('Total rows:', counts.total);
console.log('  flat:', counts.flat);
console.log('  provider:', counts.provider);
console.log('  variant:', counts.variant);
console.log('  freeform:', counts.freeform);
console.log('Classification:');
console.log('  upstream-web only:', counts.upstreamWebOnly);
console.log('  upstream-native only:', counts.upstreamNativeOnly);
console.log('  both:', counts.both);
console.log('  substrate:', counts.substrate);
console.log('  structured-extension:', counts.structuredExtension);
console.log('  freeform:', counts.freeform);
console.log('Unassigned:', unassigned.length);
console.log('Unknown source:', unknown.length);
if (unassigned.length > 0) {
  console.log('Unassigned names:', unassigned.map(r => r.name).join(', '));
}
if (unknown.length > 0) {
  console.log('Unknown source names:', unknown.map(r => r.name).join(', '));
}
