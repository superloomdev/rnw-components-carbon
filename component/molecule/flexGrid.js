// Info: FlexGrid molecule [S1]. A flex-based grid container. Uses role="grid"
// for screen reader semantics. Renders children in a flex row with wrapping
// and configurable gap.
//   children    -> grid item elements
//   gap         -> gap in pixels between items (default 0)
//   style       -> custom style overrides


// Imports
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the FlexGrid molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The FlexGrid component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const FlexGrid = function FlexGrid (props) {


    const {
      children, gap, style,
      ...rest
    } = props;

    const React = Lib.React;
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
  const _FlexGrid = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return FlexGrid;

}/////////////////////////// Component Factory END /////////////////////////////
