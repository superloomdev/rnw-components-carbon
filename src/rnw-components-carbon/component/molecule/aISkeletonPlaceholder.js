// Info: AISkeletonPlaceholder molecule [S1 presentational]. A skeleton
// placeholder box. Uses role="img" for screen reader semantics.
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the AISkeletonPlaceholder molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The AISkeletonPlaceholder component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function AISkeletonPlaceholder (props) {

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
        accessibilityLabel: 'Loading content',
        style: [
          {
            height: 48,
            width: '100%',
            borderRadius: 4,
            backgroundColor: colorMap.BACKGROUND_SECONDARY || '#e0e0e0'
          },
          style
        ]
      }, rest)
    );

  };

};
