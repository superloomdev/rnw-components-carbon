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
const Components = require('rnw-components-carbon')({
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
    React.createElement(Component.ButtonPrimary, {
      title: 'Submit',
      onPress: function () { /* ... */ }
    })
  );
};
```

## Component Tiers

### Atoms (23)

| Atom | Shape | Description |
|---|---|---|
| `View` | S1 | Base layout box with token-mapped background, radius, border |
| `Text` | S1 | Typography with size, color, weight, align tokens |
| `Icon` | S1 | Wraps an injected glyph component (`Lib.Icons.Glyph`) |
| `Image` | S1 | Image with token-mapped radius and background |
| `Badge` | S1 | Count or status indicator pill |
| `Separator` | S1 | Horizontal or vertical divider line |
| `ProgressBar` | S1 | Determinate or indeterminate progress bar with `aria-valuenow` |
| `Button` | S2 | Pressable with state-driven background and hit-target guarantee |
| `TextInput` | S2 | Themed input with focus border swap and `aria-*` state |
| `Toggle` | S2 | On/off toggle with token-driven track and thumb colors |
| `Checkbox` | S2 | Checkbox with `aria-checked`, supports `'mixed'` for indeterminate |
| `RadioButton` | S2 | Radio button with `aria-checked`, always sets `true` on press |
| `TextArea` | S2 | Multiline text input with controlled/uncontrolled value |
| `Slider` | S2 | Range slider with `aria-valuemin/max/now`, role `slider` on web |
| `Link` | S2 | Pressable styled as hyperlink with `role="link"` |
| `Skeleton` | S1 | Loading placeholder with `aria-hidden`, supports text/icon/placeholder |
| `Loading` | S1 | Indeterminate spinner with `role="progressbar"` and `aria-busy` |
| `Tag` | S1/S2 | Compact label, dismissible or selectable |
| `AspectRatio` | S1 | Wrapper maintaining width-to-height ratio |
| `Heading` | S1 | Text with `role="header"` and `aria-level` 1-6 |
| `BadgeIndicator` | S1 | Numeric count badge with overflow display |
| `ShapeIndicator` | S1 | Colored shape (circle/square/triangle) for status display |
| `IconIndicator` | S1 | Colored circle with icon for status display |

### Molecules (23)

| Molecule | Shape | Description |
|---|---|---|
| `ButtonPrimary` | S2 | Primary button composing Icon + Text in a Pressable |
| `ButtonLink` | S2 | Text-only button styled as a link |
| `Card` | S1/S2 | Themed surface with shadow; pressable when `onPress` is provided |
| `ListItem` | S2 | Selectable row with icon, title, subtitle, trailing |
| `Dropdown` | S3 | Dropdown menu with focus trap, Escape/back, outside-press |
| `Modal` | S3 | Dialog overlay with focus trap, Escape/back, outside-press |
| `Search` | S2 | Search input with icon and clear button, `role="searchbox"` |
| `PasswordInput` | S2 | Text input with show/hide password toggle |
| `NumberInput` | S2 | Numeric input with increment/decrement buttons, `role="spinbutton"` |
| `ExpandableSearch` | S2 | Collapsible search that expands to full input on press |
| `FormLabel` | S1 | Label text for form fields with optional required indicator |
| `FormItem` | S1 | Wrapper grouping label, control, and helper/error text |
| `Stack` | S1 | Vertical or horizontal stack with consistent gap spacing |
| `ButtonSet` | S1 | Horizontal group of buttons with consistent spacing |
| `IconButton` | S2 | Button with only an icon, `role="button"` |
| `CopyButton` | S2 | Button that copies text to clipboard with success feedback |
| `UserAvatar` | S1 | User avatar with image or initials fallback |
| `TruncatedText` | S2 | Text that truncates and expands on press |
| `CodeSnippet` | S1/S2 | Code display block with optional copy button |
| `InlineLoading` | S1 | Inline loading indicator with status text |
| `Tile` | S1 | Tile card with title, subtitle, and optional icon |
| `ClickableTile` | S2 | Tile that acts as a button with `role="button"` |
| `SelectableTile` | S2 | Tile that acts as a checkbox with `role="checkbox"` |
| `MenuItem` | S2 | Menu item with `role="menuitem"`, optional icon and shortcut |
| `MenuItemSelectable` | S2 | Menu item with `role="menuitemcheckbox"`, toggle state |
| `MenuItemDivider` | S1 | Separator within a menu, `role="separator"` |
| `ModalHeader` | S1 | Header section for ComposedModal with title and close button |
| `ModalBody` | S1 | Body section for ComposedModal |
| `ModalFooter` | S1 | Footer section for ComposedModal, typically action buttons |
| `Popover` | S3 | Floating content panel anchored to a trigger |
| `Tooltip` | S3 | Floating tooltip on hover/focus (web) or long-press (native) |
| `DefinitionTooltip` | S3 | Inline term with definition tooltip on hover/focus |
| `Toggletip` | S3 | Tooltip triggered by press (not hover) |

### Composites (9)

| Composite | Shape | Description |
|---|---|---|
| `Menu` | S3 | Menu container with `role="menu"`, focus trap, overlay stacking |
| `OverflowMenu` | S3 | Button that opens a Menu with overflow icon |
| `MenuButton` | S3 | Button that opens a Menu |
| `ComboButton` | S3 | Split button: primary action plus dropdown for secondary actions |
| `ComposedModal` | S3 | Modal dialog with ModalHeader/Body/Footer coordination |
| `MenuItemRadioGroup` | S4 | Group of menu items where exactly one is selected |
| `SidePanel` | S3 | Side panel that slides in from left or right |
| `AILabel` | S3 | AI-generated content label with toggletip details |
| `LongPressMenu` | S3 | Menu triggered by long-press (native) or right-click (web) |
| `Tab` | S2 | Tab trigger with `role="tab"`, optional Tabs context for roving index |
| `TabList` | S1 | Container for Tab elements, `role="tablist"` |
| `TabPanel` | S1 | Tab content panel, `role="tabpanel"` |
| `AccordionItem` | S2 | Collapsible section with button header and content region |
| `BreadcrumbItem` | S2 | Breadcrumb link with `aria-current` for current page |
| `Switch` | S2 | Content switcher button with `role="button"` |
| `PageSelector` | S2 | Page number selector with `role="group"` |
| `TreeNode` | S2 | Tree node with `role="treeitem"`, expand/collapse, level |
| `Step` | S1 | Step indicator with `role="listitem"`, status and number |
| `HeaderNav` | S1 | Header navigation container, `role="navigation"` |
| `HeaderMenuButton` | S2 | Header menu toggle button |
| `HeaderPanel` | S1 | Header expandable panel, `role="region"` |
| `ProgressIndicator` | S1 | Navigation step progress, `role="progressbar"` |
| `Notification` | S1/S2 | Notification banner with status, `role="alert"`, close button |
| `Toast` | S1/S2 | Auto-dismissing toast, `role="alert"`, timer-based |
| `ActionBar` | S1 | Toolbar for batch actions, `role="toolbar"` |
| `BatchAction` | S2 | Action button for batch operations |
| `Alert` | S1 | Alert banner with kind (info/success/warning/error) |
| `Callout` | S1 | Less urgent alert variant, `role="note"` |
| `DataTable` | S1 | Simple table with headers and rows, `role="table"` |
| `TableRow` | S1 | Table row, `role="row"` |
| `TableCell` | S1 | Table cell, `role="cell"` |
| `TableHeader` | S1 | Table header cell, `role="columnheader"` |
| `TableBody` | S1 | Table body, `role="rowgroup"` |
| `TableHead` | S1 | Table head, `role="rowgroup"` |
| `Grid` | S1 | CSS grid-like layout with columns and gap |
| `Row` | S1 | Horizontal layout row |
| `Column` | S1 | Vertical layout column |
| `FlexGrid` | S1 | Flex-based grid with gap |
| `Container` | S1 | Max-width wrapper |
| `LayerMolecule` | S1 | Surface token by level (0-2) |
| `Form` | S1 | Form container, `role="form"` |
| `Fieldset` | S1 | Group with legend, `role="group"` |
| `Legend` | S1 | Legend caption, `role="legend"` |
| `OrderedList` | S1 | Ordered list, `role="list"` |
| `UnorderedList` | S1 | Unordered list, `role="list"` |
| `ListItemNav` | S2 | Navigation list item, `role="listitem"` |
| `StructuredList` | S1 | Structured list, `role="table"` |
| `StructuredListRow` | S1 | Structured list row |
| `StructuredListCell` | S1 | Structured list cell |
| `Toolbar` | S1 | Toolbar container, `role="toolbar"` |
| `Divider` | S1 | Layout separator, `role="separator"` |
| `ScrollGradient` | S1 | Scrollable container with fade gradients |

### Composites (37)

| Composite | Shape | Description |
|---|---|---|
| `Menu` | S3 | Menu container with `role="menu"`, focus trap, overlay stacking |
| `OverflowMenu` | S3 | Button that opens a Menu with overflow icon |
| `MenuButton` | S3 | Button that opens a Menu |
| `ComboButton` | S3 | Split button: primary action plus dropdown for secondary actions |
| `ComposedModal` | S3 | Modal dialog with ModalHeader/Body/Footer coordination |
| `MenuItemRadioGroup` | S4 | Group of menu items where exactly one is selected |
| `SidePanel` | S3 | Side panel that slides in from left or right |
| `AILabel` | S3 | AI-generated content label with toggletip details |
| `LongPressMenu` | S3 | Menu triggered by long-press (native) or right-click (web) |
| `Tabs` | S4 | Tab navigation with roving tab index, `role="tablist"` |
| `Accordion` | S4 | Accordion with context-coordinated items |
| `Breadcrumb` | S1 | Breadcrumb navigation container |
| `ContentSwitcher` | S4 | Content switcher with roving tab index |
| `Pagination` | S2 | Pagination with prev/next and page numbers |
| `TreeView` | S4 | Tree navigation with recursive nodes, `role="tree"` |
| `Steps` | S4 | Step navigation with context-coordinated steps |
| `Header` | S1/S2 | Navigation header container |
| `DataTableRow` | S2 | Interactive table row with onPress and selected state |
| `PaginationBar` | S2 | Full pagination bar with prev/next and page numbers |
| `ToggletipLabel` | S1/S3 | Label with inline Toggletip |
| `GridItem` | S1 | Grid item with span support, `role="gridcell"` |
| `Select` | S3 | Dropdown select with combobox role |
| `ComboBox` | S3 | Select with text input filtering |
| `MultiSelect` | S3 | Multi-select with checkboxes, `aria-multiselectable` |
| `RadioButtonGroup` | S4 | Radio button group with roving tab index |
| `CheckboxGroup` | S4 | Checkbox group with context coordination |
| `SliderInput` | S2 | Slider with label and value display |
| `DatePicker` | S3 | Date picker with calendar view |
| `TimePicker` | S3 | Time picker with hour/minute selection |
| `DateRangePicker` | S2 | Date range with start/end inputs |
| `NumberInputComposite` | S2 | Number input with label and unit |
| `FileUploader` | S2 | File upload trigger button |
| `FluidForm` | S1 | Form with fluid label context |
| `FormGroup` | S1 | Form field group with label and message |
| `ToggleGroup` | S4 | Toggle button group with roving tab index |
| `TimeInput` | S2 | Time text input with HH:MM format |
| `DateInput` | S2 | Date text input with YYYY-MM-DD format |

### Variants

| Variant | Description |
|---|---|
| `variant.ButtonPrimaryOutlined` | Outlined/ghost variant of ButtonPrimary |

### Freeform

| Component | Description |
|---|---|
| `freeform.RawBox` | Escape hatch with no token access; takes raw styles only |

### Providers (8)

| Provider | Description |
|---|---|
| `provider.OverlayHost` | Overlay stacking provider; mount once at app root |
| `provider.LiveRegionProvider` | Screen reader announcement regions; mount once at app root |
| `provider.Layer` | Elevation level context (0-2) for nested surface tokens |
| `provider.Theme` | Runtime theme override for subtrees |
| `provider.FeatureFlags` | Feature flag context for conditional rendering |
| `provider.IdPrefix` | ID prefix context for unique element id generation |
| `provider.FluidForm` | Marks a form as fluid (label inside field) |
| `provider.ErrorBoundary` | Catches render errors; class component (no hook equivalent) |

## API

See [docs/api.md](docs/api.md) for full signatures and [docs/configuration.md](docs/configuration.md) for config keys.

## Testing

```bash
cd _test && npm install && npm test
```

Pure Node. No container, no emulator, no network.

## License

MIT
