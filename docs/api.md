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

## Wave 6-9 Component Props

### Tab

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | String | - | Tab label text |
| `selected` | Boolean | `false` | Whether this tab is selected |
| `onPress` | Function | - | Press handler |
| `disabled` | Boolean | `false` | Disabled state |
| `style` | Object\|Array | - | Additional style |

### TabList

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Tab elements |
| `style` | Object\|Array | - | Additional style |

### TabPanel

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Panel content |
| `selected` | Boolean | - | Whether this panel is visible |
| `style` | Object\|Array | - | Additional style |

### AccordionItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | String | - | Header label |
| `children` | Node | - | Expandable content |
| `expanded` | Boolean | `false` | Whether the item is expanded |
| `onToggle` | Function | - | Called with next expanded state |
| `style` | Object\|Array | - | Additional style |

### BreadcrumbItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | String | - | Optional URL |
| `onPress` | Function | - | Press handler |
| `children` | Node | - | Label content |
| `isCurrentPage` | Boolean | `false` | Whether this is the current page |
| `style` | Object\|Array | - | Additional style |

### Switch

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | String | - | Switch label text |
| `selected` | Boolean | `false` | Whether this switch is selected |
| `onPress` | Function | - | Press handler |
| `disabled` | Boolean | `false` | Disabled state |
| `style` | Object\|Array | - | Additional style |

### PageSelector

| Prop | Type | Default | Description |
|---|---|---|---|
| `currentPage` | Number | `1` | Active page (1-based) |
| `totalPages` | Number | `1` | Total number of pages |
| `onChange` | Function | - | Called with selected page number |
| `style` | Object\|Array | - | Additional style |

### TreeNode

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | String | - | Node label |
| `children` | Node | - | Child TreeNode elements |
| `expanded` | Boolean | `false` | Whether the node is expanded |
| `onToggle` | Function | - | Called with next expanded state |
| `selected` | Boolean | `false` | Whether this node is selected |
| `level` | Number | `1` | Depth in the tree (1-based) |
| `style` | Object\|Array | - | Additional style |

### Step

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | String | - | Step label |
| `status` | String | `'incomplete'` | `'complete'`, `'current'`, or `'incomplete'` |
| `stepNumber` | Number | - | 1-based step position |
| `style` | Object\|Array | - | Additional style |

### HeaderNav

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Navigation content (links, menu items) |
| `style` | Object\|Array | - | Additional style |

### HeaderMenuButton

| Prop | Type | Default | Description |
|---|---|---|---|
| `onPress` | Function | - | Press handler |
| `label` | String | - | Button label |
| `isActive` | Boolean | `false` | Whether the menu is currently open |
| `style` | Object\|Array | - | Additional style |

### HeaderPanel

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Panel content |
| `expanded` | Boolean | - | Whether the panel is visible |
| `style` | Object\|Array | - | Additional style |

### ProgressIndicator

| Prop | Type | Default | Description |
|---|---|---|---|
| `current` | Number | `0` | Current step (1-based) |
| `total` | Number | `0` | Total number of steps |
| `label` | String | - | Optional accessible label |
| `style` | Object\|Array | - | Additional style |

### Tabs

| Prop | Type | Default | Description |
|---|---|---|---|
| `selectedIndex` | Number | `0` | 0-based active tab index |
| `onChange` | Function | - | Called with new index |
| `children` | Node | - | Tab elements |
| `style` | Object\|Array | - | Additional style |

### Accordion

| Prop | Type | Default | Description |
|---|---|---|---|
| `allowMultiple` | Boolean | `false` | Allow multiple items expanded at once |
| `expandedKeys` | Array | `[]` | Keys of expanded items |
| `onChange` | Function | - | Called with key of toggled item |
| `children` | Node | - | AccordionItem elements |
| `style` | Object\|Array | - | Additional style |

### Breadcrumb

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | BreadcrumbItem elements |
| `style` | Object\|Array | - | Additional style |

### ContentSwitcher

| Prop | Type | Default | Description |
|---|---|---|---|
| `selectedIndex` | Number | `0` | 0-based active switch index |
| `onChange` | Function | - | Called with new index |
| `children` | Node | - | Switch elements |
| `style` | Object\|Array | - | Additional style |

### Pagination

| Prop | Type | Default | Description |
|---|---|---|---|
| `page` | Number | `1` | Current page (1-based) |
| `totalPage` | Number | `1` | Total number of pages |
| `onChange` | Function | - | Called with new page number |
| `pageSize` | Number | - | Items per page |
| `style` | Object\|Array | - | Additional style |

### TreeView

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | Array | `[]` | Array of `{ key, label, children, expanded, selected }` |
| `onSelect` | Function | - | Called with selected node key |
| `expandedKeys` | Array | `[]` | Keys of expanded nodes |
| `style` | Object\|Array | - | Additional style |

