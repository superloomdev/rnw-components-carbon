// Info: TableHead molecule [S1]. A container for table header rows in the
// head section of a DataTable. Uses role="rowgroup" for screen reader
// semantics.
//   children    -> header row elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TableHead molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableHead component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function TableHead (props) {

    const {
      children, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'rowgroup',
        style: [
          Style.utilities['flex_col'],
          Style.utilities['background_background_secondary'],
          style
        ]
      }, rest),
      children
    );

  };

};
