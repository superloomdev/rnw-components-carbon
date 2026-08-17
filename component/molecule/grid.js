// Info: Grid molecule [S1]. A CSS grid-like layout container. Uses
// role="grid" for screen reader semantics. Renders children in a grid
// with configurable columns and gap.
//   children    -> grid item elements
//   columns     -> number of columns (default 2)
//   gap         -> gap in pixels between items (default 0)
//   style       -> custom style overrides


// Imports
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the Grid molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Grid component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const Grid = function Grid (props) {


    const {
      children, columns, gap, style,
      ...rest
    } = props;

    const React = Lib.React;
    const colCount = Lib.Utils.isNumber(columns) ? columns : 2;
    const gapSize = Lib.Utils.isNumber(gap) ? gap : 0;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'grid',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['flex_wrap'],
          { marginHorizontal: -gapSize / 2 },
          style
        ]
      }, rest),
      React.Children.map(children, function (child) {
        return React.createElement(
          RNView,
          {
            style: {
              width: (100 / colCount) + '%',
              paddingHorizontal: gapSize / 2,
              paddingVertical: gapSize / 2
            }
          },
          child
        );
      })
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _Grid = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return Grid;

}/////////////////////////// Component Factory END /////////////////////////////