### Steps

| Prop | Type | Default | Description |
|---|---|---|---|
| `current` | Number | `0` | 1-based current step number |
| `children` | Node | - | Step elements |
| `style` | Object\|Array | - | Additional style |

### Header

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | HeaderNav, HeaderMenuButton, HeaderPanel elements |
| `style` | Object\|Array | - | Additional style |

### Select

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | - | Controlled value |
| `defaultValue` | String | - | Uncontrolled initial value |
| `onChange` | Function | - | Called with the selected value |
| `options` | Array | `[]` | Array of `{ value, label }` objects |
| `placeholder` | String | `'Select an option'` | Placeholder text |
| `disabled` | Boolean | `false` | Disabled state |
| `invalid` | Boolean | `false` | Invalid state |
| `style` | Object\|Array | - | Additional style |

### ComboBox

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | - | Controlled value |
| `defaultValue` | String | `''` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the selected value |
| `options` | Array | `[]` | Array of `{ value, label }` objects |
| `placeholder` | String | `'Search'` | Placeholder text |
| `disabled` | Boolean | `false` | Disabled state |
| `invalid` | Boolean | `false` | Invalid state |
| `style` | Object\|Array | - | Additional style |

### MultiSelect

| Prop | Type | Default | Description |
|---|---|---|---|
| `values` | Array | - | Controlled selected values |
| `defaultValues` | Array | `[]` | Uncontrolled initial values |
| `onChange` | Function | - | Called with the selected values array |
| `options` | Array | `[]` | Array of `{ value, label }` objects |
| `placeholder` | String | `'Select options'` | Placeholder text |
| `disabled` | Boolean | `false` | Disabled state |
| `invalid` | Boolean | `false` | Invalid state |
| `style` | Object\|Array | - | Additional style |

### RadioButtonGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | - | Controlled value |
| `defaultValue` | String | - | Uncontrolled initial value |
| `onChange` | Function | - | Called with the selected value |
| `options` | Array | `[]` | Array of `{ value, label, disabled }` objects |
| `disabled` | Boolean | `false` | Disables the entire group |
| `name` | String | - | Group name for form submission |
| `orientation` | String | `'vertical'` | `'horizontal'` or `'vertical'` |
| `style` | Object\|Array | - | Additional style |

### CheckboxGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| `values` | Array | - | Controlled selected values |
| `defaultValues` | Array | `[]` | Uncontrolled initial values |
| `onChange` | Function | - | Called with the selected values array |
| `options` | Array | `[]` | Array of `{ value, label, disabled }` objects |
| `disabled` | Boolean | `false` | Disables the entire group |
| `name` | String | - | Group name for form submission |
| `style` | Object\|Array | - | Additional style |

### SliderInput

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | String | - | Label text above the slider |
| `value` | Number | - | Controlled value |
| `defaultValue` | Number | `min` or `0` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the next number |
| `min` | Number | `0` | Minimum value |
| `max` | Number | `100` | Maximum value |
| `step` | Number | `1` | Step increment |
| `disabled` | Boolean | `false` | Disabled state |
| `invalid` | Boolean | `false` | Invalid state |
| `style` | Object\|Array | - | Additional style |

### DatePicker

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | - | Controlled value (`YYYY-MM-DD`) |
| `defaultValue` | String | `''` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the selected date string |
| `disabled` | Boolean | `false` | Disabled state |
| `invalid` | Boolean | `false` | Invalid state |
| `style` | Object\|Array | - | Additional style |

### TimePicker

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | - | Controlled value (`HH:MM`) |
| `defaultValue` | String | `''` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the selected time string |
| `disabled` | Boolean | `false` | Disabled state |
| `invalid` | Boolean | `false` | Invalid state |
| `style` | Object\|Array | - | Additional style |

### DateRangePicker

| Prop | Type | Default | Description |
|---|---|---|---|
| `startDate` | String | - | Start date (`YYYY-MM-DD`) |
| `endDate` | String | - | End date (`YYYY-MM-DD`) |
| `onChange` | Function | - | Called with `{ startDate, endDate }` |
| `disabled` | Boolean | `false` | Disabled state |
| `style` | Object\|Array | - | Additional style |

### NumberInputComposite

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | String | - | Label text above the input |
| `value` | Number | - | Controlled value |
| `defaultValue` | Number | `0` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the next number |
| `min` | Number | - | Minimum value |
| `max` | Number | - | Maximum value |
| `step` | Number | `1` | Step increment |
| `unit` | String | - | Optional unit suffix (e.g. `'px'`, `'%'`) |
| `disabled` | Boolean | `false` | Disabled state |
| `invalid` | Boolean | `false` | Invalid state |
| `style` | Object\|Array | - | Additional style |

