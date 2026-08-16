// Info: TableCell molecule [S1]. A cell within a TableRow. Uses role="cell"
// for screen reader semantics. Renders children with padding.
//   children    -> cell content
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TableCell molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableCell component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function TableCell (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'cell',
        style: [
          Style.utilities['flex_1'],
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          style
        ]
      }, rest),
      children
    );

  };

};
