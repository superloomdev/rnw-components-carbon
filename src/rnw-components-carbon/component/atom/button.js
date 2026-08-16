// Info: Button atom [S2 interactive]. Wraps Pressable, resolves the five
// interaction states (enabled, hovered, pressed, focused, disabled), and
// guarantees the minimum accessible hit target. Children can be a function
// receiving the interaction state, or static content.
//   kind        -> 'primary' | 'secondary' | 'danger' | 'ghost' (maps to background)
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the Button atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Button component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  // Build the a11y translator once per factory
  // ~~~~~~~~~~~~~~~~~~~~ Private ~~~~~~~~~~~~~~~~~~~~

  // Resolve the active interaction state to a token suffix
  const resolveStateSuffix = function (props, pressableState) {

    // Disabled outranks every other state
    if (props.disabled) {
      return '_disabled';
    }

    // Pressed outranks hovered
    if (pressableState.pressed) {
      return '_pressed';
    }

    // Hovered is web and pointer only
    if (pressableState.hovered) {
      return '_hovered';
    }

    // Focused is the accessibility-visible state
    if (pressableState.focused) {
      return '_focused';
    }

    return '';

  };


  // Compute hitSlop so the touch target reaches the accessible minimum
  const resolveHitSlop = function (height, width) {

    // No padding needed once the visual box already clears the minimum on both axes
    if (height >= CONFIG.MIN_HIT_TARGET && width >= CONFIG.MIN_HIT_TARGET) {
      return undefined;
    }

    const padV = Parts.Units.clamp(Parts.Units.ceil((CONFIG.MIN_HIT_TARGET - height) / 2), 0, Infinity);
    const padH = Parts.Units.clamp(Parts.Units.ceil((CONFIG.MIN_HIT_TARGET - width) / 2), 0, Infinity);

    return { top: padV, bottom: padV, left: padH, right: padH };

  };


  // Map kind to background token. Replaces ButtonPrimary (app_primary)
  // and ButtonLink (ghost / transparent).
  const KIND_BACKGROUND = {
    primary: 'app_primary',
    secondary: 'app_secondary',
    danger: 'app_danger',
    ghost: undefined
  };


  return function Button (props) {

    // Destructure props
    const {
      onPress, disabled, background, kind, radius, style, children, accessibilityLabel,
      isRtlActive, ...rest // eslint-disable-line no-unused-vars
    } = props;

    // kind overrides background when provided
    const effectiveBackground = kind ? KIND_BACKGROUND[kind] : background;

    const React = Lib.React;

    // Track visual dimensions for hitSlop calculation
    const layoutRef = React.useRef({ height: 0, width: 0 });

    // Resolve base utility classes
    const baseClasses = [];

    if (radius) {
      const brClass = Style.utilities['br_' + radius];
      if (brClass) {
        baseClasses.push(brClass);
      }
    }

    // Build the style function for Pressable
    const styleFn = function (pressableState) {

      const stateSuffix = resolveStateSuffix(props, pressableState);
      const classes = [...baseClasses];

      // Resolve background with state suffix
      if (effectiveBackground) {
        const bgKey = 'background_' + effectiveBackground + stateSuffix;
        const bgClass = Style.utilities[bgKey];

        if (bgClass) {
          classes.push(bgClass);
        } else {
          // Fall back to the base background without state suffix
          const baseBgKey = 'background_' + effectiveBackground;
          const baseBgClass = Style.utilities[baseBgKey];

          if (baseBgClass) {
            classes.push(baseBgClass);
          }
        }

      }

      // Focus ring for the focused state
      if (pressableState.focused && !disabled) {
        classes.push(Style.utilities['border_focused']);
      }

      return [...classes, style];

    };

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      disabled: !!disabled
    });

    return Lib.React.createElement(
      Pressable,
      Object.assign({
        onPress: disabled ? null : onPress,
        disabled: disabled,
        accessibilityRole: 'button',
        accessibilityLabel: accessibilityLabel,
        hitSlop: resolveHitSlop(layoutRef.current.height, layoutRef.current.width),
        onLayout: function (e) {
          layoutRef.current = e.nativeEvent.layout;
        },
        style: styleFn
      }, ariaProps, rest),
      // Children can be a function receiving the pressable state, or static
      Lib.Utils.isFunction(children) ? children : children
    );

  };

};
