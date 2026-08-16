// Info: LandingView molecule [S1 presentational]. A full-screen landing
// page container. Uses role="main" for screen reader semantics.
//   children    -> page content
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the LandingView molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The LandingView component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function LandingView (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'main',
        style: [
          { flex: 1, minHeight: '100%' },
          Style.utilities['flex_col'],
          style
        ]
      }, rest),
      children
    );

  };

};
