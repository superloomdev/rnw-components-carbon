# rnw-components-carbon

Carbon-informed component library for the RNW pipeline. Atoms, molecules, composites, and providers over the themer, with theme-driven responsiveness and a real accessibility contract.

## Overview

This module provides a themed component registry for React Native Web applications. It consumes a theme contract (`{ Color, Dimension, Font, Breakpoint }`) and produces a set of atoms, molecules, variants, and freeform components that all drive their visuals from tokens. Re-theming at runtime calls `rebuild` with a new theme and returns a fresh registry.

## Installation

```bash
npm install @superloomdev/rnw-components-carbon
```

Peer dependencies: `react`, `react-native`, `helper-utils`, `helper-debug`, `helper-themer`, `helper-device`.

## Quick Start

```javascript
import loader from '@superloomdev/rnw-components-carbon';

const Components = loader({
  Utils: Utils,
  Debug: Debug,
  React: React,
  Device: Device,
  Icons: Icons
});

// Bridge themer output to the theme contract
const theme = Components.themeContract(themer.buildTheme(template, layers, 'native'));

// Build the themed registry
const { Component, Style } = Components.build(theme, 'base');

// Use components
const MyScreen = function () {
  return React.createElement(Component.View, { background: 'surface', p_a_lg: true },
    React.createElement(Component.Text, { size: 'xl', weight: 'bold' }, 'Hello'),
    React.createElement(Component.Button, {
      kind: 'primary',
      onPress: function () { /* ... */ }
    }, React.createElement(Component.Text, { color: 'text_on_primary' }, 'Submit'))
  );
};
```

## Component Roster

<!-- BEGIN GENERATED: count-summary -->
- **Total components:** 243
- **Both web and native:** 229 (94%)
- **Split (platform-specific):** 9
- **Web primary:** 1
- **Native primary:** 4
- **Excluded (cannot exist in RN):** 1
- **Providers:** 8
- **Flat components:** 235
<!-- END GENERATED: count-summary -->

