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
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The HeaderPanel component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function HeaderPanel (props) {

    const { children, expanded, style, ...rest } = props;

    const React = Lib.React;

    const ariaProps = Parts.A11y.state({
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
          Style.utilities['background_surface'],
          Style.utilities['p_a_md'],
          style
        ]
      }, ariaProps, rest),
      children
    );

  };

};
