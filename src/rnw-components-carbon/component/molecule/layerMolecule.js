// Info: Layer molecule [S1]. Applies a surface token based on the level
// prop (0, 1, 2). Named layerMolecule.js to avoid conflict with the
// provider/layer.js module. Uses role="group" for screen reader semantics.
//   children    -> content elements
//   level       -> 0 | 1 | 2 (surface elevation level, default 0)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


// Level -> background utility key
const LEVEL_BG = {
  0: 'background_background_primary',
  1: 'background_surface',
  2: 'background_background_secondary'
};


/********************************************************************
Build the Layer molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Layer molecule component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function LayerMolecule (props) {

    const {
      children, level, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const resolvedLevel = Lib.Utils.isNumber(level) ? level : 0;
    const bgKey = LEVEL_BG[resolvedLevel] || LEVEL_BG[0];

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style_.utilities[bgKey] || Style_.utilities['background_background_primary'],
          Style_.utilities['p_a_md'],
          style
        ]
      }, rest),
      children
    );

  };

};
