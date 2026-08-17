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
| `kind` | String | - | `primary` \| `secondary` \| `danger` \| `ghost` (overrides `background`) |
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

Eight shared mechanisms live in `parts/` and are used across all components.

### a11y (M1)

The single translator from semantic state to `aria-*` props. The only module allowed to emit accessibility state/value/relation/position props.

```javascript
import a11yPart from './parts/a11y.js';
const a11y = a11yPart({ React: React, Utils: Utils, Debug: Debug }, {}, {});
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

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/aILabel.js` for the Info header and prop list.

### AILabelActions

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/aILabelActions.js` for the Info header and prop list.

### AILabelContent

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/aILabelContent.js` for the Info header and prop list.

### AISkeletonIcon

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/aISkeletonIcon.js` for the Info header and prop list.

### AISkeletonPlaceholder

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/aISkeletonPlaceholder.js` for the Info header and prop list.

### AISkeletonText

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/aISkeletonText.js` for the Info header and prop list.

### AcceptTerms

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/acceptTerms.js` for the Info header and prop list.

### Accordion

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/accordion.js` for the Info header and prop list.

### AccordionItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/accordionItem.js` for the Info header and prop list.

### ActionSheet

**Tier:** composite | **Platform:** Split (web and native differ) | **Source:** non-carbon

See `component/composite/actionSheet.js` for the Info header and prop list.

### ActionableNotification

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/actionableNotification.js` for the Info header and prop list.

### AspectRatio

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/aspectRatio.js` for the Info header and prop list.

### BadgeIndicator

**Tier:** atom | **Platform:** Both web and native | **Source:** unexported

See `component/atom/badgeIndicator.js` for the Info header and prop list.

### BottomNavigationBar

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/bottomNavigationBar.js` for the Info header and prop list.

### BottomSafeAreaColorOverride

**Tier:** molecule | **Platform:** Native primary (degrades on web) | **Source:** non-carbon

See `component/molecule/bottomSafeAreaColorOverride.js` for the Info header and prop list.

### BottomToolbar

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/bottomToolbar.js` for the Info header and prop list.

### BottomToolbarPrimaryAction

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/bottomToolbarPrimaryAction.js` for the Info header and prop list.

### Breadcrumb

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/breadcrumb.js` for the Info header and prop list.

### BreadcrumbItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/breadcrumbItem.js` for the Info header and prop list.

### Button

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/button.js` for the Info header and prop list.

### ButtonSet

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/buttonSet.js` for the Info header and prop list.

### Callout

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/callout.js` for the Info header and prop list.

### Checkbox

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/checkbox.js` for the Info header and prop list.

### CheckboxGroup

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/checkboxGroup.js` for the Info header and prop list.

### ClickableTile

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/clickableTile.js` for the Info header and prop list.

### CodeSnippet

**Tier:** molecule | **Platform:** Split (web and native differ) | **Source:** non-carbon

See `component/molecule/codeSnippet.js` for the Info header and prop list.

### Column

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/column.js` for the Info header and prop list.

### ColumnHang

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/columnHang.js` for the Info header and prop list.

### ComboBox

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/comboBox.js` for the Info header and prop list.

### ComboButton

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/comboButton.js` for the Info header and prop list.

### ComposedModal

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/composedModal.js` for the Info header and prop list.

### ContainedList

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/containedList.js` for the Info header and prop list.

### ContainedListItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/containedListItem.js` for the Info header and prop list.

### Content

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/content.js` for the Info header and prop list.

### ContentSwitcher

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/contentSwitcher.js` for the Info header and prop list.

### ControlledPasswordInput

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/controlledPasswordInput.js` for the Info header and prop list.

### Copy

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/copy.js` for the Info header and prop list.

### CopyButton

**Tier:** molecule | **Platform:** Split (web and native differ) | **Source:** non-carbon

See `component/molecule/copyButton.js` for the Info header and prop list.

### DataTable

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/dataTable.js` for the Info header and prop list.

### DataTableCell

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/dataTableCell.js` for the Info header and prop list.

### DataTableHeader

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/dataTableHeader.js` for the Info header and prop list.

### DataTableHeaderSelected

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/dataTableHeaderSelected.js` for the Info header and prop list.

### DataTableRow

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/dataTableRow.js` for the Info header and prop list.

### DateInput

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/dateInput.js` for the Info header and prop list.

