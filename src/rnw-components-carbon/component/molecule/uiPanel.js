// Info: UiPanel molecule [S1 presentational]. A collapsible panel with a
// header and content area. Uses role="group" for screen reader semantics.
// The header toggles visibility of the children.
//   title       -> panel header text
//   collapsed   -> boolean (true = content hidden)
//   onToggle    -> callback when header is pressed
//   children    -> panel content
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the UiPanel molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The UiPanel component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function UiPanel (props) {

    // Destructure props
    const {
      title, collapsed, onToggle, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Header section with toggle
    const header = React.createElement(
      Pressable,
      {
        onPress: onToggle,
        accessibilityRole: 'button',
        accessibilityLabel: title,
        style: Style_.utilities['flex_row']
      },
      React.createElement(Registry.Text, null, title || ''),
      React.createElement(Registry.Icon, { name: collapsed ? 'chevron--right' : 'chevron--down' })
    );

    // Content section (hidden when collapsed)
    const content = collapsed ? null : children;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style_.utilities['flex_col'],
          style
        ]
      }, rest),
      header,
      content
    );

  };

};
