// Info: SkeletonIcon molecule [S1 presentational]. A skeleton placeholder for
// an icon. Uses role="img" for screen reader semantics.
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the SkeletonIcon molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SkeletonIcon component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function SkeletonIcon (props) {

    const {
      style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'img',
        accessibilityLabel: 'Loading icon',
        style: [
          {
            width: 24,
            height: 24,
            borderRadius: 4,
            backgroundColor: colorMap.BACKGROUND_SECONDARY || '#e0e0e0'
          },
          style
        ]
      }, rest)
    );

  };

};
