// Info: Skeleton atom [S1 presentational]. A placeholder for loading states.
// Sets aria-hidden so screen readers skip placeholder content. Uses M1 (a11y)
// for the aria-hidden prop.
//   variant    -> 'text' | 'icon' | 'placeholder' (default 'text')
//   lines      -> number (for text variant, default 1)
//   width      -> number or string (default '100%')
//   height     -> number or string (default 16 for text, 48 for placeholder)
//   style      -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Skeleton atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Skeleton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function Skeleton (props) {

    const {
      variant, lines, width, height, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const v = variant || 'text';
    const colorMap = Style.tokens.Color;

    // Build aria-hidden through the a11y translator
    const ariaProps = Parts.A11y.state({
      hidden: true
    });

    // Default dimensions per variant
    const defaultHeight = v === 'placeholder' ? 48 : v === 'icon' ? 24 : 16;
    const resolvedHeight = height || defaultHeight;
    const resolvedWidth = width || '100%';
    const lineCount = lines || 1;

    // Build skeleton box style
    const boxStyle = {
      backgroundColor: colorMap.BACKGROUND_SECONDARY || '#e0e0e0',
      borderRadius: v === 'text' ? 2 : 4,
      height: resolvedHeight,
      width: resolvedWidth
    };

    // For text variant with multiple lines, render stacked boxes
    if (v === 'text' && lineCount > 1) {
      const lineElements = [];

      for (let i = 0; i < lineCount; i++) {
        const isLast = i === lineCount - 1;
        lineElements.push(React.createElement(RNView, {
          key: i,
          style: [boxStyle, {
            width: isLast ? '60%' : '100%',
            marginBottom: isLast ? 0 : 8
          }]
        }));
      }

      return React.createElement(
        RNView,
        Object.assign({ style: style }, ariaProps, rest),
        lineElements
      );
    }

    return React.createElement(
      RNView,
      Object.assign({ style: [boxStyle, style] }, ariaProps, rest)
    );

  };

};
