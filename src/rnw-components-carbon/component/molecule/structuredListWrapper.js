// Info: StructuredListWrapper molecule [S1]. A simple structured list container.
// Uses role="table" for screen reader semantics. Renders children in a
// vertical column layout with border styling.
//   children    -> structured list row elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the StructuredListWrapper molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The StructuredListWrapper component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function StructuredListWrapper (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'table',
        style: [
          Style.utilities['flex_col'],
          Style.utilities['border_default'],
          Style.utilities['br_md'],
          { overflow: 'hidden' },
          style
        ]
      }, rest),
      children
    );

  };

};
