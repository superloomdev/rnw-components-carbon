// Info: Header composite [S1/S2 compound]. A navigation header container
// that groups HeaderNav, HeaderMenuButton, and HeaderPanel children. Uses
// M1 (a11y) for the container. Composes View atom for the header bar.
//   children    -> HeaderNav, HeaderMenuButton, HeaderPanel elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Header composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Header component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function Header (props) {

    const { children, style, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'header',
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['p_h_lg'],
          Style_.utilities['p_v_md'],
          Style_.utilities['background_surface'],
          {
            borderBottomWidth: 1,
            borderBottomColor: colorMap.BORDER || '#e0e0e0'
          },
          style
        ]
      }, rest),
      children
    );

  };

};