### DatePicker

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/datePicker.js` for the Info header and prop list.

### DatePickerInput

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/datePickerInput.js` for the Info header and prop list.

### DefinitionTooltip

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/definitionTooltip.js` for the Info header and prop list.

### DismissibleTag

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/dismissibleTag.js` for the Info header and prop list.

### DocumentViewer

**Tier:** molecule | **Platform:** Split (web and native differ) | **Source:** non-carbon

See `component/molecule/documentViewer.js` for the Info header and prop list.

### Dropdown

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/dropdown.js` for the Info header and prop list.

### ErrorBoundary

**Tier:** provider | **Platform:** Both web and native | **Source:** non-carbon

See `component/provider/errorBoundary.js` for the Info header and prop list.

### ErrorBoundaryContext

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/errorBoundaryContext.js` for the Info header and prop list.

### ErrorState

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/errorState.js` for the Info header and prop list.

### ExpandableSearch

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/expandableSearch.js` for the Info header and prop list.

### ExpandableTile

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/expandableTile.js` for the Info header and prop list.

### FeatureFlags

**Tier:** provider | **Platform:** Both web and native | **Source:** unexported

See `component/provider/featureFlags.js` for the Info header and prop list.

### FileUploader

**Tier:** composite | **Platform:** Split (web and native differ) | **Source:** non-carbon

See `component/composite/fileUploader.js` for the Info header and prop list.

### FileUploaderButton

**Tier:** molecule | **Platform:** Split (web and native differ) | **Source:** non-carbon

See `component/molecule/fileUploaderButton.js` for the Info header and prop list.

### FileUploaderDropContainer

**Tier:** molecule | **Platform:** Split (web and native differ) | **Source:** non-carbon

See `component/molecule/fileUploaderDropContainer.js` for the Info header and prop list.

### FileUploaderItem

**Tier:** molecule | **Platform:** Split (web and native differ) | **Source:** non-carbon

See `component/molecule/fileUploaderItem.js` for the Info header and prop list.

### Filename

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/filename.js` for the Info header and prop list.

### FilterableMultiSelect

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/filterableMultiSelect.js` for the Info header and prop list.

### FlexGrid

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/flexGrid.js` for the Info header and prop list.

### FluidForm

**Tier:** provider | **Platform:** Both web and native | **Source:** non-carbon

See `component/provider/fluidForm.js` for the Info header and prop list.

### Form

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/form.js` for the Info header and prop list.

### FormContext

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/formContext.js` for the Info header and prop list.

### FormGroup

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/formGroup.js` for the Info header and prop list.

### FormItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/formItem.js` for the Info header and prop list.

### FormLabel

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/formLabel.js` for the Info header and prop list.

### GlobalTheme

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/globalTheme.js` for the Info header and prop list.

### GrantPermission

**Tier:** molecule | **Platform:** Native primary (degrades on web) | **Source:** non-carbon

See `component/molecule/grantPermission.js` for the Info header and prop list.

### Grid

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/grid.js` for the Info header and prop list.

### GridSettings

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/gridSettings.js` for the Info header and prop list.

### HStack

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/hStack.js` for the Info header and prop list.

### Header

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/header.js` for the Info header and prop list.

### HeaderContainer

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/headerContainer.js` for the Info header and prop list.

### HeaderGlobalAction

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/headerGlobalAction.js` for the Info header and prop list.

### HeaderGlobalBar

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/headerGlobalBar.js` for the Info header and prop list.

### HeaderMenu

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/headerMenu.js` for the Info header and prop list.

### HeaderMenuButton

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/headerMenuButton.js` for the Info header and prop list.

### HeaderMenuItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/headerMenuItem.js` for the Info header and prop list.

### HeaderName

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/headerName.js` for the Info header and prop list.

### HeaderNavigation

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/headerNavigation.js` for the Info header and prop list.

### HeaderPanel

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/headerPanel.js` for the Info header and prop list.

### HeaderSideNavItems

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/headerSideNavItems.js` for the Info header and prop list.

### Heading

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/heading.js` for the Info header and prop list.

### Icon

**Tier:** atom | **Platform:** Both web and native | **Source:** substrate

See `component/atom/icon.js` for the Info header and prop list.

### IconButton

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/iconButton.js` for the Info header and prop list.

