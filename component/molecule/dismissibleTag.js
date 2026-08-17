// Info: DismissibleTag molecule [S2 interactive]. A tag that can be dismissed.
// Uses role="button" for screen reader semantics. Uses A11y for aria-*
// state and PressKeys for keyboard activation.
//   text        -> string (the tag label)
//   onDismiss   -> function (called when dismiss is pressed)
//   style       -> custom style overrides


// Imports
import { Pressable } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the DismissibleTag molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The DismissibleTag component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const DismissibleTag = function DismissibleTag (props) {


    const {
      text, onDismiss, style,
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({});

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'button',
      onActivate: onDismiss,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onDismiss,
        accessibilityRole: 'button',
        accessibilityLabel: text ? ('Dismiss ' + text) : 'Dismiss tag'
      }, ariaProps, pressKeysProps, {
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['p_h_sm'],
          Style.utilities['p_v_xs'],
          Style.utilities['br_pill'],
          {
            borderWidth: 1,
            borderColor: colorMap.BORDER || '#e0e0e0',
            backgroundColor: colorMap.BACKGROUND_SECONDARY || '#f4f4f4'
          },
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'sm',
        color: 'text_primary'
      }, text),
      React.createElement(Registry.Icon, {
        name: 'close',
        size: 'sm',
        color: 'TEXT_SECONDARY',
        style: Style.utilities['m_s_xs']
      })
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _DismissibleTag = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return DismissibleTag;

}/////////////////////////// Component Factory END /////////////////////////////
