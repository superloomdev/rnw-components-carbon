// Info: SideNavMenu molecule [S2 interactive]. A collapsible menu in the
// side nav. Uses role="button" for screen reader semantics. Uses M1 (a11y)
// for aria-expanded state and M2 (usePressKeys) for keyboard activation.
//   label       -> string (menu label)
//   expanded    -> boolean (whether the menu is expanded)
//   onToggle    -> function (called with next boolean)
//   children    -> SideNavMenuItem elements (shown when expanded)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the SideNavMenu molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SideNavMenu component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function SideNavMenu (props) {

    const {
      label, expanded, onToggle, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
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
          Style.utilities['flex_col'],
          style
        ]
      }, rest),
      React.createElement(
        Pressable,
        Object.assign({
          onPress: handlePress,
          accessibilityRole: 'button',
          accessibilityLabel: label
        }, ariaProps, pressKeysProps, {
          style: [
            Style.utilities['flex_row'],
            Style.utilities['align_center'],
            Style.utilities['p_h_md'],
            Style.utilities['p_v_sm']
          ]
        }),
        React.createElement(Registry.Text, {
          size: 'md',
          color: 'text_primary',
          weight: 'medium',
          style: { flex: 1 }
        }, label || ''),
        React.createElement(Registry.Icon, {
          name: isExpanded ? 'chevron--up' : 'chevron--down',
          size: 'sm',
          color: 'TEXT_SECONDARY'
        })
      ),
      isExpanded
        ? React.createElement(RNView, null, children)
        : null
    );

  };

};
