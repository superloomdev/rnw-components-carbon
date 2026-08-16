// Info: AISkeletonText molecule [S1 presentational]. A skeleton placeholder
// for text lines. Uses role="img" for screen reader semantics.
//   lines       -> number (default 3)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the AISkeletonText molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The AISkeletonText component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function AISkeletonText (props) {

    const {
      lines, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;
    const lineCount = lines || 3;

    const lineElements = [];
    for (let i = 0; i < lineCount; i++) {
      const isLast = i === lineCount - 1;
      lineElements.push(React.createElement(RNView, {
        key: i,
        style: {
          width: isLast ? '60%' : '100%',
          height: 16,
          borderRadius: 2,
          marginBottom: isLast ? 0 : 8,
          backgroundColor: colorMap.BACKGROUND_SECONDARY || '#e0e0e0'
        }
      }));
    }

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'img',
        accessibilityLabel: 'Loading text',
        style: style
      }, rest),
      lineElements
    );

  };

};
