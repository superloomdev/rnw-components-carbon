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
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The SideNavMenu component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

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
    const ariaProps = a11y.state({
      expanded: isExpanded
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      RNView,
      Object.assign({
        style: [
          Style_.utilities['flex_col'],
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
            Style_.utilities['flex_row'],
            Style_.utilities['align_center'],
            Style_.utilities['p_h_md'],
            Style_.utilities['p_v_sm']
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