### FileUploader

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | String | `'Upload file'` | Button text |
| `accept` | String | - | File type filter (e.g. `'image/*'`) |
| `multiple` | Boolean | `false` | Allow multiple file selection |
| `onChange` | Function | - | Called with the selected file(s) |
| `disabled` | Boolean | `false` | Disabled state |
| `style` | Object\|Array | - | Additional style |

### FluidForm

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Form content within the fluid context |
| `fluid` | Boolean | `true` | Pass `false` to opt out of fluid labels |
| `style` | Object\|Array | - | Additional style |

### FormGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Form field elements |
| `label` | String | - | Optional group label |
| `invalid` | Boolean | `false` | Shows message in danger color |
| `message` | String | - | Helper or error text shown below the group |
| `disabled` | Boolean | `false` | Dims the label |
| `style` | Object\|Array | - | Additional style |

### ToggleGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | - | Controlled pressed toggle value |
| `defaultValue` | String | - | Uncontrolled initial value |
| `onChange` | Function | - | Called with the selected value |
| `options` | Array | `[]` | Array of `{ value, label, disabled }` objects |
| `disabled` | Boolean | `false` | Disables the entire group |
| `orientation` | String | `'horizontal'` | `'horizontal'` or `'vertical'` |
| `style` | Object\|Array | - | Additional style |

### TimeInput

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | - | Controlled value (`HH:MM`) |
| `defaultValue` | String | `''` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the time string |
| `disabled` | Boolean | `false` | Disabled state |
| `invalid` | Boolean | `false` | Invalid state |
| `style` | Object\|Array | - | Additional style |

### DateInput

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | - | Controlled value (`YYYY-MM-DD`) |
| `defaultValue` | String | `''` | Uncontrolled initial value |
| `onChange` | Function | - | Called with the date string |
| `disabled` | Boolean | `false` | Disabled state |
| `invalid` | Boolean | `false` | Invalid state |
| `style` | Object\|Array | - | Additional style |

### Notification

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | String | - | Primary text |
| `subtitle` | String | - | Secondary text |
| `status` | String | `'info'` | `'success'`, `'error'`, `'warning'`, or `'info'` |
| `onClose` | Function | - | Close handler (when absent, no close button) |
| `children` | Node | - | Additional content |
| `style` | Object\|Array | - | Additional style |

### Toast

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | String | - | Primary text |
| `subtitle` | String | - | Secondary text |
| `status` | String | `'info'` | `'success'`, `'error'`, `'warning'`, or `'info'` |
| `onClose` | Function | - | Close handler (called on close or auto-dismiss) |
| `duration` | Number | `3000` | Milliseconds before auto-dismiss |
| `style` | Object\|Array | - | Additional style |

### ActionBar

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Action button elements |
| `style` | Object\|Array | - | Additional style |

### BatchAction

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | String | - | Button text |
| `onPress` | Function | - | Press handler |
| `disabled` | Boolean | `false` | Disabled state |
| `style` | Object\|Array | - | Additional style |

### Alert

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | String | - | Primary text |
| `kind` | String | `'info'` | `'info'`, `'success'`, `'warning'`, or `'error'` |
| `children` | Node | - | Additional content |
| `style` | Object\|Array | - | Additional style |

### Callout

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | String | - | Primary text |
| `kind` | String | `'info'` | `'info'`, `'success'`, `'warning'`, or `'error'` |
| `children` | Node | - | Additional content |
| `style` | Object\|Array | - | Additional style |

### DataTable

| Prop | Type | Default | Description |
|---|---|---|---|
| `headers` | Array | `[]` | Array of header strings |
| `rows` | Array | `[]` | Array of arrays (each inner array is a row of cell values) |
| `style` | Object\|Array | - | Additional style |

### TableRow

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Cell elements |
| `style` | Object\|Array | - | Additional style |

### TableCell

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Cell content |
| `style` | Object\|Array | - | Additional style |

### TableHeader

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Header content |
| `style` | Object\|Array | - | Additional style |

### TableBody

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Row elements |
| `style` | Object\|Array | - | Additional style |

### TableHead

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Header row elements |
| `style` | Object\|Array | - | Additional style |

### Grid

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Grid item elements |
| `columns` | Number | `2` | Number of columns |
| `gap` | Number | `0` | Gap in pixels between items |
| `style` | Object\|Array | - | Additional style |

### Row

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Content elements |
| `style` | Object\|Array | - | Additional style |

### Column

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Content elements |
| `style` | Object\|Array | - | Additional style |

### FlexGrid

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Grid item elements |
| `gap` | Number | `0` | Gap in pixels between items |
| `style` | Object\|Array | - | Additional style |

