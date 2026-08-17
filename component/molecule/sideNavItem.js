// Info: SideNavItem molecule [S2 interactive]. A single navigation item.
// Uses role="link" for screen reader semantics. Uses A11y for aria-*
// state (current) and PressKeys for keyboard activation.
//   text        -> string (item label)
//   onPress     -> function (press handler)
//   active      -> boolean (whether this item is active)
//   style       -> custom style overrides


// Imports
import { Pressable } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the SideNavItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SideNavItem component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const SideNavItem = function SideNavItem (props) {


    const {
      text, onPress, active, style,
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;
    const isActive = !!active;

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      current: isActive ? 'page' : undefined
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'link',
      onActivate: onPress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'link',
        accessibilityLabel: text
      }, ariaProps, pressKeysProps, {
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          {
            backgroundColor: isActive
              ? (colorMap.APP_PRIMARY_SUBTLE || '#edf5ff')
              : 'transparent'
          },
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: isActive ? 'app_primary' : 'text_primary',
        weight: isActive ? 'medium' : 'regular'
      }, text || '')
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _SideNavItem = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return SideNavItem;

}/////////////////////////// Component Factory END /////////////////////////////
