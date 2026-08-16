// Info: ErrorState molecule [S1 presentational]. An error display with an
// icon, title, and subtitle. Uses role="alert" for screen reader semantics.
//   title       -> primary text
//   subtitle    -> secondary text (optional)
//   icon        -> icon name (optional, defaults to error--filled)
//   children    -> additional content (optional)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the ErrorState molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ErrorState component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function ErrorState (props) {

    const {
      title, subtitle, icon, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const iconName = icon || 'error--filled';

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'alert',
        style: [
          Style_.utilities['background_status_danger_subtle'] || Style_.utilities['background_surface'],
          Style_.utilities['br_md'],
          Style_.utilities['border_default'],
          Style_.utilities['p_a_md'],
          Style_.utilities['flex_row'],
          Style_.utilities['align_start'],
          style
        ]
      }, rest),
      // Error icon
      React.createElement(Registry.Icon, {
        name: iconName,
        size: 'md',
        color: 'TEXT_SECONDARY',
        style: Style_.utilities['m_e_sm']
      }),
      // Title and subtitle column
      React.createElement(
        Registry.View,
        { style: Style_.utilities['flex_1'] },
        title
          ? React.createElement(Registry.Text, {
            size: 'md',
            color: 'text_primary',
            weight: 'medium'
          }, title)
          : null,
        subtitle
          ? React.createElement(Registry.Text, {
            size: 'sm',
            color: 'text_secondary',
            style: Style_.utilities['m_t_xs']
          }, subtitle)
          : null,
        children || null
      )
    );

  };

};
