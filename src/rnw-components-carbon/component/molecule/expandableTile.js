// Info: ExpandableTile molecule [S2 interactive]. A tile that expands to show
// more content. Uses role="button" for screen reader semantics. Uses M1 (a11y)
// for aria-* state and M2 (usePressKeys) for keyboard activation.
//   title       -> string (tile title)
//   expanded    -> boolean (whether the tile is expanded)
//   onToggle    -> function (called with next boolean)
//   children    -> content (shown when expanded)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the ExpandableTile molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ExpandableTile component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function ExpandableTile (props) {

    const {
      title, expanded, onToggle, children, style,
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;
    const isExpanded = !!expanded;

    // Handle toggle
    const handlePress = function () {
      if (Lib.Utils.isFunction(onToggle)) {
        onToggle(!isExpanded);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      expanded: isExpanded
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'button',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      RNView,
      Object.assign({
        style: [
          Style.utilities['br_md'],
          Style.utilities['border_default'],
          {
            backgroundColor: colorMap.BACKGROUND_SURFACE || '#ffffff'
          },
          style
        ]
      }, rest),
      // Toggle header
      React.createElement(
        Pressable,
        Object.assign({
          onPress: handlePress,
          accessibilityRole: 'button',
          accessibilityLabel: title
        }, ariaProps, pressKeysProps, {
          style: [
            Style.utilities['flex_row'],
            Style.utilities['align_center'],
            Style.utilities['p_a_md']
          ]
        }),
        title
          ? React.createElement(Registry.Text, {
            size: 'md',
            color: 'text_primary',
            weight: 'medium',
            style: Style.utilities['flex_1']
          }, title)
          : null,
        React.createElement(Registry.Icon, {
          name: isExpanded ? 'chevron--up' : 'chevron--down',
          size: 'sm',
          color: 'TEXT_SECONDARY'
        })
      ),
      // Expanded content
      isExpanded
        ? React.createElement(
          RNView,
          { style: Style.utilities['p_h_md'] },
          children || null
        )
        : null
    );

  };

};