### Container

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Content elements |
| `maxWidth` | Number | `1200` | Maximum width in pixels |
| `style` | Object\|Array | - | Additional style |

### LayerMolecule

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Content elements |
| `level` | Number | `0` | Surface elevation level (`0`, `1`, or `2`) |
| `style` | Object\|Array | - | Additional style |

### Form

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Form field elements |
| `onSubmit` | Function | - | Submit handler function |
| `style` | Object\|Array | - | Additional style |

### Fieldset

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Form field elements |
| `legend` | String | - | Legend text |
| `style` | Object\|Array | - | Additional style |

### Legend

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Legend content |
| `style` | Object\|Array | - | Additional style |

### OrderedList

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | List item elements |
| `style` | Object\|Array | - | Additional style |

### UnorderedList

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | List item elements |
| `style` | Object\|Array | - | Additional style |

### ListItemNav

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | String | - | Primary text for the nav item |
| `onPress` | Function | - | Press handler |
| `children` | Node | - | Additional content |
| `style` | Object\|Array | - | Additional style |

### StructuredList

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Structured list row elements |
| `style` | Object\|Array | - | Additional style |

### StructuredListRow

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Cell elements |
| `style` | Object\|Array | - | Additional style |

### StructuredListCell

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Cell content |
| `style` | Object\|Array | - | Additional style |

### Toolbar

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Tool button elements |
| `style` | Object\|Array | - | Additional style |

### Divider

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | String | `'horizontal'` | `'horizontal'` or `'vertical'` |
| `style` | Object\|Array | - | Additional style |

### ScrollGradient

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Scrollable content |
| `style` | Object\|Array | - | Additional style |

### DataTableRow

| Prop | Type | Default | Description |
|---|---|---|---|
| `cells` | Array | `[]` | Array of cell values (strings or elements) |
| `onPress` | Function | - | Press handler (when absent, row is static) |
| `selected` | Boolean | `false` | Whether the row is selected |
| `style` | Object\|Array | - | Additional style |

### PaginationBar

| Prop | Type | Default | Description |
|---|---|---|---|
| `page` | Number | `1` | Current page (1-based) |
| `totalPage` | Number | `1` | Total number of pages |
| `onChange` | Function | - | Called with new page number |
| `style` | Object\|Array | - | Additional style |

### ToggletipLabel

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | String | - | Label text |
| `toggletipContent` | Node | - | Content to show in the toggletip |
| `children` | Node | - | Additional content |
| `style` | Object\|Array | - | Additional style |

### GridItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | Node | - | Grid item content |
| `span` | Number | `1` | Number of columns to span |
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

## Component Sections

<!-- BEGIN GENERATED: component-sections -->
### AILabel

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/aILabel.js` for the Info header and prop list.

### AILabelActions

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/aILabelActions.js` for the Info header and prop list.

### AILabelContent

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/aILabelContent.js` for the Info header and prop list.

### AISkeletonIcon

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/aISkeletonIcon.js` for the Info header and prop list.

### AISkeletonPlaceholder

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/aISkeletonPlaceholder.js` for the Info header and prop list.

### AISkeletonText

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/aISkeletonText.js` for the Info header and prop list.

### AcceptTerms

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/acceptTerms.js` for the Info header and prop list.

### Accordion

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/accordion.js` for the Info header and prop list.

### AccordionItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/accordionItem.js` for the Info header and prop list.

### ActionSheet

**Tier:** unknown | **Platform:** Split (web and native differ) | **Source:** carbon

See `component/unknown/actionSheet.js` for the Info header and prop list.

### ActionableNotification

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/actionableNotification.js` for the Info header and prop list.

### AspectRatio

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/aspectRatio.js` for the Info header and prop list.

### BadgeIndicator

**Tier:** unknown | **Platform:** Both web and native | **Source:** unexported

See `component/unknown/badgeIndicator.js` for the Info header and prop list.

### BottomNavigationBar

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/bottomNavigationBar.js` for the Info header and prop list.

### BottomSafeAreaColorOverride

**Tier:** unknown | **Platform:** Native primary (degrades on web) | **Source:** carbon

See `component/unknown/bottomSafeAreaColorOverride.js` for the Info header and prop list.

### BottomToolbar

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/bottomToolbar.js` for the Info header and prop list.

### BottomToolbarPrimaryAction

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/bottomToolbarPrimaryAction.js` for the Info header and prop list.

### Breadcrumb

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/breadcrumb.js` for the Info header and prop list.

### BreadcrumbItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/breadcrumbItem.js` for the Info header and prop list.

### Button

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/button.js` for the Info header and prop list.

### ButtonSet

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/buttonSet.js` for the Info header and prop list.

