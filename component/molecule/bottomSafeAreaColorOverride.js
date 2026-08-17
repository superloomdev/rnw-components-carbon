// Info: BottomSafeAreaColorOverride molecule [S1 presentational]. Sets
// the bottom safe area background color. Uses role="group" for screen
// reader semantics. Platform: native-primary. On web, renders children
// without safe area handling.
//   color       -> background color for the bottom safe area
//   children    -> content above the safe area
//   style       -> custom style overrides


// Imports
import { View as RNView, Platform } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the BottomSafeAreaColorOverride molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The BottomSafeAreaColorOverride component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const BottomSafeAreaColorOverride = function BottomSafeAreaColorOverride (props) {


    // Destructure props
    const {
      color, children, style,
      ...rest
    } = props;

    const React = Lib.React;

    // On web, no safe area handling needed
    if (Platform.OS === 'web') {
      return React.createElement(
        RNView,
        Object.assign({
          accessibilityRole: 'group',
          style: style
        }, rest),
        children
      );
    }

    // On native, add a colored spacer for the bottom safe area
    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style.utilities['flex_col'],
          style
        ]
      }, rest),
      children,
      React.createElement(RNView, { style: { backgroundColor: color || 'transparent', height: 34 } })
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _BottomSafeAreaColorOverride = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return BottomSafeAreaColorOverride;

}/////////////////////////// Component Factory END /////////////////////////////
