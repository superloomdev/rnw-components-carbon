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
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The NavigationListItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function NavigationListItem (props) {

    const {
      title, onPress, icon, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({});

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'link',
        accessibilityLabel: title,
        style: [
          Style.utilities['p_h_md'],
          Style.utilities['p_v_md'],
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          style
        ]
      }, ariaProps, rest),
      // Leading icon
      icon
        ? React.createElement(Registry.Icon, {
          name: icon,
          size: 'md',
          color: 'TEXT_SECONDARY',
          style: Style.utilities['m_e_sm']
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
