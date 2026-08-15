// Info: TableRow molecule [S1]. A row within a DataTable. Uses role="row"
// for screen reader semantics. Renders children in a horizontal layout.
//   children    -> cell elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TableRow molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The TableRow component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function TableRow (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'row',
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['border_default'],
          style
        ]
      }, rest),
      children
    );

  };

};
