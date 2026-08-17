// Info: MenuButton composite [S3 overlay]. A button that opens a Menu.
// Uses A11y, Overlay, AnchoredPosition, CompoundContext.
// Composes Button, Menu, MenuItem atoms.
//   label       -> string (button label)
//   items       -> array of { label, onPress, disabled }
//   icon        -> string (optional leading icon)
//   style       -> custom style overrides


// Imports
import menuFactory from './menu.js';
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the MenuButton composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The MenuButton component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////

  const Menu = menuFactory(Lib, CONFIG, ERRORS, Parts, Registry, Style);

  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const MenuButton = function MenuButton (props) {


    const {
      label, items, icon, style, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClose = function () {
      setIsOpen(false);
    };

    // Build aria state props
    const ariaProps = Parts.A11y.state({
      expanded: !!isOpen
    });

    // Build menu items
    const menuItems = (items || []).map(function (item) {
      return React.createElement(Registry.MenuItem, {
        key: item.label,
        label: item.label,
        onPress: function () {
          setIsOpen(false);
          if (Lib.Utils.isFunction(item.onPress)) {
            item.onPress();
          }
        },
        disabled: item.disabled
      });
    });

    return React.createElement(
      RNView,
      { style: { position: 'relative' } },
      React.createElement(
        Registry.Button,
        Object.assign({
          onPress: function () {
            setIsOpen(!isOpen);
          },
          icon: icon
        }, ariaProps, rest),
        label
      ),
      React.createElement(Menu, { isOpen: isOpen, onClose: handleClose }, menuItems)
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _MenuButton = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return MenuButton;

}/////////////////////////// Component Factory END /////////////////////////////
