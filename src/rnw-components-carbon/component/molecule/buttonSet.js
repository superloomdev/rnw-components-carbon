// Info: ButtonSet molecule [S1 presentational]. A horizontal group of buttons
// with consistent spacing. No mechanisms needed.
//   children    -> button elements
//   stacked     -> boolean (stack vertically, default false)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the ButtonSet molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ButtonSet component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function ButtonSet (props) {

    const {
      children, stacked, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        style: [
          stacked ? null : Style_.utilities['flex_row'],
          stacked ? null : Style_.utilities['align_center'],
          style
        ]
      }, rest),
      children
    );

  };

};
