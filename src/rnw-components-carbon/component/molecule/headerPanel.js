// Info: HeaderPanel molecule [S1 presentational]. An expandable panel
// within the Header composite with role="region". Uses M1 (a11y) for
// aria-hidden when collapsed.
//   children    -> panel content
//   expanded    -> boolean, whether the panel is visible
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the HeaderPanel molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The HeaderPanel component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);

  return function HeaderPanel (props) {

    const { children, expanded, style, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    const React = Lib.React;

    const ariaProps = a11y.state({
      hidden: expanded === false ? true : undefined
    });

    if (expanded === false) {
      return null;
    }

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'region',
        style: [
          Style_.utilities['background_surface'],
          Style_.utilities['p_a_md'],
          style
        ]
      }, ariaProps, rest),
      children
    );

  };

};