### Callout

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/callout.js` for the Info header and prop list.

### Checkbox

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/checkbox.js` for the Info header and prop list.

### CheckboxGroup

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/checkboxGroup.js` for the Info header and prop list.

### ClickableTile

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/clickableTile.js` for the Info header and prop list.

### CodeSnippet

**Tier:** unknown | **Platform:** Split (web and native differ) | **Source:** carbon

See `component/unknown/codeSnippet.js` for the Info header and prop list.

### Column

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/column.js` for the Info header and prop list.

### ColumnHang

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/columnHang.js` for the Info header and prop list.

### ComboBox

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/comboBox.js` for the Info header and prop list.

### ComboButton

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/comboButton.js` for the Info header and prop list.

### ComposedModal

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/composedModal.js` for the Info header and prop list.

### ContainedList

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/containedList.js` for the Info header and prop list.

### ContainedListItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/containedListItem.js` for the Info header and prop list.

### Content

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/content.js` for the Info header and prop list.

### ContentSwitcher

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/contentSwitcher.js` for the Info header and prop list.

### ControlledPasswordInput

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/controlledPasswordInput.js` for the Info header and prop list.

### Copy

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/copy.js` for the Info header and prop list.

### CopyButton

**Tier:** unknown | **Platform:** Split (web and native differ) | **Source:** carbon

See `component/unknown/copyButton.js` for the Info header and prop list.

### DataTable

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/dataTable.js` for the Info header and prop list.

### DataTableCell

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/dataTableCell.js` for the Info header and prop list.

### DataTableHeader

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/dataTableHeader.js` for the Info header and prop list.

### DataTableHeaderSelected

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/dataTableHeaderSelected.js` for the Info header and prop list.

### DataTableRow

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/dataTableRow.js` for the Info header and prop list.

### DateInput

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/dateInput.js` for the Info header and prop list.

### DatePicker

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/datePicker.js` for the Info header and prop list.

### DatePickerInput

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/datePickerInput.js` for the Info header and prop list.

### DefinitionTooltip

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/definitionTooltip.js` for the Info header and prop list.

### DismissibleTag

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/dismissibleTag.js` for the Info header and prop list.

### DocumentViewer

**Tier:** unknown | **Platform:** Split (web and native differ) | **Source:** carbon

See `component/unknown/documentViewer.js` for the Info header and prop list.

### Dropdown

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/dropdown.js` for the Info header and prop list.

### ErrorBoundary

**Tier:** provider | **Platform:** Both web and native | **Source:** carbon

See `component/provider/errorBoundary.js` for the Info header and prop list.

### ErrorBoundaryContext

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/errorBoundaryContext.js` for the Info header and prop list.

### ErrorState

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/errorState.js` for the Info header and prop list.

### ExpandableSearch

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/expandableSearch.js` for the Info header and prop list.

### ExpandableTile

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/expandableTile.js` for the Info header and prop list.

### FeatureFlags

**Tier:** provider | **Platform:** Both web and native | **Source:** unexported

See `component/provider/featureFlags.js` for the Info header and prop list.

### FileUploader

**Tier:** unknown | **Platform:** Split (web and native differ) | **Source:** carbon

See `component/unknown/fileUploader.js` for the Info header and prop list.

### FileUploaderButton

**Tier:** unknown | **Platform:** Split (web and native differ) | **Source:** carbon

See `component/unknown/fileUploaderButton.js` for the Info header and prop list.

### FileUploaderDropContainer

**Tier:** unknown | **Platform:** Split (web and native differ) | **Source:** carbon

See `component/unknown/fileUploaderDropContainer.js` for the Info header and prop list.

### FileUploaderItem

**Tier:** unknown | **Platform:** Split (web and native differ) | **Source:** carbon

See `component/unknown/fileUploaderItem.js` for the Info header and prop list.

### Filename

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/filename.js` for the Info header and prop list.

### FilterableMultiSelect

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/filterableMultiSelect.js` for the Info header and prop list.

### FlexGrid

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/flexGrid.js` for the Info header and prop list.

### FluidForm

**Tier:** provider | **Platform:** Both web and native | **Source:** non-carbon

See `component/provider/fluidForm.js` for the Info header and prop list.

### Form

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/form.js` for the Info header and prop list.

### FormContext

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/formContext.js` for the Info header and prop list.

### FormGroup

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/formGroup.js` for the Info header and prop list.

### FormItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/formItem.js` for the Info header and prop list.

### FormLabel

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/formLabel.js` for the Info header and prop list.

### GlobalTheme

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/globalTheme.js` for the Info header and prop list.

### GrantPermission

**Tier:** unknown | **Platform:** Native primary (degrades on web) | **Source:** carbon

