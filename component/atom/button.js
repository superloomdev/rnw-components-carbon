// Info: Button atom [S2 interactive]. Wraps Pressable, resolves the five
// interaction states (enabled, hovered, pressed, focused, disabled), and
// guarantees the minimum accessible hit target. Children can be a function
// receiving the interaction state, or static content.
//   kind -> 'primary' | 'secondary' | 'danger' | 'ghost' (maps to background)


// Imports
import { Pressable } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the Button atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, Units }
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style    - { utilities, tokens, breakpoint }

@return {Function} - The Button component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////

  // Map kind prop to background token. Replaces the legacy ButtonPrimary
  // (app_primary) and ButtonLink (ghost / transparent) components.
  const KIND_BACKGROUND = {
    primary: 'app_primary',
    secondary: 'app_secondary',
    danger: 'app_danger',
    ghost: undefined
  };

  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const Button = function Button (props) {

    // Destructure props
    const {
      onPress, disabled, background, kind, radius, style, children, accessibilityLabel,
      ...rest
    } = props;

    // kind overrides background when provided
    const effectiveBackground = kind ? KIND_BACKGROUND[kind] : background;

    const React = Lib.React;

    // Track visual dimensions for hitSlop calculation
    const layoutRef = React.useRef({ height: 0, width: 0 });


    // ---- Base utility classes ----
    const baseClasses = [];

    if (radius) {
      const brClass = Style.utilities['br_' + radius];
      if (brClass) {
        baseClasses.push(brClass);
      }
    }


    // ---- Style function for Pressable (resolves interaction states) ----
    const styleFn = function (pressableState) {

      const stateSuffix = _Button.resolveStateSuffix(props, pressableState);
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


    // ---- Accessibility ----
    const ariaProps = Parts.A11y.state({
      disabled: !!disabled
    });


    // Render
    return Lib.React.createElement(
      Pressable,
      Object.assign({
        onPress: disabled ? null : onPress,
        disabled: disabled,
        accessibilityRole: 'button',
        accessibilityLabel: accessibilityLabel,
        hitSlop: _Button.resolveHitSlop(layoutRef.current.height, layoutRef.current.width),
        onLayout: function (e) {
          layoutRef.current = e.nativeEvent.layout;
        },
        style: styleFn
      }, ariaProps, rest),
      Lib.Utils.isFunction(children) ? children : children
    );

  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _Button = {

    /********************************************************************
    Resolve the active interaction state to a token suffix. Priority:
    disabled > pressed > hovered > focused > default.

@param {Object} props          - Component props (reads disabled)
@param {Object} pressableState - RN Pressable state { pressed, hovered, focused }

@return {String} - Token suffix ('_disabled', '_pressed', '_hovered', '_focused', or '')
    *********************************************************************/
    resolveStateSuffix: function (props, pressableState) {

      if (props.disabled) {
        return '_disabled';
      }

      if (pressableState.pressed) {
        return '_pressed';
      }

      if (pressableState.hovered) {
        return '_hovered';
      }

      if (pressableState.focused) {
        return '_focused';
      }

      return '';

    },


    /********************************************************************
    Compute hitSlop so the touch target reaches the accessible minimum.
    Returns undefined when the visual box already clears the minimum on
    both axes.

@param {Number} height - Current layout height
@param {Number} width  - Current layout width

@return {Object|undefined} - Hit slop insets or undefined
    *********************************************************************/
    resolveHitSlop: function (height, width) {

      if (height >= CONFIG.MIN_HIT_TARGET && width >= CONFIG.MIN_HIT_TARGET) {
        return undefined;
      }

      const padV = Parts.Units.clamp(Parts.Units.ceil((CONFIG.MIN_HIT_TARGET - height) / 2), 0, Infinity);
      const padH = Parts.Units.clamp(Parts.Units.ceil((CONFIG.MIN_HIT_TARGET - width) / 2), 0, Infinity);

      return { top: padV, bottom: padV, left: padH, right: padH };

    }

  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return Button;

}/////////////////////////// Component Factory END /////////////////////////////
