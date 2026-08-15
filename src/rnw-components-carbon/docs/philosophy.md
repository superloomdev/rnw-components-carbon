# Design Philosophy

## Token-Driven, Not Style-Driven

Every visual decision in a component resolves to a token. A component never hardcodes a color, size, or spacing value. This means re-theming the entire application is a single `rebuild` call with a new theme contract.

## Three Component Shapes

### S1 Presentational

No interaction state. Maps token props to utility classes and passes everything else through. Examples: `View`, `Text`, `Icon`, `Badge`.

### S2 Interactive

Wraps a Pressable with interaction state (enabled, hovered, pressed, focused, disabled). Resolves the active state to a token suffix and guarantees the minimum accessible hit target. Examples: `Button`, `TextInput`, `ButtonPrimary`.

### S3 Overlay

An overlay component with focus management. Implements six obligations:

1. On open: record the previously focused element and move focus into the overlay
2. While open: trap focus so Tab cycles within the overlay
3. On Escape (web) or hardware back (Android): close
4. On outside press: close
5. On close: restore focus to the recorded element
6. Announce with `accessibilityViewIsModal` (iOS) and `importantForAccessibility` (Android)

The `useFocusTrap` hook implements all six obligations once. Examples: `Modal`, `Dropdown`.

## Validation Policy

**Boot-time misconfiguration throws `TypeError`.** Theme validation, config validation, and injection validation all throw at construction time. This catches configuration errors before any render.

**Render-time prop errors warn and fall back deterministically.** Unknown token props trigger `Lib.Debug.warn` and fall back to the default token. No render-time throw. This prevents a single bad prop from crashing an entire screen.

Warnings are deduplicated by the `Debug` module so a repeated bad prop does not flood the console.

## React Injection

React is injected via `shared_libs.React` rather than imported directly. This prevents the two-copy-of-React problem that breaks hooks. When a host bundles the component library, the host's React is the one the library closes over.

`react-native` is imported directly because it is a single-instance peer with no hook contract. Platform, I18nManager, StyleSheet, and the component primitives (View, Text, Pressable) come from the one `react-native` instance.

## Freeform Escape Hatch

The `freeform/` namespace contains components that intentionally do not receive `Style` or `Registry`. They take raw styles and do not retheme. Use them only for surfaces that must abandon the design system entirely (chat bubbles, game HUDs, marketing heroes).

A future lint rule can flag imports from `freeform/` so every use is a conscious, reviewable decision.

## RTL Without Per-Component Work

Spacing utilities use logical sides (`start`/`end`) instead of physical sides (`left`/`right`). React Native mirrors these automatically under RTL. Components do not need to check `isRtlActive` for spacing; the HOC injects it only for platform-specific exceptions (like iOS `writingDirection`).

## Composition Over Configuration

Molecules compose atoms. `ButtonPrimary` uses `Component.Icon` and `Component.Text` rather than rendering `RNText` directly. This means a molecule inherits every token-driven behavior from its constituent atoms, and a theme change propagates through the entire tree without molecule-level changes.
