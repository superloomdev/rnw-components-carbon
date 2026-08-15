# API Reference

## Loader

```javascript
const Components = require('rnw-components-carbon')(shared_libs, config?)
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `shared_libs.Utils` | Object | Yes | `helper-utils` instance |
| `shared_libs.Debug` | Object | Yes | `helper-debug` instance |
| `shared_libs.React` | Object | Yes | The `react` module (injected, not imported) |
| `shared_libs.Device` | Object | Yes | `js-rnw-helper-device` instance |
| `shared_libs.Icons` | Object | No | Icon source with a `Glyph` component |
| `config` | Object | No | Overrides merged over defaults |

## Functions

### build(theme, breakpoint?)

Builds the themed component registry from a theme contract.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `theme` | Object | - | Theme contract `{ Color, Dimension, Font, Breakpoint }` |
| `breakpoint` | String | `'base'` | Active breakpoint key |

Returns `{ Component, Style }`.

### rebuild(theme, breakpoint?)

Rebuilds the registry with a new theme. Returns a new registry object; the previous registry is never mutated.

Same signature as `build`.

### themeContract(themer_output)

Bridges themer output to the component theme contract. Reshapes the flat token map into `{ Color, Dimension, Font, Breakpoint }`.

| Parameter | Type | Description |
|---|---|---|
| `themer_output` | Object | Result from `Lib.Themer.buildTheme()` or a flat token map |

Returns `{ Color, Dimension, Font, Breakpoint }`.

### useBreakpoint(theme)

React hook that resolves the active breakpoint from the injected Device helper. Subscribes to viewport changes and updates on resize.

| Parameter | Type | Description |
|---|---|---|
| `theme` | Object | Theme contract with `Breakpoint` group |

Returns the active breakpoint key string.

### tokens

Frozen object of valid token sets:

```javascript
{
  fontSize: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
  fontColor: ['text_primary', 'text_secondary', 'text_muted', 'text_on_primary',
    'app_primary', 'status_success', 'status_danger', 'status_warning', 'status_info'],
  fontWeight: ['regular', 'medium', 'semibold', 'bold'],
  space: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
  radius: ['sm', 'md', 'lg', 'xl', 'pill']
}
```

## Component Props

### View

| Prop | Type | Default | Description |
|---|---|---|---|
| `background` | String | - | Background color token (e.g. `'surface'`) |
| `radius` | String | - | Radius token (e.g. `'lg'`) |
| `border` | String\|Boolean | - | Border token or `true` for default |
| `style` | Object\|Array | - | Additional style |
| `...rest` | - | - | Passed through to RN View |

### Text

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | String | `'md'` | Font size token |
| `color` | String | `'text_primary'` | Font color token |
| `weight` | String | `'regular'` | Font weight token |
| `align` | String | - | Text align (`'left'`, `'center'`, `'right'`) |
| `style` | Object\|Array | - | Additional style |
| `...rest` | - | - | Passed through to RN Text |

### Icon

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | String | - | Glyph name (vendor-specific) |
| `size` | String\|Number | `'md'` | Size token or raw pixels |
| `color` | String | `'TEXT_PRIMARY'` | Color token or raw hex |
| `style` | Object | - | Additional style |

### Button

| Prop | Type | Default | Description |
|---|---|---|---|
| `onPress` | Function | - | Press handler |
| `disabled` | Boolean | `false` | Disabled state |
| `background` | String | - | Background color token (with state suffixes) |
| `radius` | String | - | Radius token |
| `accessibilityLabel` | String | - | A11y label |
| `style` | Object\|Array | - | Additional style |
| `children` | Function\|Node | - | Content or function receiving pressable state |

### TextInput

| Prop | Type | Default | Description |
|---|---|---|---|
| `isInvalid` | Boolean | `false` | Invalid state (a11y) |
| `isDisabled` | Boolean | `false` | Disabled state |
| `accessibilityLabel` | String | - | A11y label |
| `onFocus` | Function | - | Focus handler |
| `onBlur` | Function | - | Blur handler |
| `style` | Object\|Array | - | Additional style |
| `...rest` | - | - | Passed through to RN TextInput |

### Toggle

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | Boolean | `false` | Whether the toggle is on |
| `onValueChange` | Function | - | Change callback |
| `disabled` | Boolean | `false` | Disabled state |
| `accessibilityLabel` | String | - | A11y label |

### ButtonPrimary

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | String | - | Button label |
| `icon` | String | - | Leading icon name |
| `onPress` | Function | - | Press handler |
| `disabled` | Boolean | `false` | Disabled state |
| `fullWidth` | Boolean | `false` | Stretch to container width |

### Modal

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | Boolean | `false` | Whether the modal is open |
| `onClose` | Function | - | Called on Escape, outside-press, or hardware back |
| `initialFocusRef` | Ref | - | Element to focus on open |
| `finalFocusRef` | Ref | - | Element to focus on close |
| `children` | Node | - | Modal content |

### Dropdown

| Prop | Type | Default | Description |
|---|---|---|---|
| `triggerLabel` | String | - | Trigger button label |
| `items` | Array | - | Array of `{ value, label }` objects |
| `onSelect` | Function | - | Called with the selected item |
| `accessibilityLabel` | String | - | A11y label for the trigger |

### ProgressBar

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | Number\|null | - | 0 to 1 for determinate, null for indeterminate |
| `color` | String | `'app_primary'` | Fill color token |
| `trackColor` | String | `'surface'` | Track color token |
| `height` | Number | `4` | Bar height in pixels |
| `style` | Object\|Array | - | Additional style |

### Checkbox

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | Boolean\|String | `false` | `true`, `false`, or `'mixed'` for indeterminate |
| `onChange` | Function | - | Called with the next boolean value |
| `disabled` | Boolean | `false` | Disabled state |
| `label` | String | - | Label text rendered alongside the checkbox |
| `accessibilityLabel` | String | - | A11y label (falls back to `label`) |
| `style` | Object\|Array | - | Additional style |

### RadioButton

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | Boolean | `false` | Whether the radio is selected |
| `onChange` | Function | - | Called with `true` on press |
| `disabled` | Boolean | `false` | Disabled state |
| `label` | String | - | Label text rendered alongside the radio |
| `accessibilityLabel` | String | - | A11y label (falls back to `label`) |
| `style` | Object\|Array | - | Additional style |

### TextArea

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | - | Controlled value |
| `defaultValue` | String | `''` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the text value |
| `disabled` | Boolean | `false` | Disabled state |
| `invalid` | Boolean | `false` | Invalid state (a11y) |
| `placeholder` | String | - | Placeholder text |
| `rows` | Number | `4` | Visual height in lines |
| `accessibilityLabel` | String | - | A11y label |
| `style` | Object\|Array | - | Additional style |

### Slider

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | Number | - | Controlled value |
| `defaultValue` | Number | `min` or `0` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the next number |
| `min` | Number | `0` | Minimum value |
| `max` | Number | `100` | Maximum value |
| `step` | Number | `1` | Step increment |
| `disabled` | Boolean | `false` | Disabled state |
| `accessibilityLabel` | String | - | A11y label |
| `style` | Object\|Array | - | Additional style |

### Link

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | String | - | URL (web only, maps to native anchor) |
| `onPress` | Function | - | Press handler |
| `disabled` | Boolean | `false` | Disabled state |
| `children` | Node | - | Link text content |
| `accessibilityLabel` | String | - | A11y label |
| `style` | Object\|Array | - | Additional style |

### Search

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | - | Controlled value |
| `defaultValue` | String | `''` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the text value |
| `onClear` | Function | - | Called when clear button is pressed |
| `placeholder` | String | `'Search'` | Placeholder text |
| `disabled` | Boolean | `false` | Disabled state |
| `accessibilityLabel` | String | - | A11y label |
| `style` | Object\|Array | - | Additional style |

### PasswordInput

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | - | Controlled value |
| `defaultValue` | String | `''` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the text value |
| `placeholder` | String | - | Placeholder text |
| `disabled` | Boolean | `false` | Disabled state |
| `invalid` | Boolean | `false` | Invalid state (a11y) |
| `accessibilityLabel` | String | - | A11y label |
| `style` | Object\|Array | - | Additional style |

### NumberInput

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | Number | - | Controlled value |
| `defaultValue` | Number | `0` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the next number |
| `min` | Number | - | Minimum value |
| `max` | Number | - | Maximum value |
| `step` | Number | `1` | Step increment |
| `disabled` | Boolean | `false` | Disabled state |
| `invalid` | Boolean | `false` | Invalid state (a11y) |
| `accessibilityLabel` | String | - | A11y label |
| `style` | Object\|Array | - | Additional style |

### ExpandableSearch

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | - | Controlled value |
| `defaultValue` | String | `''` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the text value |
| `onClear` | Function | - | Called when clear button is pressed |
| `placeholder` | String | `'Search'` | Placeholder text |
| `disabled` | Boolean | `false` | Disabled state |
| `defaultExpanded` | Boolean | `false` | Whether the search starts expanded |
| `accessibilityLabel` | String | - | A11y label |
| `style` | Object\|Array | - | Additional style |

### FormLabel

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | String\|Node | - | Label text |
| `htmlFor` | String | - | ID of associated control (web only) |
| `required` | Boolean | `false` | Shows required indicator |
| `disabled` | Boolean | `false` | Dims the label |
| `style` | Object\|Array | - | Additional style |

### FormItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | String | - | Label text (rendered as FormLabel) |
| `children` | Node | - | The form control element |
| `helperText` | String | - | Helper text shown below the control |
| `errorText` | String | - | Error text shown in danger color |
| `required` | Boolean | `false` | Passed to the label |
| `disabled` | Boolean | `false` | Passed to the label |
| `style` | Object\|Array | - | Additional style |

## Mechanisms

Eight shared mechanisms live in `component/` and are used across all components.

### a11y (M1)

The single translator from semantic state to `aria-*` props. The only module allowed to emit accessibility state/value/relation/position props.

```javascript
const a11y = require('./component/a11y')(Lib);
a11y.state({ checked: true, disabled: false });  // -> { 'aria-checked': true }
a11y.value({ min: 0, max: 1, now: 0.5 });        // -> { 'aria-valuemin': 0, ... }
a11y.relation({ controls: 'panel-1' });           // -> { 'aria-controls': 'panel-1' }
a11y.position({ posinset: 3, setsize: 10 });      // -> { 'aria-posinset': 3, ... }
a11y.id('carbon-tab');                            // -> 'carbon-tab-1'
```

### usePressKeys (M2)

Normalizes Enter and Space activation per role. Fixes the RNW bug where Space does not activate non-button roles.

### useRovingTabIndex (M3)

Roving tab index for composite widgets. Exactly one item carries `focusable={true}`; arrow keys move the active index.

### OverlayHost (M4)

Overlay stacking provider. Maintains an ordered stack so a Popover opened from inside a Modal paints above it.

### useAnchoredPosition (M5)

Position calculation for anchored overlays. Measures the anchor and viewport, computes placement, flips on overflow.

### LiveRegionProvider (M6)

Screen reader announcements through permanently-mounted `aria-live` regions. Fixes the `announceForAccessibility` no-op on web.

### createCompoundContext (M7)

Context factory for compound components. Creates a Provider and useContext hook that throws when used outside its Provider.

### useControllableState (M8)

Controlled/uncontrolled state hook. Controlled when `value` is not undefined, uncontrolled otherwise. Warns once on mode switch.

## Component Count

The library ships 46 flat component keys (23 atoms + 23 molecules) plus 1 variant, 1 freeform, and 8 providers, totaling 56 named components. Wave 4 adds 6 new providers.
