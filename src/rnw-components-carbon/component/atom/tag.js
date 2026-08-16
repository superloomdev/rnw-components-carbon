// Info: Tag atom [S1/S2 presentational or interactive]. A compact label.
// Dismissible tags are S2 with role="button" on the close button. Uses M1 (a11y).
//   label       -> string, tag text
//   onDismiss   -> function (when provided, renders a close button)
//   disabled    -> boolean
//   selected    -> boolean (for selectable tags)
//   onPress     -> function (for selectable tags)
//   variant     -> 'default' | 'operational' (color scheme)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the Tag atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Tag component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function Tag (props) {

    const {
      label, onDismiss, disabled, selected, onPress, variant, style,
      isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;
    const isOperational = variant === 'operational';
    const isSelectable = Lib.Utils.isFunction(onPress);
    const isDismissible = Lib.Utils.isFunction(onDismiss);

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      disabled: !!disabled,
      selected: isSelectable ? !!selected : null
    });

    // Tag container style
    const tagStyle = {
      backgroundColor: isOperational
        ? (colorMap.APP_PRIMARY || '#0f62fe')
        : (colorMap.BACKGROUND_SECONDARY || '#e0e0e0'),
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 4,
      flexDirection: 'row',
      alignItems: 'center'
    };

    // Build the tag content
    const content = [
      React.createElement(Registry.Text, {
        key: 'label',
        size: 'sm',
        color: isOperational ? 'text_on_primary' : 'text_primary',
        weight: 'medium'
      }, label)
    ];

    // Close button for dismissible tags
    if (isDismissible) {
      content.push(React.createElement(
        Pressable,
        {
          key: 'close',
          onPress: disabled ? null : onDismiss,
          disabled: !!disabled,
          accessibilityRole: 'button',
          accessibilityLabel: 'Remove tag',
          style: { marginLeft: 6 }
        },
        React.createElement(Registry.Text, {
          size: 'sm',
          color: isOperational ? 'text_on_primary' : 'text_muted'
        }, '\u00d7')
      ));
    }

    // If selectable, wrap in Pressable
    if (isSelectable) {
      return React.createElement(
        Pressable,
        Object.assign({
          onPress: disabled ? null : onPress,
          disabled: !!disabled,
          accessibilityRole: 'button',
          accessibilityLabel: accessibilityLabel || label,
          style: [tagStyle, style]
        }, ariaProps, rest),
        content
      );
    }

    // Non-interactive tag
    return React.createElement(
      RNView,
      Object.assign({ style: [tagStyle, style] }, rest),
      content
    );

  };

};
