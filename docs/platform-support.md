# Platform Support

## Headline

243 components ship. 229 (94%) work identically on web and native with no platform branch. 14 need platform attention.

## Platform selection at build time

Platform-specific implementations use `.web.js` and `.native.js` file extensions. The React Native bundler resolves the correct variant at build time, with no runtime cost. A component that works on both platforms has a single `.js` file.

## Safe area is not native-only

CSS `env(safe-area-inset-*)` is a W3C spec shipped in browsers. `react-native-safe-area-context` supports web. `SafeAreaWrapper` returns real insets in an iOS PWA with `viewport-fit=cover` and zeros on desktop. It does not gate behind `Platform.OS === 'ios'`.

To enable safe area insets on web, add this meta tag to your HTML:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

## All 14 exceptions

| Component | Platform | Behavior |
|---|---|---|
| `ActionSheet` | split | One API, two build-time implementations (.web.js and .native.js) |
| `BottomSafeAreaColorOverride` | native-primary | Full features on native, degrades safely on web |
| `CodeSnippet` | split | One API, two build-time implementations (.web.js and .native.js) |
| `CopyButton` | split | One API, two build-time implementations (.web.js and .native.js) |
| `DocumentViewer` | split | One API, two build-time implementations (.web.js and .native.js) |
| `FileUploader` | split | One API, two build-time implementations (.web.js and .native.js) |
| `FileUploaderButton` | split | One API, two build-time implementations (.web.js and .native.js) |
| `FileUploaderDropContainer` | split | One API, two build-time implementations (.web.js and .native.js) |
| `FileUploaderItem` | split | One API, two build-time implementations (.web.js and .native.js) |
| `GrantPermission` | native-primary | Full features on native, degrades safely on web |
| `Overlay` | split | One API, two build-time implementations (.web.js and .native.js) |
| `SafeAreaWrapper` | native-primary | Full features on native, degrades safely on web |
| `SkipToContent` | web-primary | Renders on web, returns null on native |
| `ViewWrapper` | native-primary | Full features on native, degrades safely on web |

## Excluded components

These components cannot exist in React Native and are not in the registry:

| Component | Reason |
|---|---|
| `ClassPrefix` | RN has no CSS classes to prefix |
