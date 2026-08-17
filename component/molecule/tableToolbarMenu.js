// Info: TableToolbarMenu molecule [S2 interactive]. A dropdown menu in the
// table toolbar. Uses role="button" (on the trigger) for screen reader
// semantics. Composes the OverflowMenu composite, forwarding label as the
// trigger label and children as the menu items.
//   label       -> string (trigger label, default 'Options')
//   children    -> array of menu item objects { label, onPress, disabled }
//   style       -> custom style overrides


// Imports
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the TableToolbarMenu molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableToolbarMenu component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  /////////////////////////// Static Constants START ////////////////////////////


  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const TableToolbarMenu = function TableToolbarMenu (props) {


    const {
      label, children, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      { style: style },
      React.createElement(Registry.OverflowMenu, Object.assign({
        triggerLabel: label || 'Options',
        items: children
      }, rest))
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _TableToolbarMenu = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return TableToolbarMenu;

}/////////////////////////// Component Factory END /////////////////////////////
