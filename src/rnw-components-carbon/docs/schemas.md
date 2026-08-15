# Theme Contract Schema

The theme contract is the shape the component library consumes. It is produced by `Components.themeContract(themer_output)` or assembled manually.

## Top-Level Shape

```javascript
{
  Color: { ... },
  Dimension: { ... },
  Font: { ... },
  Breakpoint: { ... }
}
```

## Color Group

Flat map of `SCREAMING_SNAKE_CASE` color tokens to hex strings.

| Token | Required | Description |
|---|---|---|
| `APP_PRIMARY` | Yes | Primary brand color |
| `APP_PRIMARY_HOVERED` | No | Hovered state (web) |
| `APP_PRIMARY_PRESSED` | No | Pressed state |
| `APP_PRIMARY_DISABLED` | No | Disabled state |
| `APP_PRIMARY_SUBTLE` | No | Subtle tint background |
| `TEXT_PRIMARY` | Yes | Primary text color |
| `TEXT_SECONDARY` | No | Secondary text color |
| `TEXT_MUTED` | Yes | Muted text and placeholder color |
| `TEXT_ON_PRIMARY` | No | Auto-contrast text on primary |
| `BACKGROUND_PRIMARY` | No | Primary background |
| `BACKGROUND_SECONDARY` | No | Secondary background |
| `SURFACE` | Yes | Card/surface background |
| `BORDER` | Yes | Default border color |
| `STATUS_SUCCESS` | No | Success state |
| `STATUS_SUCCESS_SUBTLE` | No | Success subtle background |
| `STATUS_DANGER` | No | Danger state |
| `STATUS_DANGER_SUBTLE` | No | Danger subtle background |
| `STATUS_WARNING` | No | Warning state |
| `STATUS_WARNING_SUBTLE` | No | Warning subtle background |
| `STATUS_INFO` | No | Info state |
| `STATUS_INFO_SUBTLE` | No | Info subtle background |

## Dimension Group

| Key | Type | Required | Description |
|---|---|---|---|
| `fontSize` | Object | Yes | Map of size tokens to pixel numbers (`xs` through `xxl`) |
| `space` | Object | Yes | Map of space tokens to pixel numbers (`xs` through `xxl`) |
| `radius` | Object | Yes | Map of radius tokens to pixel numbers (`sm`, `md`, `lg`, `xl`, `pill`) |
| `lineHeightRatio` | Number | No | Multiplier for derived line height (default 1.4) |

### fontSize

```javascript
fontSize: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 }
```

### space

```javascript
space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 }
```

### radius

```javascript
radius: { sm: 4, md: 8, lg: 12, xl: 16, pill: 999 }
```

## Font Group

| Key | Type | Required | Description |
|---|---|---|---|
| `family` | Object | Yes | Map of role to family name (`primary`, `secondary`) |
| `weight` | Object | Yes | Map of weight token to CSS weight string |

### family

```javascript
family: { primary: 'System', secondary: 'System' }
```

### weight

```javascript
weight: { regular: '400', medium: '500', semibold: '600', bold: '700' }
```

## Breakpoint Group

Flat map of breakpoint keys to minimum width in pixels. These are layout boundaries, not design tokens.

```javascript
Breakpoint: { base: 0, sm: 480, md: 768, lg: 1024, xl: 1280 }
```

## Utility Class Naming

The `commonStyles` generator produces utility classes from the theme contract:

| Category | Pattern | Example |
|---|---|---|
| Font size | `font_size_<key>` | `font_size_md` |
| Font color | `font_<token_lowercase>` | `font_text_primary` |
| Font weight | `font_weight_<key>` | `font_weight_semibold` |
| Background | `background_<token_lowercase>` | `background_surface` |
| Border | `border_<key>` | `border_default`, `border_primary` |
| Radius | `br_<key>` | `br_lg` |
| Padding | `p_<side>_<token>` | `p_h_md`, `p_s_sm` |
| Margin | `m_<side>_<token>` | `m_e_sm`, `m_a_lg` |
| Flexbox | `flex_<key>`, `align_<key>`, `justify_<key>` | `flex_center`, `align_center` |

### Spacing Sides

| Side | Meaning | RTL-aware |
|---|---|---|
| `a` | All sides | No |
| `h` | Horizontal | No |
| `v` | Vertical | No |
| `t` | Top | No |
| `b` | Bottom | No |
| `s` | Start | Yes |
| `e` | End | Yes |
