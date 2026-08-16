// Info: StructuredListBody molecule [S1 presentational]. The body of a
// structured list. Uses role="rowgroup" for screen reader semantics.
//   children    -> structured list row elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the StructuredListBody molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The StructuredListBody component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function StructuredListBody (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'rowgroup',
        style: [
          Style.utilities['flex_col'],
          style
        ]
      }, rest),
      children
    );

  };

};
