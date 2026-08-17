// Info: HeaderGlobalBar molecule [S1 presentational]. A bar containing global
// header actions. Uses role="group" for screen reader semantics.
//   children    -> HeaderGlobalAction elements
//   style       -> custom style overrides


// Imports
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the HeaderGlobalBar molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The HeaderGlobalBar component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const HeaderGlobalBar = function HeaderGlobalBar (props) {


    const {
      children, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          style
        ]
      }, rest),
      children
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _HeaderGlobalBar = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return HeaderGlobalBar;

}/////////////////////////// Component Factory END /////////////////////////////
