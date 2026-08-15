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

### Atoms (15)

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

### Molecules (12)

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

### Variants

| Variant | Description |
|---|---|
| `variant.ButtonPrimaryOutlined` | Outlined/ghost variant of ButtonPrimary |

### Freeform

| Component | Description |
|---|---|
| `freeform.RawBox` | Escape hatch with no token access; takes raw styles only |

### Providers

| Provider | Description |
|---|---|
| `provider.OverlayHost` | Overlay stacking provider; mount once at app root |
| `provider.LiveRegionProvider` | Screen reader announcement regions; mount once at app root |

## API

See [docs/api.md](docs/api.md) for full signatures and [docs/configuration.md](docs/configuration.md) for config keys.

## Testing

```bash
cd _test && npm install && npm test
```

Pure Node. No container, no emulator, no network.

## License

MIT
