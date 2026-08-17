// Info: SafeAreaWrapper molecule [S1 presentational]. Wraps children with
// safe area insets. Uses role="group" for screen reader semantics.
// Platform: native-primary. Returns real insets in iOS PWA with
// viewport-fit=cover, zeros on desktop. Does NOT gate behind a
// Platform.OS === 'ios' check; reads insets from Lib.Device directly.
//   children    -> wrapped content
//   style       -> custom style overrides


// Imports
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the SafeAreaWrapper molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SafeAreaWrapper component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  /////////////////////////// Static Constants START ////////////////////////////


  // Resolve safe area insets once per build from the device helper.
  // On desktop this returns zeros; on iOS PWA with viewport-fit=cover
  // it returns the real notch/home-indicator insets.

  const resolveInsets = function () {

    let insets = { top: 0, bottom: 0, left: 0, right: 0 };

    if (Lib.Device && Lib.Utils.isFunction(Lib.Device.getSafeAreaInsets)) {
      const result = Lib.Device.getSafeAreaInsets();
      if (result && result.success) {
        insets = {
          top: result.top || 0,
          bottom: result.bottom || 0,
          left: result.left || 0,
          right: result.right || 0
        };
      }
    }

    return insets;

  };

  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const SafeAreaWrapper = function SafeAreaWrapper (props) {


    const {
      children, style,
      ...rest
    } = props;

    const React = Lib.React;
    const insets = resolveInsets();

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          { flex: 1 },
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right
          },
          style
        ]
      }, rest),
      children
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _SafeAreaWrapper = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return SafeAreaWrapper;

}/////////////////////////// Component Factory END /////////////////////////////