### IconIndicator

**Tier:** atom | **Platform:** Both web and native | **Source:** unexported

See `component/atom/iconIndicator.js` for the Info header and prop list.

### IconSwitch

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/iconSwitch.js` for the Info header and prop list.

### IconTab

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/iconTab.js` for the Info header and prop list.

### IdPrefix

**Tier:** provider | **Platform:** Both web and native | **Source:** non-carbon

See `component/provider/idPrefix.js` for the Info header and prop list.

### Image

**Tier:** atom | **Platform:** Both web and native | **Source:** substrate

See `component/atom/image.js` for the Info header and prop list.

### InlineLink

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/inlineLink.js` for the Info header and prop list.

### InlineLoading

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/inlineLoading.js` for the Info header and prop list.

### InlineNotification

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/inlineNotification.js` for the Info header and prop list.

### LandingView

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/landingView.js` for the Info header and prop list.

### Layer

**Tier:** provider | **Platform:** Both web and native | **Source:** non-carbon

See `component/provider/layer.js` for the Info header and prop list.

### Link

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/link.js` for the Info header and prop list.

### List

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/list.js` for the Info header and prop list.

### ListItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/listItem.js` for the Info header and prop list.

### LiveRegionProvider

**Tier:** provider | **Platform:** Both web and native | **Source:** infrastructure

See `component/provider/liveRegionProvider.js` for the Info header and prop list.

### Loading

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/loading.js` for the Info header and prop list.

### Menu

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/menu.js` for the Info header and prop list.

### MenuButton

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/menuButton.js` for the Info header and prop list.

### MenuItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/menuItem.js` for the Info header and prop list.

### MenuItemDivider

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/menuItemDivider.js` for the Info header and prop list.

### MenuItemGroup

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/menuItemGroup.js` for the Info header and prop list.

### MenuItemRadioGroup

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/menuItemRadioGroup.js` for the Info header and prop list.

### MenuItemSelectable

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/menuItemSelectable.js` for the Info header and prop list.

### Modal

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/modal.js` for the Info header and prop list.

### ModalBody

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/modalBody.js` for the Info header and prop list.

### ModalFooter

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/modalFooter.js` for the Info header and prop list.

### ModalHeader

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/modalHeader.js` for the Info header and prop list.

### MultiSelect

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/multiSelect.js` for the Info header and prop list.

### NavigationList

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/navigationList.js` for the Info header and prop list.

### NavigationListItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/navigationListItem.js` for the Info header and prop list.

### Notification

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/notification.js` for the Info header and prop list.

### NotificationActionButton

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/notificationActionButton.js` for the Info header and prop list.

### NotificationButton

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/notificationButton.js` for the Info header and prop list.

### NumberInput

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/numberInput.js` for the Info header and prop list.

### OperationalTag

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/operationalTag.js` for the Info header and prop list.

### OrderedList

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/orderedList.js` for the Info header and prop list.

### OverflowMenu

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/overflowMenu.js` for the Info header and prop list.

### OverflowMenuItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/overflowMenuItem.js` for the Info header and prop list.

### Overlay

**Tier:** provider | **Platform:** Split (web and native differ) | **Source:** non-carbon

See `component/provider/overlay.js` for the Info header and prop list.

### Pagination

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/pagination.js` for the Info header and prop list.

### PaginationNav

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/paginationNav.js` for the Info header and prop list.

### PasswordInput

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/passwordInput.js` for the Info header and prop list.

### Popover

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/popover.js` for the Info header and prop list.

### PopoverContent

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/popoverContent.js` for the Info header and prop list.

### PrefixContext

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/prefixContext.js` for the Info header and prop list.

### ProgressBar

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/progressBar.js` for the Info header and prop list.

### ProgressIndicator

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/progressIndicator.js` for the Info header and prop list.

### ProgressStep

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/progressStep.js` for the Info header and prop list.

### RadioButton

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/radioButton.js` for the Info header and prop list.

### RadioButtonGroup

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/radioButtonGroup.js` for the Info header and prop list.

### RadioTile

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/radioTile.js` for the Info header and prop list.

### Row

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/row.js` for the Info header and prop list.

### SafeAreaWrapper

**Tier:** molecule | **Platform:** Native primary (degrades on web) | **Source:** non-carbon

See `component/molecule/safeAreaWrapper.js` for the Info header and prop list.

### Search

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/search.js` for the Info header and prop list.

