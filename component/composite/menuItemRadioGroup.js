// Info: MenuItemRadioGroup composite [S4 compound]. A group of menu items
// with role="group" where exactly one is selected. Uses A11y,
// RovingTabIndex, CompoundContext.
//   items       -> array of { label, value }
//   value       -> string (selected value)
//   onChange    -> function (called with selected value)
//   style       -> custom style overrides


// Imports
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the MenuItemRadioGroup composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The MenuItemRadioGroup component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  /////////////////////////// Static Constants START ////////////////////////////


  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const MenuItemRadioGroup = function MenuItemRadioGroup (props) {


    const {
      items, value, onChange, style,
      ...rest
    } = props;

    const React = Lib.React;

    // Build radio menu items
    const radioItems = (items || []).map(function (item) {
      return React.createElement(Registry.MenuItemSelectable, {
        key: item.value,
        label: item.label,
        checked: item.value === value,
        onChange: function () {
          if (Lib.Utils.isFunction(onChange)) {
            onChange(item.value);
          }
        }
      });
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [style]
      }, rest),
      radioItems
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _MenuItemRadioGroup = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return MenuItemRadioGroup;

}/////////////////////////// Component Factory END /////////////////////////////
