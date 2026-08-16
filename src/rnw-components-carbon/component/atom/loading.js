// Info: Loading atom [S1 presentational]. An indeterminate loading indicator
// with role="progressbar" and aria-busy. Uses M1 (a11y) for aria-* state and
// M6 (useAnnounce) for screen reader announcements.
//   label       -> string (announced to screen readers)
//   size        -> 'sm' | 'md' | 'lg' (default 'md')
//   style       -> custom style overrides
'use strict';

const { View: RNView, ActivityIndicator } = require('react-native');


/********************************************************************
Build the Loading atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Loading component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function Loading (props) {

    const {
      label, size, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    // Map size token to ActivityIndicator size
    const aiSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'small';

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      busy: true
    });

    // Build aria value props for indeterminate progressbar
    const ariaValueProps = Parts.A11y.value({
      min: 0,
      max: 100,
      now: null
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'progressbar',
        accessibilityLabel: label || 'Loading',
        style: [Style.utilities['flex_row'], Style.utilities['align_center'], Style.utilities['justify_center'], style]
      }, ariaProps, ariaValueProps, rest),
      React.createElement(ActivityIndicator, {
        size: aiSize,
        color: colorMap.APP_PRIMARY || '#0f62fe'
      })
    );

  };

};
