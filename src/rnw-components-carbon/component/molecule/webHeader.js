// Info: WebHeader molecule [S1 presentational]. A web-style header bar.
// Uses role="banner" for screen reader semantics.
//   children    -> header content
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the WebHeader molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The WebHeader component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function WebHeader (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'banner',
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_md'],
          Style_.utilities['background_background_primary'] || Style_.utilities['background_surface'],
          style
        ]
      }, rest),
      children
    );

  };

};
