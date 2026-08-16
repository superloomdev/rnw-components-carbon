// Info: SideNavDivider molecule [S1 presentational]. A divider in the side
// nav. Uses role="separator" for screen reader semantics.
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the SideNavDivider molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SideNavDivider component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function SideNavDivider (props) {

    const {
      style,
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'separator',
        style: [
          {
            height: 1,
            backgroundColor: colorMap.BORDER || '#e0e0e0'
          },
          Style.utilities['m_v_sm'],
          style
        ]
      }, rest)
    );

  };

};
