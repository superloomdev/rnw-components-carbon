// Info: Column molecule [S1]. A vertical layout container. Uses role="column"
// for screen reader semantics. Renders children in a flex column.
//   children    -> content elements
//   span        -> number (grid column span; absorbed from GridItem)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Column molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Column component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function Column (props) {

    const {
      children, span, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build style array; span adds a grid-column span when provided
    const styles = [Style_.utilities['flex_col']];

    if (Lib.Utils.isNumber(span) && span > 0) {
      styles.push({ gridColumn: 'span ' + span });
    }

    styles.push(style);

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'column',
        style: styles
      }, rest),
      children
    );

  };

};
