// Info: TabPanels molecule [S1 presentational]. A container for tab panels.
// Uses role="group" for screen reader semantics.
//   children    -> tab panel elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TabPanels molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TabPanels component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function TabPanels (props) {

    const {
      children, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style.utilities['flex_1'],
          style
        ]
      }, rest),
      children
    );

  };

};
