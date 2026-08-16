// Info: SideNavIcon molecule [S1 presentational]. An icon in the side nav.
// Uses role="img" for screen reader semantics.
//   name        -> string (icon name)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the SideNavIcon molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SideNavIcon component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function SideNavIcon (props) {

    const {
      name, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'img',
        accessibilityLabel: name,
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['justify_center'],
          Style.utilities['p_a_sm'],
          style
        ]
      }, rest),
      React.createElement(Registry.Icon, {
        name: name,
        size: 'md',
        color: 'TEXT_SECONDARY'
      })
    );

  };

};
