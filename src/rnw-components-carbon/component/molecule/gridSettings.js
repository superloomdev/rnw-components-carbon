// Info: GridSettings molecule [S1 presentational]. Grid configuration settings
// display. Uses role="group" for screen reader semantics.
//   columns     -> number (grid column count)
//   gap         -> string (grid gap token)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the GridSettings molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The GridSettings component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function GridSettings (props) {

    const {
      columns, gap, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          {
            gridTemplateColumns: 'repeat(' + (columns || 12) + ', 1fr)',
            gap: gap || '16px'
          },
          style
        ]
      }, rest)
    );

  };

};
