// Info: TextInput atom [S2 interactive]. A themed single-line input.
// Border/radius/padding/font all come from tokens; focus swaps the border
// to the primary color (focus ring). Placeholder color uses a derived muted
// token. Passes accessibilityRole and accessibilityState for screen readers.
'use strict';

const { TextInput: RNTextInput } = require('react-native');


/********************************************************************
Build the TextInput atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The TextInput component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function TextInput (props) {

    // Destructure props
    const {
      style, isRtlActive, accessibilityLabel, isInvalid, isDisabled, // eslint-disable-line no-unused-vars
      onFocus, onBlur, ...rest
    } = props;

    const React = Lib.React;
    const [focused, setFocused] = React.useState(false);

    // Resolve base styles from tokens
    const base = [
      Style_.utilities['background_surface'] || { backgroundColor: '#fff' },
      Style_.utilities['br_md'],
      Style_.utilities['p_h_md'],
      Style_.utilities['p_v_sm'],
      Style_.utilities['font_size_md'],
      Style_.utilities['font_text_primary'],
      // Focus swaps border to primary; otherwise default border
      focused ? Style_.utilities['border_primary'] : Style_.utilities['border_default']
    ];

    // Build accessibility state object
    const accessibilityState = {
      disabled: !!isDisabled,
      invalid: !!isInvalid
    };

    return Lib.React.createElement(
      RNTextInput,
      Object.assign({
        style: [...base, style],
        placeholderTextColor: Style_.tokens.Color.TEXT_MUTED || '#999',
        editable: !isDisabled,
        accessibilityRole: 'textbox',
        accessibilityLabel: accessibilityLabel,
        accessibilityState: accessibilityState,
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
      }, rest)
    );

  };

};
