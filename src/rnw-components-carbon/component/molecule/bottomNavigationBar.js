// Info: BottomNavigationBar molecule [S1 presentational]. A bottom
// navigation bar with icon+text items. Uses role="tabbar" for screen
// reader semantics. Each item is a Pressable with icon and label.
//   items       -> array of { icon, text, onPress, active }
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the BottomNavigationBar molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The BottomNavigationBar component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function BottomNavigationBar (props) {

    // Destructure props
    const {
      items, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Render each navigation item
    const renderItem = function (item, index) {

      const itemStyles = [Style.utilities['flex_col'], Style.utilities['items_center']];

      if (item.active) {
        itemStyles.push(Style.utilities['background_active']);
      }

      return React.createElement(
        Pressable,
        {
          key: index,
          onPress: item.onPress,
          accessibilityRole: 'tab',
          accessibilityLabel: item.text,
          style: itemStyles
        },
        item.icon ? React.createElement(Registry.Icon, { name: item.icon }) : null,
        React.createElement(Registry.Text, null, item.text)
      );

    };

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'tabbar',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['justify_between'],
          style
        ]
      }, rest),
      (Array.isArray(items) ? items : []).map(renderItem)
    );

  };

};