See `component/unknown/grantPermission.js` for the Info header and prop list.

### Grid

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/grid.js` for the Info header and prop list.

### GridSettings

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/gridSettings.js` for the Info header and prop list.

### HStack

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/hStack.js` for the Info header and prop list.

### Header

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/header.js` for the Info header and prop list.

### HeaderContainer

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/headerContainer.js` for the Info header and prop list.

### HeaderGlobalAction

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/headerGlobalAction.js` for the Info header and prop list.

### HeaderGlobalBar

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/headerGlobalBar.js` for the Info header and prop list.

### HeaderMenu

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/headerMenu.js` for the Info header and prop list.

### HeaderMenuButton

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/headerMenuButton.js` for the Info header and prop list.

### HeaderMenuItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/headerMenuItem.js` for the Info header and prop list.

### HeaderName

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/headerName.js` for the Info header and prop list.

### HeaderNavigation

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/headerNavigation.js` for the Info header and prop list.

### HeaderPanel

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/headerPanel.js` for the Info header and prop list.

### HeaderSideNavItems

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/headerSideNavItems.js` for the Info header and prop list.

### Heading

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/heading.js` for the Info header and prop list.

### Icon

**Tier:** atom | **Platform:** Both web and native | **Source:** substrate

See `component/atom/icon.js` for the Info header and prop list.

### IconButton

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/iconButton.js` for the Info header and prop list.

### IconIndicator

**Tier:** unknown | **Platform:** Both web and native | **Source:** unexported

See `component/unknown/iconIndicator.js` for the Info header and prop list.

### IconSwitch

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/iconSwitch.js` for the Info header and prop list.

### IconTab

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/iconTab.js` for the Info header and prop list.

### IdPrefix

**Tier:** provider | **Platform:** Both web and native | **Source:** carbon

See `component/provider/idPrefix.js` for the Info header and prop list.

### Image

**Tier:** atom | **Platform:** Both web and native | **Source:** substrate

See `component/atom/image.js` for the Info header and prop list.

### InlineLink

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/inlineLink.js` for the Info header and prop list.

### InlineLoading

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/inlineLoading.js` for the Info header and prop list.

### InlineNotification

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/inlineNotification.js` for the Info header and prop list.

### LandingView

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/landingView.js` for the Info header and prop list.

### Layer

**Tier:** provider | **Platform:** Both web and native | **Source:** carbon

See `component/provider/layer.js` for the Info header and prop list.

### Link

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/link.js` for the Info header and prop list.

### List

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/list.js` for the Info header and prop list.

### ListItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/listItem.js` for the Info header and prop list.

### LiveRegionProvider

**Tier:** provider | **Platform:** Both web and native | **Source:** infrastructure

See `component/provider/liveRegionProvider.js` for the Info header and prop list.

### Loading

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/loading.js` for the Info header and prop list.

### Menu

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/menu.js` for the Info header and prop list.

### MenuButton

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/menuButton.js` for the Info header and prop list.

### MenuItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/menuItem.js` for the Info header and prop list.

### MenuItemDivider

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/menuItemDivider.js` for the Info header and prop list.

### MenuItemGroup

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/menuItemGroup.js` for the Info header and prop list.

### MenuItemRadioGroup

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/menuItemRadioGroup.js` for the Info header and prop list.

### MenuItemSelectable

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/menuItemSelectable.js` for the Info header and prop list.

### Modal

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/modal.js` for the Info header and prop list.

### ModalBody

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/modalBody.js` for the Info header and prop list.

### ModalFooter

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/modalFooter.js` for the Info header and prop list.

### ModalHeader

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/modalHeader.js` for the Info header and prop list.

### MultiSelect

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/multiSelect.js` for the Info header and prop list.

### NavigationList

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/navigationList.js` for the Info header and prop list.

### NavigationListItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/navigationListItem.js` for the Info header and prop list.

### Notification

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/notification.js` for the Info header and prop list.

### NotificationActionButton

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/notificationActionButton.js` for the Info header and prop list.

### NotificationButton

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/notificationButton.js` for the Info header and prop list.

### NumberInput

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/numberInput.js` for the Info header and prop list.

### OperationalTag

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/operationalTag.js` for the Info header and prop list.

### OrderedList

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/orderedList.js` for the Info header and prop list.

### OverflowMenu

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/overflowMenu.js` for the Info header and prop list.

### OverflowMenuItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/overflowMenuItem.js` for the Info header and prop list.

### Overlay

**Tier:** provider | **Platform:** Split (web and native differ) | **Source:** carbon

See `component/provider/overlay.js` for the Info header and prop list.

### Pagination

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/pagination.js` for the Info header and prop list.

### PaginationNav

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/paginationNav.js` for the Info header and prop list.

