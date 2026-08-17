// Info: Column molecule [S1]. A vertical layout container. Uses role="column"
// for screen reader semantics. Renders children in a flex column.
//   children    -> content elements
//   span        -> number (grid column span; absorbed from GridItem)
//   style       -> custom style overrides


// Imports
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

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
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const Column = function Column (props) {


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
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _Column = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return Column;

}/////////////////////////// Component Factory END /////////////////////////////
