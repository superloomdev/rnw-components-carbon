// Info: SwitcherDivider molecule [S1 presentational]. A divider in a switcher
// panel. Uses role="separator" for screen reader semantics.
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the SwitcherDivider molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The SwitcherDivider component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function SwitcherDivider (props) {

    const {
      style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'separator',
        style: [
          {
            height: 1,
            width: '100%',
            backgroundColor: colorMap.BORDER || '#e0e0e0'
          },
          style
        ]
      }, rest)
    );

  };

};
