// Info: HeaderContainer molecule [S1 presentational]. A container for the
// Header composite. Uses role="banner" for screen reader semantics.
//   children    -> header content elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the HeaderContainer molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The HeaderContainer component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function HeaderContainer (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'banner',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['p_h_lg'],
          Style.utilities['p_v_md'],
          Style.utilities['background_surface'],
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
