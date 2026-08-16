# ROBOTS.md - rnw-components-carbon

> Compact signature reference for AI agents. Read this before calling any function in this module.

**Module:** `@superloomdev/rnw-components-carbon` | **Alias:** `rnw-components-carbon` | **Class:** I (standalone framework module, factory) | **Runtime:** React Native Web (web, iOS, Android), Node.js 24+ for testing

## Load

```javascript
const Components = require('rnw-components-carbon')({
  Utils: Utils,
  Debug: Debug,
  React: React,
  Device: Device,
  Icons: Icons           // optional; Icon atom returns null without it
});
```

Factory. Each call returns an independent instance with its own registry. `React` is injected (not imported) to prevent two-copy hook errors. `Device` is `js-rnw-helper-device`.

## Peer Dependencies

| Package | Range |
|---|---|
| `react` | `>=18` |
| `react-native` | `>=0.74` |
| `helper-utils` | `^1.0.0` |
| `helper-debug` | `^1.0.0` |
| `helper-themer` | `^1.0.0` |
| `helper-device` | `^1.0.0` |

`react-native` is a direct peer (imported normally for View, Text, Pressable, etc.). `react` is injected via `shared_libs.React` to prevent two-copy hook errors.

## CONFIG

| Key | Type | Default | Constraint |
|---|---|---|---|
| `DEFAULT_FONT_SIZE` | String | `'md'` | non-empty string |
| `DEFAULT_FONT_COLOR` | String | `'text_primary'` | non-empty string |
| `DEFAULT_FONT_WEIGHT` | String | `'regular'` | non-empty string |
| `MIN_HIT_TARGET` | Number | `44` | positive number |
| `BREAKPOINT_ORDER` | Array | `['base','sm','md','lg','xl']` | non-empty array of strings |

Validated at load. Bad config throws immediately.

## Signatures

```javascript
build(theme, breakpoint?)          -> { Component, Style }
rebuild(theme, breakpoint?)        -> { Component, Style }
themeContract(themer_output)       -> { Color, Dimension, Font, Breakpoint }
useBreakpoint(theme)               -> string  // React hook
tokens                             -> { fontSize, fontColor, fontWeight, space, radius }  // frozen
```

`theme` is `{ Color, Dimension, Font, Breakpoint }`. `themer_output` is the result from `Lib.Themer.buildTheme()` or a flat token map.

## Theme Contract

| Group | Required Keys |
|---|---|
| `Color` | `APP_PRIMARY`, `TEXT_PRIMARY`, `TEXT_MUTED`, `TEXT_ON_PRIMARY`, `SURFACE`, `BORDER` |
| `Dimension` | `fontSize{}`, `space{}`, `radius{}`, `lineHeightRatio` |
| `Font` | `family{primary}`, `weight{regular}` |
| `Breakpoint` | `base`, `sm`, `md`, `lg`, `xl` (numeric min-widths) |

## Component Registry

