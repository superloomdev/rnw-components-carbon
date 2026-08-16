// Info: SideNav molecule [S1 presentational]. A side navigation panel. Uses
// role="navigation" for screen reader semantics. Renders children in a
// vertical column with surface background.
//   children    -> side nav content elements
//   expanded    -> boolean (whether the side nav is expanded)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the SideNav molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SideNav component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function SideNav (props) {

    const {
      children, expanded, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'navigation',
        style: [
          Style.utilities['flex_col'],
          Style.utilities['background_surface'],
          {
            width: expanded === false ? 0 : 256,
            borderRightWidth: 1,
            borderRightColor: colorMap.BORDER || '#e0e0e0'
          },
          style
        ]
      }, rest),
      children
    );

  };

};
