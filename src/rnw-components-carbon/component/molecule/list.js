// Info: List molecule [S1 presentational]. A list container that renders
// as ordered or unordered. Uses role="list" for screen reader semantics.
//   ordered     -> boolean (when true, renders an ordered list)
//   children    -> list items
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the List molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The List component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function List (props) {

    const {
      ordered, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'list',
        style: [
          Style_.utilities['flex_col'],
          style
        ]
      }, rest),
      children
    );

  };

};