<!-- BEGIN GENERATED: component-list -->
| Component | Role | Platform |
|---|---|---|
| `AILabel` | unknown | both |
| `AILabelActions` | unknown | both |
| `AILabelContent` | unknown | both |
| `AISkeletonIcon` | unknown | both |
| `AISkeletonPlaceholder` | unknown | both |
| `AISkeletonText` | unknown | both |
| `AcceptTerms` | unknown | both |
| `Accordion` | unknown | both |
| `AccordionItem` | unknown | both |
| `ActionSheet` | unknown | split |
| `ActionableNotification` | unknown | both |
| `AspectRatio` | unknown | both |
| `BadgeIndicator` | unknown | both |
| `BottomNavigationBar` | unknown | both |
| `BottomSafeAreaColorOverride` | unknown | native-primary |
| `BottomToolbar` | unknown | both |
| `BottomToolbarPrimaryAction` | unknown | both |
| `Breadcrumb` | unknown | both |
| `BreadcrumbItem` | unknown | both |
| `Button` | unknown | both |
| `ButtonSet` | unknown | both |
| `Callout` | unknown | both |
| `Checkbox` | unknown | both |
| `CheckboxGroup` | unknown | both |
| `ClickableTile` | unknown | both |
| `CodeSnippet` | unknown | split |
| `Column` | unknown | both |
| `ColumnHang` | unknown | both |
| `ComboBox` | unknown | both |
| `ComboButton` | unknown | both |
| `ComposedModal` | unknown | both |
| `ContainedList` | unknown | both |
| `ContainedListItem` | unknown | both |
| `Content` | unknown | both |
| `ContentSwitcher` | unknown | both |
| `ControlledPasswordInput` | unknown | both |
| `Copy` | unknown | both |
| `CopyButton` | unknown | split |
| `DataTable` | unknown | both |
| `DataTableCell` | unknown | both |
| `DataTableHeader` | unknown | both |
| `DataTableHeaderSelected` | unknown | both |
| `DataTableRow` | unknown | both |
| `DateInput` | unknown | both |
| `DatePicker` | unknown | both |
| `DatePickerInput` | unknown | both |
| `DefinitionTooltip` | unknown | both |
| `DismissibleTag` | unknown | both |
| `DocumentViewer` | unknown | split |
| `Dropdown` | unknown | both |
| `ErrorBoundary` | provider | both |
| `ErrorBoundaryContext` | unknown | both |
| `ErrorState` | unknown | both |
| `ExpandableSearch` | unknown | both |
| `ExpandableTile` | unknown | both |
| `FeatureFlags` | provider | both |
| `FileUploader` | unknown | split |
| `FileUploaderButton` | unknown | split |
| `FileUploaderDropContainer` | unknown | split |
| `FileUploaderItem` | unknown | split |
| `Filename` | unknown | both |
| `FilterableMultiSelect` | unknown | both |
| `FlexGrid` | unknown | both |
| `FluidForm` | provider | both |
| `Form` | unknown | both |
| `FormContext` | unknown | both |
| `FormGroup` | unknown | both |
| `FormItem` | unknown | both |
| `FormLabel` | unknown | both |
| `GlobalTheme` | unknown | both |
| `GrantPermission` | unknown | native-primary |
| `Grid` | unknown | both |
| `GridSettings` | unknown | both |
| `HStack` | unknown | both |
| `Header` | unknown | both |
| `HeaderContainer` | unknown | both |
| `HeaderGlobalAction` | unknown | both |
| `HeaderGlobalBar` | unknown | both |
| `HeaderMenu` | unknown | both |
| `HeaderMenuButton` | unknown | both |
| `HeaderMenuItem` | unknown | both |
| `HeaderName` | unknown | both |
| `HeaderNavigation` | unknown | both |
| `HeaderPanel` | unknown | both |
| `HeaderSideNavItems` | unknown | both |
| `Heading` | unknown | both |
| `Icon` | atom | both |
| `IconButton` | unknown | both |
| `IconIndicator` | unknown | both |
| `IconSwitch` | unknown | both |
| `IconTab` | unknown | both |
| `IdPrefix` | provider | both |
| `Image` | atom | both |
| `InlineLink` | unknown | both |
| `InlineLoading` | unknown | both |
| `InlineNotification` | unknown | both |
| `LandingView` | unknown | both |
| `Layer` | provider | both |
| `Link` | unknown | both |
| `List` | unknown | both |
| `ListItem` | unknown | both |
| `LiveRegionProvider` | provider | both |
| `Loading` | unknown | both |
| `Menu` | unknown | both |
| `MenuButton` | unknown | both |
| `MenuItem` | unknown | both |
| `MenuItemDivider` | unknown | both |
| `MenuItemGroup` | unknown | both |
| `MenuItemRadioGroup` | unknown | both |
| `MenuItemSelectable` | unknown | both |
| `Modal` | unknown | both |
| `ModalBody` | unknown | both |
| `ModalFooter` | unknown | both |
| `ModalHeader` | unknown | both |
| `MultiSelect` | unknown | both |
| `NavigationList` | unknown | both |
| `NavigationListItem` | unknown | both |
| `Notification` | unknown | both |
| `NotificationActionButton` | unknown | both |
| `NotificationButton` | unknown | both |
| `NumberInput` | unknown | both |
| `OperationalTag` | unknown | both |
| `OrderedList` | unknown | both |
| `OverflowMenu` | unknown | both |
| `OverflowMenuItem` | unknown | both |
| `Overlay` | provider | split |
| `Pagination` | unknown | both |
| `PaginationNav` | unknown | both |
| `PasswordInput` | unknown | both |
| `Popover` | unknown | both |
| `PopoverContent` | unknown | both |
| `PrefixContext` | unknown | both |
| `ProgressBar` | unknown | both |
| `ProgressIndicator` | unknown | both |
| `ProgressStep` | unknown | both |
| `RadioButton` | unknown | both |
| `RadioButtonGroup` | unknown | both |
| `RadioTile` | unknown | both |
| `Row` | unknown | both |
| `SafeAreaWrapper` | unknown | native-primary |
| `Search` | unknown | both |
| `Section` | unknown | both |
| `Select` | unknown | both |
| `SelectItem` | unknown | both |
| `SelectItemGroup` | unknown | both |
| `SelectableTag` | unknown | both |
| `SelectableTile` | unknown | both |
| `ShapeIndicator` | unknown | both |
| `SideNav` | unknown | both |
| `SideNavDetails` | unknown | both |
| `SideNavDivider` | unknown | both |
| `SideNavFooter` | unknown | both |
| `SideNavHeader` | unknown | both |
| `SideNavIcon` | unknown | both |
| `SideNavItem` | unknown | both |
| `SideNavItems` | unknown | both |
| `SideNavLink` | unknown | both |
| `SideNavLinkText` | unknown | both |
| `SideNavMenu` | unknown | both |
| `SideNavMenuItem` | unknown | both |
| `SideNavSwitcher` | unknown | both |
| `SidePanel` | unknown | both |
| `Skeleton` | unknown | both |
| `SkeletonIcon` | unknown | both |
| `SkeletonPlaceholder` | unknown | both |
| `SkeletonText` | unknown | both |
| `SkipToContent` | unknown | web-primary |
| `Slider` | unknown | both |
| `Stack` | unknown | both |
| `StaticNotification` | unknown | both |
| `StructuredListBody` | unknown | both |
| `StructuredListCell` | unknown | both |
| `StructuredListHead` | unknown | both |
| `StructuredListInput` | unknown | both |
| `StructuredListRow` | unknown | both |
| `StructuredListWrapper` | unknown | both |
| `Switch` | unknown | both |
| `Switcher` | unknown | both |
| `SwitcherDivider` | unknown | both |
| `SwitcherItem` | unknown | both |
| `Tab` | unknown | both |
| `TabContent` | unknown | both |
| `TabList` | unknown | both |
| `TabListVertical` | unknown | both |
| `TabPanel` | unknown | both |
| `TabPanels` | unknown | both |
| `Table` | unknown | both |
| `TableActionList` | unknown | both |
| `TableBatchAction` | unknown | both |
| `TableBatchActions` | unknown | both |
| `TableBody` | unknown | both |
| `TableCell` | unknown | both |
| `TableContainer` | unknown | both |
| `TableDecoratorRow` | unknown | both |
| `TableExpandHeader` | unknown | both |
| `TableExpandRow` | unknown | both |
| `TableExpandedRow` | unknown | both |
| `TableHead` | unknown | both |
| `TableHeader` | unknown | both |
| `TableRow` | unknown | both |
| `TableSelectAll` | unknown | both |
| `TableSelectRow` | unknown | both |
| `TableSlugRow` | unknown | both |
| `TableToolbar` | unknown | both |
| `TableToolbarAction` | unknown | both |
| `TableToolbarContent` | unknown | both |
| `TableToolbarMenu` | unknown | both |
| `TableToolbarSearch` | unknown | both |
| `Tabs` | unknown | both |
| `TabsVertical` | unknown | both |
| `Tag` | unknown | both |
| `Text` | unknown | both |
| `TextArea` | unknown | both |
| `TextInput` | unknown | both |
| `Theme` | provider | both |
| `ThemeContext` | unknown | both |
| `Tile` | unknown | both |
| `TileAboveTheFoldContent` | unknown | both |
| `TileBelowTheFoldContent` | unknown | both |
| `TileGroup` | unknown | both |
| `TimePicker` | unknown | both |
| `TimePickerSelect` | unknown | both |
| `ToastNotification` | unknown | both |
| `Toggle` | unknown | both |
| `Toggletip` | unknown | both |
| `ToggletipActions` | unknown | both |
| `ToggletipButton` | unknown | both |
| `ToggletipContent` | unknown | both |
| `ToggletipLabel` | unknown | both |
| `Tooltip` | unknown | both |
| `TopNavigationBar` | unknown | both |
| `TopNavigationBarLogin` | unknown | both |
| `TreeNode` | unknown | both |
| `TreeView` | unknown | both |
| `TruncatedText` | unknown | both |
| `UiPanel` | unknown | both |
| `UiPanelItem` | unknown | both |
| `UnorderedList` | unknown | both |
| `UserAvatar` | unknown | both |
| `VStack` | unknown | both |
| `View` | atom | both |
| `ViewWrapper` | unknown | native-primary |
| `WebHeader` | unknown | both |
<!-- END GENERATED: component-list -->

