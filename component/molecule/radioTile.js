// Info: RadioTile molecule [S2 interactive]. A selectable tile in a radio
// group. Uses role="radio" for screen reader semantics. Uses A11y for
// aria-* state and PressKeys for keyboard activation.
//   name        -> string (radio group name)
//   value       -> string (tile value)
//   checked     -> boolean (whether this tile is selected)
//   onSelect    -> function (called with the value)
//   style       -> custom style overrides


// Imports
import { Pressable } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the RadioTile molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The RadioTile component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const RadioTile = function RadioTile (props) {


    const {
      name, value, checked, onSelect, style,
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;
    const isChecked = !!checked;

    // Handle selection
    const handlePress = function () {
      if (Lib.Utils.isFunction(onSelect)) {
        onSelect(value);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      checked: isChecked
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'radio',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: handlePress,
        accessibilityRole: 'radio',
        accessibilityLabel: name || value
      }, ariaProps, pressKeysProps, {
        style: [
          Style.utilities['br_md'],
          Style.utilities['p_a_md'],
          {
            borderWidth: 2,
            borderColor: isChecked
              ? (colorMap.APP_PRIMARY || '#0f62fe')
              : (colorMap.BORDER || '#a8a8a8'),
            backgroundColor: isChecked
              ? (colorMap.BACKGROUND_SECONDARY || '#f4f4f4')
              : 'transparent'
          },
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_primary',
        weight: 'medium'
      }, value)
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _RadioTile = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return RadioTile;

}/////////////////////////// Component Factory END /////////////////////////////
