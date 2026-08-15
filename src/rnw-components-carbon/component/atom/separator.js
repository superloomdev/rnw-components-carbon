// Info: Separator atom [S1 presentational]. A horizontal or vertical divider
// line. Uses the BORDER color token and a configurable thickness.
//   orientation -> 'horizontal' (default) or 'vertical'
//   thickness   -> line width in pixels (default 1)
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Separator atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Separator component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function Separator (props) {

    // Destructure props
    const { orientation, thickness, style, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    // Resolve the border color from the theme
    const borderColor = Style_.tokens.Color.BORDER || '#e0e0e0';
    const lineThickness = Lib.Utils.isNumber(thickness) ? thickness : 1;

    // Build the separator style based on orientation
    const separatorStyle = (orientation === 'vertical')
      ? { borderLeftWidth: lineThickness, borderColor: borderColor, alignSelf: 'stretch' }
      : { borderTopWidth: lineThickness, borderColor: borderColor, alignSelf: 'stretch' };

    return Lib.React.createElement(
      RNView,
      Object.assign({ style: [separatorStyle, style] }, rest)
    );

  };

};