| Variants | `variant.ButtonPrimaryOutlined` |
| Freeform | `freeform.RawBox` |
| Providers (8) | `provider.Overlay`, `provider.LiveRegionProvider`, `provider.Layer`, `provider.Theme`, `provider.FeatureFlags`, `provider.IdPrefix`, `provider.FluidForm`, `provider.ErrorBoundary` |

## Component Shapes

| Shape | Marker | Focus Management |
|---|---|---|
| S1 Presentational | No interaction state | None |
| S2 Interactive | Pressable with state | None |
| S3 Overlay | Modal/Dropdown with focus trap | `useFocusTrap` hook: trap (boolean), restore, Escape/back, outside-press. `aria-modal` on the overlay container |

## Failure Model

**Boot-time misconfiguration throws `TypeError`.** Theme validation, config validation, and injection validation all throw at construction time.

**Render-time prop errors warn and fall back deterministically.** Unknown token props trigger `Lib.Debug.warn` and fall back to the default token. No render-time throw.

Message format: `rnw-components-carbon: <field> <expected-shape>`

## Mechanisms

Eight shared mechanisms in `component/`, used across all components:

| Mechanism | File | Purpose |
|---|---|---|
| M1 a11y | `a11y.js` | Translates semantic state to `aria-*` props. Only module allowed to emit accessibility state props |
| M2 usePressKeys | `usePressKeys.js` | Enter/Space activation per role. Fixes RNW Space no-op for non-button roles |
| M3 useRovingTabIndex | `useRovingTabIndex.js` | Roving tab index for composite widgets (Tabs, Menu, etc.) |
| M4 OverlayHost | `OverlayHost.js` | Overlay stacking provider with z-index management |
| M5 useAnchoredPosition | `useAnchoredPosition.js` | Position calculation for anchored overlays (Popover, Menu, etc.) |
| M6 LiveRegionProvider | `LiveRegionProvider.js` | Screen reader announcements via `aria-live` regions |
| M7 createCompoundContext | `createCompoundContext.js` | Context factory for compound components. Throws outside Provider |
| M8 useControllableState | `useControllableState.js` | Controlled/uncontrolled state hook for form components |

