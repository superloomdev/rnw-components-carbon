# Platform Support

## Headline

243 components ship. 229 (94%) work identically on web and native with no platform branch. 14 need platform attention.

## Platform selection at runtime

Platform-specific implementations use `Platform.OS` checks within single `.js` files. Split components branch at runtime with one API across both platforms. A component that works on both platforms has a single `.js` file.

## Safe area is not native-only

CSS `env(safe-area-inset-*)` is a W3C spec shipped in browsers. `react-native-safe-area-context` supports web. `SafeAreaWrapper` returns real insets in an iOS PWA with `viewport-fit=cover` and zeros on desktop. It does not gate behind `Platform.OS === 'ios'`.

To enable safe area insets on web, add this meta tag to your HTML:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

## All 14 exceptions

| Component | Platform | Behavior |
|---|---|---|
| `ActionSheet` | split | One API, `Platform.OS` branches within a single `.js` file |
| `BottomSafeAreaColorOverride` | native-primary | Full features on native, degrades safely on web |
| `CodeSnippet` | split | One API, `Platform.OS` branches within a single `.js` file |
| `CopyButton` | split | One API, `Platform.OS` branches within a single `.js` file |
| `DocumentViewer` | split | One API, `Platform.OS` branches within a single `.js` file |
| `FileUploader` | split | One API, `Platform.OS` branches within a single `.js` file |
| `FileUploaderButton` | split | One API, `Platform.OS` branches within a single `.js` file |
| `FileUploaderDropContainer` | split | One API, `Platform.OS` branches within a single `.js` file |
| `FileUploaderItem` | split | One API, `Platform.OS` branches within a single `.js` file |
| `GrantPermission` | native-primary | Full features on native, degrades safely on web |
| `Overlay` | split | One API, `Platform.OS` branches within a single `.js` file |
| `SafeAreaWrapper` | native-primary | Full features on native, degrades safely on web |
| `SkipToContent` | web-primary | Renders on web, returns null on native |
| `ViewWrapper` | native-primary | Full features on native, degrades safely on web |

## Excluded components

These components cannot exist in React Native and are not in the registry:

| Component | Reason |
|---|---|
| `ClassPrefix` | RN has no CSS classes to prefix |
