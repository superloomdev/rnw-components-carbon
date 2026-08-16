// Info: TableToolbar molecule [S1]. A horizontal toolbar container for tool
// buttons. Uses role="toolbar" for screen reader semantics. Renders
// children in a flex row with consistent spacing.
//   children    -> tool button elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TableToolbar molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableToolbar component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function TableToolbar (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'toolbar',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['p_h_sm'],
          Style.utilities['p_v_sm'],
          style
        ]
      }, rest),
      children
    );

  };

};