<!-- BEGIN GENERATED: component-table -->
| Component | Tier | Platform | Source |
|---|---|---|---|
| `AILabel` | unknown | Both web and native | carbon |
| `AILabelActions` | unknown | Both web and native | carbon |
| `AILabelContent` | unknown | Both web and native | carbon |
| `AISkeletonIcon` | unknown | Both web and native | carbon |
| `AISkeletonPlaceholder` | unknown | Both web and native | carbon |
| `AISkeletonText` | unknown | Both web and native | carbon |
| `AcceptTerms` | unknown | Both web and native | carbon |
| `Accordion` | unknown | Both web and native | carbon |
| `AccordionItem` | unknown | Both web and native | carbon |
| `ActionSheet` | unknown | Split (web and native differ) | carbon |
| `ActionableNotification` | unknown | Both web and native | carbon |
| `AspectRatio` | unknown | Both web and native | carbon |
| `BadgeIndicator` | unknown | Both web and native | unexported |
| `BottomNavigationBar` | unknown | Both web and native | carbon |
| `BottomSafeAreaColorOverride` | unknown | Native primary (degrades on web) | carbon |
| `BottomToolbar` | unknown | Both web and native | carbon |
| `BottomToolbarPrimaryAction` | unknown | Both web and native | carbon |
| `Breadcrumb` | unknown | Both web and native | carbon |
| `BreadcrumbItem` | unknown | Both web and native | carbon |
| `Button` | unknown | Both web and native | carbon |
| `ButtonSet` | unknown | Both web and native | carbon |
| `Callout` | unknown | Both web and native | carbon |
| `Checkbox` | unknown | Both web and native | carbon |
| `CheckboxGroup` | unknown | Both web and native | carbon |
| `ClickableTile` | unknown | Both web and native | carbon |
| `CodeSnippet` | unknown | Split (web and native differ) | carbon |
| `Column` | unknown | Both web and native | carbon |
| `ColumnHang` | unknown | Both web and native | carbon |
| `ComboBox` | unknown | Both web and native | carbon |
| `ComboButton` | unknown | Both web and native | carbon |
| `ComposedModal` | unknown | Both web and native | carbon |
| `ContainedList` | unknown | Both web and native | carbon |
| `ContainedListItem` | unknown | Both web and native | carbon |
| `Content` | unknown | Both web and native | carbon |
| `ContentSwitcher` | unknown | Both web and native | carbon |
| `ControlledPasswordInput` | unknown | Both web and native | carbon |
| `Copy` | unknown | Both web and native | carbon |
| `CopyButton` | unknown | Split (web and native differ) | carbon |
| `DataTable` | unknown | Both web and native | carbon |
| `DataTableCell` | unknown | Both web and native | carbon |
| `DataTableHeader` | unknown | Both web and native | carbon |
| `DataTableHeaderSelected` | unknown | Both web and native | carbon |
| `DataTableRow` | unknown | Both web and native | carbon |
| `DateInput` | unknown | Both web and native | carbon |
| `DatePicker` | unknown | Both web and native | carbon |
| `DatePickerInput` | unknown | Both web and native | carbon |
| `DefinitionTooltip` | unknown | Both web and native | carbon |
| `DismissibleTag` | unknown | Both web and native | carbon |
| `DocumentViewer` | unknown | Split (web and native differ) | carbon |
| `Dropdown` | unknown | Both web and native | carbon |
| `ErrorBoundary` | provider | Both web and native | carbon |
| `ErrorBoundaryContext` | unknown | Both web and native | carbon |
| `ErrorState` | unknown | Both web and native | carbon |
| `ExpandableSearch` | unknown | Both web and native | carbon |
| `ExpandableTile` | unknown | Both web and native | carbon |
| `FeatureFlags` | provider | Both web and native | unexported |
| `FileUploader` | unknown | Split (web and native differ) | carbon |
| `FileUploaderButton` | unknown | Split (web and native differ) | carbon |
| `FileUploaderDropContainer` | unknown | Split (web and native differ) | carbon |
| `FileUploaderItem` | unknown | Split (web and native differ) | carbon |
| `Filename` | unknown | Both web and native | carbon |
| `FilterableMultiSelect` | unknown | Both web and native | carbon |
| `FlexGrid` | unknown | Both web and native | carbon |
| `FluidForm` | provider | Both web and native | non-carbon |
| `Form` | unknown | Both web and native | carbon |
| `FormContext` | unknown | Both web and native | carbon |
| `FormGroup` | unknown | Both web and native | carbon |
| `FormItem` | unknown | Both web and native | carbon |
| `FormLabel` | unknown | Both web and native | carbon |
| `GlobalTheme` | unknown | Both web and native | carbon |
| `GrantPermission` | unknown | Native primary (degrades on web) | carbon |
| `Grid` | unknown | Both web and native | carbon |
| `GridSettings` | unknown | Both web and native | carbon |
| `HStack` | unknown | Both web and native | carbon |
| `Header` | unknown | Both web and native | carbon |
| `HeaderContainer` | unknown | Both web and native | carbon |
| `HeaderGlobalAction` | unknown | Both web and native | carbon |
| `HeaderGlobalBar` | unknown | Both web and native | carbon |
| `HeaderMenu` | unknown | Both web and native | carbon |
| `HeaderMenuButton` | unknown | Both web and native | carbon |
| `HeaderMenuItem` | unknown | Both web and native | carbon |
| `HeaderName` | unknown | Both web and native | carbon |
| `HeaderNavigation` | unknown | Both web and native | carbon |
| `HeaderPanel` | unknown | Both web and native | carbon |
| `HeaderSideNavItems` | unknown | Both web and native | carbon |
| `Heading` | unknown | Both web and native | carbon |
| `Icon` | atom | Both web and native | substrate |
| `IconButton` | unknown | Both web and native | carbon |
| `IconIndicator` | unknown | Both web and native | unexported |
| `IconSwitch` | unknown | Both web and native | carbon |
| `IconTab` | unknown | Both web and native | carbon |
| `IdPrefix` | provider | Both web and native | carbon |
| `Image` | atom | Both web and native | substrate |
| `InlineLink` | unknown | Both web and native | carbon |
| `InlineLoading` | unknown | Both web and native | carbon |
| `InlineNotification` | unknown | Both web and native | carbon |
| `LandingView` | unknown | Both web and native | carbon |
| `Layer` | provider | Both web and native | carbon |
| `Link` | unknown | Both web and native | carbon |
| `List` | unknown | Both web and native | carbon |
| `ListItem` | unknown | Both web and native | carbon |
| `LiveRegionProvider` | provider | Both web and native | infrastructure |
| `Loading` | unknown | Both web and native | carbon |
| `Menu` | unknown | Both web and native | carbon |
| `MenuButton` | unknown | Both web and native | carbon |
| `MenuItem` | unknown | Both web and native | carbon |
| `MenuItemDivider` | unknown | Both web and native | carbon |
| `MenuItemGroup` | unknown | Both web and native | carbon |
| `MenuItemRadioGroup` | unknown | Both web and native | carbon |
| `MenuItemSelectable` | unknown | Both web and native | carbon |
| `Modal` | unknown | Both web and native | carbon |
| `ModalBody` | unknown | Both web and native | carbon |
| `ModalFooter` | unknown | Both web and native | carbon |
| `ModalHeader` | unknown | Both web and native | carbon |
| `MultiSelect` | unknown | Both web and native | carbon |
| `NavigationList` | unknown | Both web and native | carbon |
| `NavigationListItem` | unknown | Both web and native | carbon |
| `Notification` | unknown | Both web and native | carbon |
| `NotificationActionButton` | unknown | Both web and native | carbon |
| `NotificationButton` | unknown | Both web and native | carbon |
| `NumberInput` | unknown | Both web and native | carbon |
| `OperationalTag` | unknown | Both web and native | carbon |
| `OrderedList` | unknown | Both web and native | carbon |
| `OverflowMenu` | unknown | Both web and native | carbon |
| `OverflowMenuItem` | unknown | Both web and native | carbon |
| `Overlay` | provider | Split (web and native differ) | carbon |
| `Pagination` | unknown | Both web and native | carbon |
| `PaginationNav` | unknown | Both web and native | carbon |
| `PasswordInput` | unknown | Both web and native | carbon |
| `Popover` | unknown | Both web and native | carbon |
| `PopoverContent` | unknown | Both web and native | carbon |
| `PrefixContext` | unknown | Both web and native | carbon |
| `ProgressBar` | unknown | Both web and native | carbon |
| `ProgressIndicator` | unknown | Both web and native | carbon |
| `ProgressStep` | unknown | Both web and native | carbon |
| `RadioButton` | unknown | Both web and native | carbon |
| `RadioButtonGroup` | unknown | Both web and native | carbon |
| `RadioTile` | unknown | Both web and native | carbon |
| `Row` | unknown | Both web and native | carbon |
| `SafeAreaWrapper` | unknown | Native primary (degrades on web) | carbon |
| `Search` | unknown | Both web and native | carbon |
| `Section` | unknown | Both web and native | carbon |
| `Select` | unknown | Both web and native | carbon |
| `SelectItem` | unknown | Both web and native | carbon |
| `SelectItemGroup` | unknown | Both web and native | carbon |
| `SelectableTag` | unknown | Both web and native | carbon |
| `SelectableTile` | unknown | Both web and native | carbon |
| `ShapeIndicator` | unknown | Both web and native | unexported |
| `SideNav` | unknown | Both web and native | carbon |
| `SideNavDetails` | unknown | Both web and native | carbon |
| `SideNavDivider` | unknown | Both web and native | carbon |
| `SideNavFooter` | unknown | Both web and native | carbon |
| `SideNavHeader` | unknown | Both web and native | carbon |
| `SideNavIcon` | unknown | Both web and native | carbon |
| `SideNavItem` | unknown | Both web and native | carbon |
| `SideNavItems` | unknown | Both web and native | carbon |
| `SideNavLink` | unknown | Both web and native | carbon |
| `SideNavLinkText` | unknown | Both web and native | carbon |
| `SideNavMenu` | unknown | Both web and native | carbon |
| `SideNavMenuItem` | unknown | Both web and native | carbon |
| `SideNavSwitcher` | unknown | Both web and native | carbon |
| `SidePanel` | unknown | Both web and native | unexported |
| `Skeleton` | unknown | Both web and native | collapse |
| `SkeletonIcon` | unknown | Both web and native | carbon |
| `SkeletonPlaceholder` | unknown | Both web and native | carbon |
| `SkeletonText` | unknown | Both web and native | carbon |
| `SkipToContent` | unknown | Web primary (null on native) | carbon |
| `Slider` | unknown | Both web and native | carbon |
| `Stack` | unknown | Both web and native | carbon |
| `StaticNotification` | unknown | Both web and native | carbon |
| `StructuredListBody` | unknown | Both web and native | carbon |
| `StructuredListCell` | unknown | Both web and native | carbon |
| `StructuredListHead` | unknown | Both web and native | carbon |
| `StructuredListInput` | unknown | Both web and native | carbon |
| `StructuredListRow` | unknown | Both web and native | carbon |
| `StructuredListWrapper` | unknown | Both web and native | carbon |
| `Switch` | unknown | Both web and native | carbon |
| `Switcher` | unknown | Both web and native | carbon |
| `SwitcherDivider` | unknown | Both web and native | carbon |
| `SwitcherItem` | unknown | Both web and native | carbon |
| `Tab` | unknown | Both web and native | carbon |
| `TabContent` | unknown | Both web and native | carbon |
| `TabList` | unknown | Both web and native | carbon |
| `TabListVertical` | unknown | Both web and native | carbon |
| `TabPanel` | unknown | Both web and native | carbon |
| `TabPanels` | unknown | Both web and native | carbon |
| `Table` | unknown | Both web and native | carbon |
| `TableActionList` | unknown | Both web and native | carbon |
| `TableBatchAction` | unknown | Both web and native | carbon |
| `TableBatchActions` | unknown | Both web and native | carbon |
| `TableBody` | unknown | Both web and native | carbon |
| `TableCell` | unknown | Both web and native | carbon |
| `TableContainer` | unknown | Both web and native | carbon |
| `TableDecoratorRow` | unknown | Both web and native | carbon |
| `TableExpandHeader` | unknown | Both web and native | carbon |
| `TableExpandRow` | unknown | Both web and native | carbon |
| `TableExpandedRow` | unknown | Both web and native | carbon |
| `TableHead` | unknown | Both web and native | carbon |
| `TableHeader` | unknown | Both web and native | carbon |
| `TableRow` | unknown | Both web and native | carbon |
| `TableSelectAll` | unknown | Both web and native | carbon |
| `TableSelectRow` | unknown | Both web and native | carbon |
| `TableSlugRow` | unknown | Both web and native | carbon |
| `TableToolbar` | unknown | Both web and native | carbon |
| `TableToolbarAction` | unknown | Both web and native | carbon |
| `TableToolbarContent` | unknown | Both web and native | carbon |
| `TableToolbarMenu` | unknown | Both web and native | carbon |
| `TableToolbarSearch` | unknown | Both web and native | carbon |
| `Tabs` | unknown | Both web and native | carbon |
| `TabsVertical` | unknown | Both web and native | carbon |
| `Tag` | unknown | Both web and native | carbon |
| `Text` | unknown | Both web and native | carbon |
| `TextArea` | unknown | Both web and native | carbon |
| `TextInput` | unknown | Both web and native | carbon |
| `Theme` | provider | Both web and native | carbon |
| `ThemeContext` | unknown | Both web and native | carbon |
| `Tile` | unknown | Both web and native | carbon |
| `TileAboveTheFoldContent` | unknown | Both web and native | carbon |
| `TileBelowTheFoldContent` | unknown | Both web and native | carbon |
| `TileGroup` | unknown | Both web and native | carbon |
| `TimePicker` | unknown | Both web and native | carbon |
| `TimePickerSelect` | unknown | Both web and native | carbon |
| `ToastNotification` | unknown | Both web and native | carbon |
| `Toggle` | unknown | Both web and native | carbon |
| `Toggletip` | unknown | Both web and native | carbon |
| `ToggletipActions` | unknown | Both web and native | carbon |
| `ToggletipButton` | unknown | Both web and native | carbon |
| `ToggletipContent` | unknown | Both web and native | carbon |
| `ToggletipLabel` | unknown | Both web and native | carbon |
| `Tooltip` | unknown | Both web and native | carbon |
| `TopNavigationBar` | unknown | Both web and native | carbon |
| `TopNavigationBarLogin` | unknown | Both web and native | carbon |
| `TreeNode` | unknown | Both web and native | carbon |
| `TreeView` | unknown | Both web and native | carbon |
| `TruncatedText` | unknown | Both web and native | unexported |
| `UiPanel` | unknown | Both web and native | carbon |
| `UiPanelItem` | unknown | Both web and native | carbon |
| `UnorderedList` | unknown | Both web and native | carbon |
| `UserAvatar` | unknown | Both web and native | unexported |
| `VStack` | unknown | Both web and native | carbon |
| `View` | atom | Both web and native | substrate |
| `ViewWrapper` | unknown | Native primary (degrades on web) | carbon |
| `WebHeader` | unknown | Both web and native | carbon |
<!-- END GENERATED: component-table -->

