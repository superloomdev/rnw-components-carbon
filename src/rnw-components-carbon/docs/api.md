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

## Component Count

The library ships 136 flat component keys (23 atoms + 89 molecules + 24 composites) plus 1 variant, 1 freeform, and 8 providers, totaling 146 named components. Waves 6-9 add 71 new components covering navigation, form composites, feedback, and data/layout.
