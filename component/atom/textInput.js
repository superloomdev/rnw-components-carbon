// Info: TextInput atom [S2 interactive]. A themed single-line input.
// Border/radius/padding/font all come from tokens; focus swaps the border
// to the primary color (focus ring). Placeholder color uses a derived muted
// token. Passes accessibilityRole and aria-* for screen readers.


// Imports
import { TextInput as RNTextInput } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the TextInput atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style    - { utilities, tokens, breakpoint }

@return {Function} - The TextInput component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const TextInput = function TextInput (props) {

    // Destructure props
    const {
      style, accessibilityLabel, isInvalid, isDisabled,
      onFocus, onBlur, ...rest
    } = props;

    const React = Lib.React;
    const [focused, setFocused] = React.useState(false);

    // Resolve base styles from tokens
    const base = [
      Style.utilities['background_surface'] || { backgroundColor: '#fff' },
      Style.utilities['br_md'],
      Style.utilities['p_h_md'],
      Style.utilities['p_v_sm'],
      Style.utilities['font_size_md'],
      Style.utilities['font_text_primary'],
      // Focus swaps border to primary; otherwise default border
      focused ? Style.utilities['border_primary'] : Style.utilities['border_default']
    ];

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      disabled: !!isDisabled,
      invalid: !!isInvalid
    });

    return Lib.React.createElement(
      RNTextInput,
      Object.assign({
        style: [...base, style],
        placeholderTextColor: Style.tokens.Color.TEXT_MUTED || '#999',
        editable: !isDisabled,
        accessibilityRole: 'textbox',
        accessibilityLabel: accessibilityLabel,
        onFocus: function (e) {

          setFocused(true);

          if (Lib.Utils.isFunction(onFocus)) {
            onFocus(e);
          }

        },
        onBlur: function (e) {

          setFocused(false);

          if (Lib.Utils.isFunction(onBlur)) {
            onBlur(e);
          }

        }
      }, ariaProps, rest)
    );

  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _TextInput = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return TextInput;

}/////////////////////////// Component Factory END /////////////////////////////
