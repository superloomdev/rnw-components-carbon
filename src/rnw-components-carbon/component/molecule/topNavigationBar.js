// Info: TopNavigationBar molecule [S1 presentational]. A top navigation
// bar with title, subtitle, left items, and right items. Uses role="banner"
// for screen reader semantics.
//   title       -> main title string
//   subTitle    -> optional subtitle string
//   leftItems   -> array of { icon, text, onPress }
//   rightItems  -> array of { icon, text, onPress }
//   headerMode  -> boolean (larger title when true)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TopNavigationBar molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The TopNavigationBar component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function TopNavigationBar (props) {

    // Destructure props
    const {
      title, subTitle, leftItems, rightItems, headerMode,
      style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Render a nav item (icon button)
    const renderNavItem = function (item, index) {
      return React.createElement(Registry.Button, {
        key: index,
        kind: 'ghost',
        title: item.text,
        icon: item.icon,
        onPress: item.onPress
      });
    };

    // Title section
    const titleSection = React.createElement(
      RNView,
      { style: Style_.utilities['flex_col'] },
      React.createElement(Registry.Text, { style: headerMode ? { fontSize: 20 } : null }, title || ''),
      subTitle ? React.createElement(Registry.Text, null, subTitle) : null
    );

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'banner',
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['items_center'],
          Style_.utilities['justify_between'],
          style
        ]
      }, rest),
      React.createElement(RNView, { style: Style_.utilities['flex_row'] },
        (Array.isArray(leftItems) ? leftItems : []).map(renderNavItem)
      ),
      titleSection,
      React.createElement(RNView, { style: Style_.utilities['flex_row'] },
        (Array.isArray(rightItems) ? rightItems : []).map(renderNavItem)
      )
    );

  };

};
