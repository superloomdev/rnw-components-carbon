// Info: CodeSnippet molecule [S1/S2]. A code display block with optional copy
// button. Uses M1 (a11y) for aria-* and M6 (useAnnounce) for copy feedback.
//   code        -> string (the code to display)
//   language    -> string (language label, e.g. 'javascript')
//   showCopy    -> boolean (default true)
//   onCopy      -> function (callback after copy)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the CodeSnippet molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The CodeSnippet component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function CodeSnippet (props) {

    const {
      code, language, showCopy, onCopy, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    return React.createElement(
      RNView,
      Object.assign({
        style: [
          {
            backgroundColor: colorMap.BACKGROUND_SECONDARY || '#262626',
            borderRadius: 6,
            padding: 12,
            fontFamily: 'monospace'
          },
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'sm',
        color: 'text_primary',
        style: { fontFamily: 'monospace' }
      }, code || ''),
      showCopy !== false
        ? React.createElement(Registry.CopyButton, {
          text: code || '',
          label: 'Copy code',
          onCopy: onCopy,
          style: { marginTop: 8 }
        })
        : null
    );

  };

};
