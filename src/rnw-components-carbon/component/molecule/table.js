// Info: Table molecule [S1 presentational]. The root table container.
// Uses role="table" for screen reader semantics. Renders children in a
// vertical column layout with a border and rounded corners.
//   children    -> table content elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Table molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Table component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function Table (props) {

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
          Style_.utilities['flex_col'],
          Style_.utilities['border_default'],
          Style_.utilities['br_md'],
          { overflow: 'hidden' },
          style
        ]
      }, rest),
      children
    );

  };

};
