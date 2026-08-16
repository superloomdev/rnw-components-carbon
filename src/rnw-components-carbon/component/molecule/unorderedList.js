// Info: UnorderedList molecule [S1]. An unordered (bulleted) list container.
// Uses role="list" for screen reader semantics. Renders children in a
// vertical column layout.
//   children    -> list item elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the UnorderedList molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The UnorderedList component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function UnorderedList (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
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
