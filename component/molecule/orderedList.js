// Info: OrderedList molecule [S1]. An ordered (numbered) list container.
// Uses role="list" for screen reader semantics. Renders children in a
// vertical column layout.
//   children    -> list item elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the OrderedList molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The OrderedList component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function OrderedList (props) {

    const {
      children, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'list',
        style: [
          Style.utilities['flex_col'],
          style
        ]
      }, rest),
      children
    );

  };

};
