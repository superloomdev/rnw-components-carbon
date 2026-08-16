// Info: MenuItemDivider molecule [S1 presentational]. A horizontal separator
// within a menu. Uses role="separator". No mechanisms needed.
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the MenuItemDivider molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The MenuItemDivider component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function MenuItemDivider (props) {

    const { style, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    return React.createElement(RNView, Object.assign({
      accessibilityRole: 'separator',
      style: [
        {
          height: 1,
          backgroundColor: colorMap.BORDER || '#e0e0e0',
          marginVertical: 4
        },
        style
      ]
    }, rest));

  };

};
