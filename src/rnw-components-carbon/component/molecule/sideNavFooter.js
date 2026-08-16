// Info: SideNavFooter molecule [S1 presentational]. A footer section in the
// side nav. Uses role="group" for screen reader semantics.
//   children    -> footer content elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the SideNavFooter molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SideNavFooter component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function SideNavFooter (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style.utilities['flex_col'],
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          style
        ]
      }, rest),
      children
    );

  };

};
