// Info: TableDecoratorRow molecule [S1 presentational]. A decorative
// separator row in a table. Uses role="row" for screen reader semantics.
// Renders a thin bordered divider with no content.
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TableDecoratorRow molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableDecoratorRow component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function TableDecoratorRow (props) {

    const {
      style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'row',
        style: [
          Style.utilities['border_default'],
          { height: 1 },
          style
        ]
      }, rest)
    );

  };

};
