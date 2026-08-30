// Info: TextArea atom [S2 interactive]. A multiline text input with token
// consumption for border and background. Uses a11y for aria-* state and
// ControllableState for controlled/uncontrolled value.
//   value         -> string (controlled)
//   defaultValue  -> string (uncontrolled)
//   onChange      -> callback receiving the text value
//   disabled      -> boolean
//   invalid       -> boolean
//   placeholder   -> string
//   rows          -> number (visual height in lines, default 4)


// Imports
import { TextInput as RNTextInput } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the TextArea atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style    - { utilities, tokens, breakpoint }

@return {Function} - The TextArea component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const TextArea = function TextArea (props) {

    const {
      value, defaultValue, onChange, disabled, invalid, placeholder, rows,
      style, accessibilityLabel,
      ...rest
    } = props;

    const React = Lib.React;

    // Controlled/uncontrolled state
    const state = Parts.ControllableState({
      value: value,
      defaultValue: defaultValue || '',
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    const isDisabled = !!disabled;
    const isInvalid = !!invalid;

    // Base styles from tokens
    const colorMap = Style.tokens.Color;
    const base = [
      Style.utilities['p_h_md'],
      Style.utilities['p_v_sm'],
      Style.utilities['br_md'],
      Style.utilities['border_default'],
      isInvalid
        ? { borderColor: colorMap.STATUS_DANGER }
        : null,
      isDisabled
        ? { backgroundColor: colorMap.BACKGROUND_SECONDARY }
        : Style.utilities['background_surface'],
      {
        minHeight: (rows || 4) * 24,
        textAlignVertical: 'top'
      }
    ];

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      disabled: isDisabled,
      invalid: isInvalid
    });

    return React.createElement(
      RNTextInput,
      Object.assign({
        value: resolvedValue,
        onChangeText: setValue,
        placeholder: placeholder,
        placeholderTextColor: colorMap.TEXT_MUTED,
        editable: !isDisabled,
        multiline: true,
        numberOfLines: rows || 4,
        accessibilityRole: 'textbox',
        accessibilityLabel: accessibilityLabel,
        style: [...base, style]
      }, ariaProps, rest)
    );

  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _TextArea = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return TextArea;

}/////////////////////////// Component Factory END /////////////////////////////
