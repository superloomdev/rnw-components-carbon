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
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The TileBelowTheFoldContent component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function TileBelowTheFoldContent (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style_.utilities['p_h_md'],
          Style_.utilities['p_b_md'],
          style
        ]
      }, rest),
      children
    );

  };

};