### Variants

| Variant | Description |
|---|---|
| `variant.ButtonPrimaryOutlined` | Primary button with outlined style |

### Freeform

| Freeform | Description |
|---|---|
| `freeform.RawBox` | Raw box with no token mapping |

### Providers (8)

| Provider | Description |
|---|---|
| `provider.Overlay` | Overlay layer stack for portals and modals |
| `provider.LiveRegionProvider` | Screen reader announcement regions; mount once at app root |
| `provider.Layer` | Elevation level context (0-2) for nested surface tokens |
| `provider.Theme` | Runtime theme override for subtrees |
| `provider.FeatureFlags` | Feature flag context for conditional rendering |
| `provider.IdPrefix` | ID prefix context for unique element id generation |
| `provider.FluidForm` | Marks a form as fluid (label inside field) |
| `provider.ErrorBoundary` | Catches render errors; class component (no hook equivalent) |

## Platform Support

See [docs/platform-support.md](docs/platform-support.md) for the full platform support document, including all 15 exceptions and the safe area explanation.

## Carbon Parity

See [docs/carbon-parity.md](docs/carbon-parity.md) for what we ship and what Carbon has that we deliberately do not.

## API

See [docs/api.md](docs/api.md) for full signatures and [docs/configuration.md](docs/configuration.md) for config keys.

## Testing

```bash
cd _test && npm install && npm test
```

Pure Node. No container, no emulator, no network.

## License

MIT