## Naming Rule

| Surface | Case |
|---|---|
| Theme token keys | `SCREAMING_SNAKE_CASE` (`APP_PRIMARY`, `TEXT_MUTED`) |
| Utility class names | `lowercase_with_underscores` (`font_size_md`, `background_surface`) |
| Component prop tokens | `lowercase` (`size: 'md'`, `color: 'text_primary'`) |
| Breakpoint keys | `lowercase` (`base`, `sm`, `md`, `lg`, `xl`) |

## Testing

```bash
cd _test && npm install && npm test
```

Pure Node. No container, no emulator, no network. Uses `react-test-renderer` with a stub `react-native` module (intercepted via `Module._resolveFilename`).

## Gotchas

- **React must be injected, not imported.** Two copies of React break hooks; the library closes over `Lib.React` everywhere
- **`react-native` is imported directly.** Unlike `react`, RN is a single-instance peer with no hook contract
- **Freeform components receive `Lib` but NOT `Style` or `Registry`.** They cannot read tokens or compose atoms
- **`useBreakpoint` is a hook.** It must be called inside a React component; it uses `useState` and `useEffect`
- **`rebuild` returns a new registry.** The previous registry is never mutated; callers must swap the reference
- **`themeContract` adds `Breakpoint`.** The themer does not own breakpoints; they are layout boundaries, not design tokens
