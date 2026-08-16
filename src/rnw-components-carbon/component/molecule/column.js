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
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Column component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function Column (props) {

    const {
      children, span, style,
      ...rest
    } = props;

    const React = Lib.React;

    // Build style array; span adds a grid-column span when provided
    const styles = [Style.utilities['flex_col']];

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