### PasswordInput

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/passwordInput.js` for the Info header and prop list.

### Popover

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/popover.js` for the Info header and prop list.

### PopoverContent

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/popoverContent.js` for the Info header and prop list.

### PrefixContext

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/prefixContext.js` for the Info header and prop list.

### ProgressBar

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/progressBar.js` for the Info header and prop list.

### ProgressIndicator

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/progressIndicator.js` for the Info header and prop list.

### ProgressStep

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/progressStep.js` for the Info header and prop list.

### RadioButton

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/radioButton.js` for the Info header and prop list.

### RadioButtonGroup

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/radioButtonGroup.js` for the Info header and prop list.

### RadioTile

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/radioTile.js` for the Info header and prop list.

### Row

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/row.js` for the Info header and prop list.

### SafeAreaWrapper

**Tier:** unknown | **Platform:** Native primary (degrades on web) | **Source:** carbon

See `component/unknown/safeAreaWrapper.js` for the Info header and prop list.

### Search

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/search.js` for the Info header and prop list.

### Section

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/section.js` for the Info header and prop list.

### Select

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/select.js` for the Info header and prop list.

### SelectItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/selectItem.js` for the Info header and prop list.

### SelectItemGroup

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/selectItemGroup.js` for the Info header and prop list.

### SelectableTag

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/selectableTag.js` for the Info header and prop list.

### SelectableTile

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/selectableTile.js` for the Info header and prop list.

### ShapeIndicator

**Tier:** unknown | **Platform:** Both web and native | **Source:** unexported

See `component/unknown/shapeIndicator.js` for the Info header and prop list.

### SideNav

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNav.js` for the Info header and prop list.

### SideNavDetails

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNavDetails.js` for the Info header and prop list.

### SideNavDivider

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNavDivider.js` for the Info header and prop list.

### SideNavFooter

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNavFooter.js` for the Info header and prop list.

### SideNavHeader

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNavHeader.js` for the Info header and prop list.

### SideNavIcon

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNavIcon.js` for the Info header and prop list.

### SideNavItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNavItem.js` for the Info header and prop list.

### SideNavItems

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNavItems.js` for the Info header and prop list.

### SideNavLink

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNavLink.js` for the Info header and prop list.

### SideNavLinkText

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNavLinkText.js` for the Info header and prop list.

### SideNavMenu

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNavMenu.js` for the Info header and prop list.

### SideNavMenuItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNavMenuItem.js` for the Info header and prop list.

### SideNavSwitcher

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/sideNavSwitcher.js` for the Info header and prop list.

### SidePanel

**Tier:** unknown | **Platform:** Both web and native | **Source:** unexported

See `component/unknown/sidePanel.js` for the Info header and prop list.

### Skeleton

**Tier:** unknown | **Platform:** Both web and native | **Source:** collapse

See `component/unknown/skeleton.js` for the Info header and prop list.

### SkeletonIcon

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/skeletonIcon.js` for the Info header and prop list.

### SkeletonPlaceholder

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/skeletonPlaceholder.js` for the Info header and prop list.

### SkeletonText

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/skeletonText.js` for the Info header and prop list.

### SkipToContent

**Tier:** unknown | **Platform:** Web primary (null on native) | **Source:** carbon

See `component/unknown/skipToContent.js` for the Info header and prop list.

### Slider

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/slider.js` for the Info header and prop list.

### Stack

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/stack.js` for the Info header and prop list.

### StaticNotification

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/staticNotification.js` for the Info header and prop list.

### StructuredListBody

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/structuredListBody.js` for the Info header and prop list.

### StructuredListCell

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/structuredListCell.js` for the Info header and prop list.

### StructuredListHead

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/structuredListHead.js` for the Info header and prop list.

### StructuredListInput

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/structuredListInput.js` for the Info header and prop list.

### StructuredListRow

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/structuredListRow.js` for the Info header and prop list.

### StructuredListWrapper

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/structuredListWrapper.js` for the Info header and prop list.

### Switch

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/switch.js` for the Info header and prop list.

### Switcher

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/switcher.js` for the Info header and prop list.

### SwitcherDivider

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/switcherDivider.js` for the Info header and prop list.

### SwitcherItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/switcherItem.js` for the Info header and prop list.

### Tab

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tab.js` for the Info header and prop list.

### TabContent

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tabContent.js` for the Info header and prop list.

### TabList

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tabList.js` for the Info header and prop list.

### TabListVertical

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tabListVertical.js` for the Info header and prop list.

### TabPanel

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tabPanel.js` for the Info header and prop list.

### TabPanels

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tabPanels.js` for the Info header and prop list.

