// Info: NavigationListItem molecule [S2 interactive]. A navigation list item
// with an optional leading icon and a title. Uses role="link" for screen
// reader semantics.
//   title       -> primary text
//   onPress     -> press handler
//   icon        -> leading icon name (optional)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the NavigationListItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The NavigationListItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);

  return function NavigationListItem (props) {

    const {
      title, onPress, icon, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({});

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'link',
        accessibilityLabel: title,
        style: [
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_md'],
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          style
        ]
      }, ariaProps, rest),
      // Leading icon
      icon
        ? React.createElement(Registry.Icon, {
          name: icon,
          size: 'md',
          color: 'TEXT_SECONDARY',
          style: Style_.utilities['m_e_sm']
        })
        : null,
      // Title
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_primary',
        weight: 'regular'
      }, title)
    );

  };

};