### Section

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/section.js` for the Info header and prop list.

### Select

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/select.js` for the Info header and prop list.

### SelectItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/selectItem.js` for the Info header and prop list.

### SelectItemGroup

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/selectItemGroup.js` for the Info header and prop list.

### SelectableTag

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/selectableTag.js` for the Info header and prop list.

### SelectableTile

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/selectableTile.js` for the Info header and prop list.

### ShapeIndicator

**Tier:** atom | **Platform:** Both web and native | **Source:** unexported

See `component/atom/shapeIndicator.js` for the Info header and prop list.

### SideNav

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNav.js` for the Info header and prop list.

### SideNavDetails

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNavDetails.js` for the Info header and prop list.

### SideNavDivider

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNavDivider.js` for the Info header and prop list.

### SideNavFooter

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNavFooter.js` for the Info header and prop list.

### SideNavHeader

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNavHeader.js` for the Info header and prop list.

### SideNavIcon

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNavIcon.js` for the Info header and prop list.

### SideNavItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNavItem.js` for the Info header and prop list.

### SideNavItems

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNavItems.js` for the Info header and prop list.

### SideNavLink

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNavLink.js` for the Info header and prop list.

### SideNavLinkText

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNavLinkText.js` for the Info header and prop list.

### SideNavMenu

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNavMenu.js` for the Info header and prop list.

### SideNavMenuItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNavMenuItem.js` for the Info header and prop list.

### SideNavSwitcher

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/sideNavSwitcher.js` for the Info header and prop list.

### SidePanel

**Tier:** composite | **Platform:** Both web and native | **Source:** unexported

See `component/composite/sidePanel.js` for the Info header and prop list.

### Skeleton

**Tier:** atom | **Platform:** Both web and native | **Source:** collapse

See `component/atom/skeleton.js` for the Info header and prop list.

### SkeletonIcon

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/skeletonIcon.js` for the Info header and prop list.

### SkeletonPlaceholder

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/skeletonPlaceholder.js` for the Info header and prop list.

### SkeletonText

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/skeletonText.js` for the Info header and prop list.

### SkipToContent

**Tier:** molecule | **Platform:** Web primary (null on native) | **Source:** non-carbon

See `component/molecule/skipToContent.js` for the Info header and prop list.

### Slider

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/slider.js` for the Info header and prop list.

### Stack

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/stack.js` for the Info header and prop list.

### StaticNotification

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/staticNotification.js` for the Info header and prop list.

### StructuredListBody

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/structuredListBody.js` for the Info header and prop list.

### StructuredListCell

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/structuredListCell.js` for the Info header and prop list.

### StructuredListHead

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/structuredListHead.js` for the Info header and prop list.

### StructuredListInput

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/structuredListInput.js` for the Info header and prop list.

### StructuredListRow

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/structuredListRow.js` for the Info header and prop list.

### StructuredListWrapper

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/structuredListWrapper.js` for the Info header and prop list.

### Switch

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/switch.js` for the Info header and prop list.

### Switcher

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/switcher.js` for the Info header and prop list.

### SwitcherDivider

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/switcherDivider.js` for the Info header and prop list.

### SwitcherItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/switcherItem.js` for the Info header and prop list.

### Tab

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tab.js` for the Info header and prop list.

### TabContent

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tabContent.js` for the Info header and prop list.

### TabList

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tabList.js` for the Info header and prop list.

### TabListVertical

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tabListVertical.js` for the Info header and prop list.

### TabPanel

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tabPanel.js` for the Info header and prop list.

### TabPanels

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tabPanels.js` for the Info header and prop list.

### Table

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/table.js` for the Info header and prop list.

### TableActionList

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableActionList.js` for the Info header and prop list.

### TableBatchAction

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableBatchAction.js` for the Info header and prop list.

### TableBatchActions

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableBatchActions.js` for the Info header and prop list.

### TableBody

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableBody.js` for the Info header and prop list.

### TableCell

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableCell.js` for the Info header and prop list.

### TableContainer

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableContainer.js` for the Info header and prop list.

### TableDecoratorRow

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableDecoratorRow.js` for the Info header and prop list.

### TableExpandHeader

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableExpandHeader.js` for the Info header and prop list.

### TableExpandRow

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableExpandRow.js` for the Info header and prop list.