### Table

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/table.js` for the Info header and prop list.

### TableActionList

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableActionList.js` for the Info header and prop list.

### TableBatchAction

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableBatchAction.js` for the Info header and prop list.

### TableBatchActions

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableBatchActions.js` for the Info header and prop list.

### TableBody

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableBody.js` for the Info header and prop list.

### TableCell

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableCell.js` for the Info header and prop list.

### TableContainer

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableContainer.js` for the Info header and prop list.

### TableDecoratorRow

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableDecoratorRow.js` for the Info header and prop list.

### TableExpandHeader

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableExpandHeader.js` for the Info header and prop list.

### TableExpandRow

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableExpandRow.js` for the Info header and prop list.

### TableExpandedRow

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableExpandedRow.js` for the Info header and prop list.

### TableHead

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableHead.js` for the Info header and prop list.

### TableHeader

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableHeader.js` for the Info header and prop list.

### TableRow

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableRow.js` for the Info header and prop list.

### TableSelectAll

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableSelectAll.js` for the Info header and prop list.

### TableSelectRow

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableSelectRow.js` for the Info header and prop list.

### TableSlugRow

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableSlugRow.js` for the Info header and prop list.

### TableToolbar

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableToolbar.js` for the Info header and prop list.

### TableToolbarAction

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableToolbarAction.js` for the Info header and prop list.

### TableToolbarContent

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableToolbarContent.js` for the Info header and prop list.

### TableToolbarMenu

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableToolbarMenu.js` for the Info header and prop list.

### TableToolbarSearch

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tableToolbarSearch.js` for the Info header and prop list.

### Tabs

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tabs.js` for the Info header and prop list.

### TabsVertical

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tabsVertical.js` for the Info header and prop list.

### Tag

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tag.js` for the Info header and prop list.

### Text

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/text.js` for the Info header and prop list.

### TextArea

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/textArea.js` for the Info header and prop list.

### TextInput

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/textInput.js` for the Info header and prop list.

### Theme

**Tier:** provider | **Platform:** Both web and native | **Source:** carbon

See `component/provider/theme.js` for the Info header and prop list.

### ThemeContext

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/themeContext.js` for the Info header and prop list.

### Tile

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tile.js` for the Info header and prop list.

### TileAboveTheFoldContent

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tileAboveTheFoldContent.js` for the Info header and prop list.

### TileBelowTheFoldContent

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tileBelowTheFoldContent.js` for the Info header and prop list.

### TileGroup

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tileGroup.js` for the Info header and prop list.

### TimePicker

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/timePicker.js` for the Info header and prop list.

### TimePickerSelect

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/timePickerSelect.js` for the Info header and prop list.

### ToastNotification

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/toastNotification.js` for the Info header and prop list.

### Toggle

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/toggle.js` for the Info header and prop list.

### Toggletip

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/toggletip.js` for the Info header and prop list.

### ToggletipActions

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/toggletipActions.js` for the Info header and prop list.

### ToggletipButton

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/toggletipButton.js` for the Info header and prop list.

### ToggletipContent

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/toggletipContent.js` for the Info header and prop list.

### ToggletipLabel

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/toggletipLabel.js` for the Info header and prop list.

### Tooltip

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/tooltip.js` for the Info header and prop list.

### TopNavigationBar

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/topNavigationBar.js` for the Info header and prop list.

### TopNavigationBarLogin

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/topNavigationBarLogin.js` for the Info header and prop list.

### TreeNode

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/treeNode.js` for the Info header and prop list.

### TreeView

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/treeView.js` for the Info header and prop list.

### TruncatedText

**Tier:** unknown | **Platform:** Both web and native | **Source:** unexported

See `component/unknown/truncatedText.js` for the Info header and prop list.

### UiPanel

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/uiPanel.js` for the Info header and prop list.

### UiPanelItem

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/uiPanelItem.js` for the Info header and prop list.

### UnorderedList

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/unorderedList.js` for the Info header and prop list.

### UserAvatar

**Tier:** unknown | **Platform:** Both web and native | **Source:** unexported

See `component/unknown/userAvatar.js` for the Info header and prop list.

### VStack

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/vStack.js` for the Info header and prop list.

### View

**Tier:** atom | **Platform:** Both web and native | **Source:** substrate

See `component/atom/view.js` for the Info header and prop list.

### ViewWrapper

**Tier:** unknown | **Platform:** Native primary (degrades on web) | **Source:** carbon

See `component/unknown/viewWrapper.js` for the Info header and prop list.

### WebHeader

**Tier:** unknown | **Platform:** Both web and native | **Source:** carbon

See `component/unknown/webHeader.js` for the Info header and prop list.

<!-- END GENERATED: component-sections -->
