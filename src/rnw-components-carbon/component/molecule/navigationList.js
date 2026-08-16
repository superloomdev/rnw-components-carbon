// Info: NavigationList molecule [S1 presentational]. A vertical navigation
// list with an optional title. Uses role="navigation" for screen reader
// semantics.
//   title       -> heading text (optional)
//   children    -> navigation list items
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the NavigationList molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The NavigationList component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function NavigationList (props) {

    const {
      title, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'navigation',
        style: [
          Style_.utilities['flex_col'],
          style
        ]
      }, rest),
      // Optional title heading
      title
        ? React.createElement(Registry.Heading, {
          level: 3,
          style: Style_.utilities['m_b_sm']
        }, title)
        : null,
      children
    );

  };

};
