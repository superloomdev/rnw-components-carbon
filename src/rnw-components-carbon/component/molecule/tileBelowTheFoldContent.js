// Info: TileBelowTheFoldContent molecule [S1 presentational]. The hidden
// (below-the-fold) content in an ExpandableTile. Uses role="group" for
// screen reader semantics.
//   children    -> below-the-fold content
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TileBelowTheFoldContent molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TileBelowTheFoldContent component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function TileBelowTheFoldContent (props) {

    const {
      children, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style.utilities['p_h_md'],
          Style.utilities['p_b_md'],
          style
        ]
      }, rest),
      children
    );

  };

};