### TableExpandedRow

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableExpandedRow.js` for the Info header and prop list.

### TableHead

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableHead.js` for the Info header and prop list.

### TableHeader

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableHeader.js` for the Info header and prop list.

### TableRow

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableRow.js` for the Info header and prop list.

### TableSelectAll

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableSelectAll.js` for the Info header and prop list.

### TableSelectRow

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableSelectRow.js` for the Info header and prop list.

### TableSlugRow

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableSlugRow.js` for the Info header and prop list.

### TableToolbar

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableToolbar.js` for the Info header and prop list.

### TableToolbarAction

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableToolbarAction.js` for the Info header and prop list.

### TableToolbarContent

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableToolbarContent.js` for the Info header and prop list.

### TableToolbarMenu

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableToolbarMenu.js` for the Info header and prop list.

### TableToolbarSearch

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tableToolbarSearch.js` for the Info header and prop list.

### Tabs

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/tabs.js` for the Info header and prop list.

### TabsVertical

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/tabsVertical.js` for the Info header and prop list.

### Tag

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/tag.js` for the Info header and prop list.

### Text

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/text.js` for the Info header and prop list.

### TextArea

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/textArea.js` for the Info header and prop list.

### TextInput

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/textInput.js` for the Info header and prop list.

### Theme

**Tier:** provider | **Platform:** Both web and native | **Source:** non-carbon

See `component/provider/theme.js` for the Info header and prop list.

### ThemeContext

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/themeContext.js` for the Info header and prop list.

### Tile

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tile.js` for the Info header and prop list.

### TileAboveTheFoldContent

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tileAboveTheFoldContent.js` for the Info header and prop list.

### TileBelowTheFoldContent

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tileBelowTheFoldContent.js` for the Info header and prop list.

### TileGroup

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tileGroup.js` for the Info header and prop list.

### TimePicker

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/timePicker.js` for the Info header and prop list.

### TimePickerSelect

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/timePickerSelect.js` for the Info header and prop list.

### ToastNotification

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/toastNotification.js` for the Info header and prop list.

### Toggle

**Tier:** atom | **Platform:** Both web and native | **Source:** non-carbon

See `component/atom/toggle.js` for the Info header and prop list.

### Toggletip

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/toggletip.js` for the Info header and prop list.

### ToggletipActions

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/toggletipActions.js` for the Info header and prop list.

### ToggletipButton

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/toggletipButton.js` for the Info header and prop list.

### ToggletipContent

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/toggletipContent.js` for the Info header and prop list.

### ToggletipLabel

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/toggletipLabel.js` for the Info header and prop list.

### Tooltip

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/tooltip.js` for the Info header and prop list.

### TopNavigationBar

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/topNavigationBar.js` for the Info header and prop list.

### TopNavigationBarLogin

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/topNavigationBarLogin.js` for the Info header and prop list.

### TreeNode

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/treeNode.js` for the Info header and prop list.

### TreeView

**Tier:** composite | **Platform:** Both web and native | **Source:** non-carbon

See `component/composite/treeView.js` for the Info header and prop list.

### TruncatedText

**Tier:** molecule | **Platform:** Both web and native | **Source:** unexported

See `component/molecule/truncatedText.js` for the Info header and prop list.

### UiPanel

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/uiPanel.js` for the Info header and prop list.

### UiPanelItem

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/uiPanelItem.js` for the Info header and prop list.

### UnorderedList

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/unorderedList.js` for the Info header and prop list.

### UserAvatar

**Tier:** molecule | **Platform:** Both web and native | **Source:** unexported

See `component/molecule/userAvatar.js` for the Info header and prop list.

### VStack

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/vStack.js` for the Info header and prop list.

### View

**Tier:** atom | **Platform:** Both web and native | **Source:** substrate

See `component/atom/view.js` for the Info header and prop list.

### ViewWrapper

**Tier:** molecule | **Platform:** Native primary (degrades on web) | **Source:** non-carbon

See `component/molecule/viewWrapper.js` for the Info header and prop list.

### WebHeader

**Tier:** molecule | **Platform:** Both web and native | **Source:** non-carbon

See `component/molecule/webHeader.js` for the Info header and prop list.

<!-- END GENERATED: component-sections -->
