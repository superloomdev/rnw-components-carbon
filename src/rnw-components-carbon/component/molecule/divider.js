// Info: Divider molecule [S1]. A horizontal or vertical divider line for
// layout separation. Uses role="separator" for screen reader semantics.
// Similar to the Separator atom but intended for layout use.
//   orientation -> 'horizontal' (default) or 'vertical'
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Divider molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Divider component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function Divider (props) {

    const {
      orientation, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const borderColor = Style_.tokens.Color.BORDER || '#e0e0e0';

    // Build the divider style based on orientation
    const dividerStyle = (orientation === 'vertical')
      ? { borderLeftWidth: 1, borderColor: borderColor, alignSelf: 'stretch' }
      : { borderTopWidth: 1, borderColor: borderColor, alignSelf: 'stretch' };

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'separator',
        style: [dividerStyle, style]
      }, rest)
    );

  };

};
