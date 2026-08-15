// Info: GridItem composite [S1]. An item within a Grid. Uses role="gridcell"
// for screen reader semantics. Supports a span prop to control how many
// columns the item occupies.
//   children    -> grid item content
//   span        -> number of columns to span (default 1)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the GridItem composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The GridItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function GridItem (props) {

    const {
      children, span, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const spanCount = Lib.Utils.isNumber(span) ? span : 1;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'gridcell',
        style: [
          Style_.utilities['flex_1'],
          {
            flexGrow: spanCount,
            flexBasis: (spanCount * 100) + '%',
            maxWidth: (spanCount * 100) + '%'
          },
          style
        ]
      }, rest),
      children
    );

  };

};
