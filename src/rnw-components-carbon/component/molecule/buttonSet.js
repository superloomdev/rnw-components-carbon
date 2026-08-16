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
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ButtonSet component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

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
          stacked ? null : Style.utilities['flex_row'],
          stacked ? null : Style.utilities['align_center'],
          style
        ]
      }, rest),
      children
    );

  };

};
