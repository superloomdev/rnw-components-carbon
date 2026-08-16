// Info: ToggletipContent molecule [S1 presentational]. The content container
// inside a Toggletip. Uses role="tooltip" for screen reader semantics.
//   children    -> toggletip content elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the ToggletipContent molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ToggletipContent component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function ToggletipContent (props) {

    const {
      children, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'tooltip',
        style: [
          Style.utilities['background_surface'],
          Style.utilities['br_md'],
          Style.utilities['p_a_sm'],
          Style.utilities['shadow_sm'],
          style
        ]
      }, rest),
      children
    );

  };

};
