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

| Tier | Components |
|---|---|
| Atoms (23) | `View`, `Text`, `Icon`, `Image`, `Badge`, `Separator`, `ProgressBar`, `Button`, `TextInput`, `Toggle`, `Checkbox`, `RadioButton`, `TextArea`, `Slider`, `Link`, `Skeleton`, `Loading`, `Tag`, `AspectRatio`, `Heading`, `BadgeIndicator`, `ShapeIndicator`, `IconIndicator` |
| Molecules (76) | `ButtonPrimary`, `ButtonLink`, `Card`, `ListItem`, `Dropdown`, `Modal`, `Search`, `PasswordInput`, `NumberInput`, `ExpandableSearch`, `FormLabel`, `FormItem`, `Stack`, `ButtonSet`, `IconButton`, `CopyButton`, `UserAvatar`, `TruncatedText`, `CodeSnippet`, `InlineLoading`, `Tile`, `ClickableTile`, `SelectableTile`, `MenuItem`, `MenuItemSelectable`, `MenuItemDivider`, `ModalHeader`, `ModalBody`, `ModalFooter`, `Popover`, `Tooltip`, `DefinitionTooltip`, `Toggletip`, `Tab`, `TabList`, `TabPanel`, `AccordionItem`, `BreadcrumbItem`, `Switch`, `PageSelector`, `TreeNode`, `Step`, `HeaderNav`, `HeaderMenuButton`, `HeaderPanel`, `ProgressIndicator`, `Notification`, `Toast`, `ActionBar`, `BatchAction`, `Alert`, `Callout`, `DataTable`, `TableRow`, `TableCell`, `TableHeader`, `TableBody`, `TableHead`, `Grid`, `Row`, `Column`, `FlexGrid`, `Container`, `LayerMolecule`, `Form`, `Fieldset`, `Legend`, `OrderedList`, `UnorderedList`, `ListItemNav`, `StructuredList`, `StructuredListRow`, `StructuredListCell`, `Toolbar`, `Divider`, `ScrollGradient` |
| Composites (37) | `Menu`, `OverflowMenu`, `MenuButton`, `ComboButton`, `ComposedModal`, `MenuItemRadioGroup`, `SidePanel`, `AILabel`, `LongPressMenu`, `Tabs`, `Accordion`, `Breadcrumb`, `ContentSwitcher`, `Pagination`, `TreeView`, `Steps`, `Header`, `DataTableRow`, `PaginationBar`, `ToggletipLabel`, `GridItem`, `Select`, `ComboBox`, `MultiSelect`, `RadioButtonGroup`, `CheckboxGroup`, `SliderInput`, `DatePicker`, `TimePicker`, `DateRangePicker`, `NumberInputComposite`, `FileUploader`, `FluidForm`, `FormGroup`, `ToggleGroup`, `TimeInput`, `DateInput` |
| Variants | `variant.ButtonPrimaryOutlined` |
| Freeform | `freeform.RawBox` |
| Providers (8) | `provider.OverlayHost`, `provider.LiveRegionProvider`, `provider.Layer`, `provider.Theme`, `provider.FeatureFlags`, `provider.IdPrefix`, `provider.FluidForm`, `provider.ErrorBoundary` |

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
