// Info: Heading atom [S1 presentational]. A text element with role="header"
// and a level prop. Uses M1 (a11y) for aria-* level.
//   level       -> 1-6 (default 1, maps to aria-level)
//   children    -> heading text content
//   style       -> custom style overrides
'use strict';


/********************************************************************
Build the Heading atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Heading component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) { // eslint-disable-line no-unused-vars

  const a11y = require('../a11y')(Lib);

  return function Heading (props) {

    const {
      level, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const lvl = Lib.Utils.isNumber(level) ? level : 1;

    // Map level to font size token
    const sizeMap = { 1: 'xxl', 2: 'xl', 3: 'lg', 4: 'md', 5: 'sm', 6: 'xs' };
    const sizeToken = sizeMap[lvl] || 'xl';

    // Build aria position props for level through the a11y translator
    const ariaProps = a11y.position({
      level: lvl
    });

    return React.createElement(
      Registry.Text,
      Object.assign({
        size: sizeToken,
        color: 'text_primary',
        weight: 'semibold',
        accessibilityRole: 'header',
        style: [style]
      }, ariaProps, rest),
      children
    );

  };

};
