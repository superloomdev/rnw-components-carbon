// Info: TableBody molecule [S1]. A container for table rows in the body
// section of a DataTable. Uses role="rowgroup" for screen reader semantics.
//   children    -> row elements
//   style       -> custom style overrides


// Imports
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the TableBody molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableBody component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const TableBody = function TableBody (props) {


    const {
      children, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'rowgroup',
        style: [
          Style.utilities['flex_col'],
          style
        ]
      }, rest),
      children
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _TableBody = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return TableBody;

}/////////////////////////// Component Factory END /////////////////////////////
