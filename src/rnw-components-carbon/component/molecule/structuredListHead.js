// Info: StructuredListHead molecule [S1 presentational]. The header of a
// structured list. Uses role="rowgroup" for screen reader semantics.
//   children    -> structured list row elements (header rows)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the StructuredListHead molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The StructuredListHead component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function StructuredListHead (props) {

    const {
      children, style,
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'rowgroup',
        style: [
          Style.utilities['flex_col'],
          {
            borderBottomWidth: 1,
            borderBottomColor: colorMap.BORDER || '#e0e0e0'
          },
          style
        ]
      }, rest),
      children
    );

  };

};
