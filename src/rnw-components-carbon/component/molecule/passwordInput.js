// Info: PasswordInput molecule [S2 interactive]. A TextInput with a show/hide
// password toggle button. Uses M1 (a11y) for aria-* state and M8
// (useControllableState) for controlled/uncontrolled value.
//   value         -> string (controlled)
//   defaultValue  -> string (uncontrolled)
//   onChange      -> callback receiving the text value
//   placeholder   -> string
//   disabled      -> boolean
//   invalid       -> boolean
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the PasswordInput molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The PasswordInput component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function PasswordInput (props) {

    const {
      value, defaultValue, onChange, placeholder, disabled, invalid, style,
      isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
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

    // Show/hide password toggle state (always uncontrolled)
    const showState = React.useState(false);
    const showPassword = showState[0];
    const setShowPassword = showState[1];

    const isDisabled = !!disabled;
    const isInvalid = !!invalid;
    const colorMap = Style.tokens.Color;

    return React.createElement(
      RNView,
      {
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['br_md'],
          Style.utilities['border_default'],
          isInvalid
            ? { borderColor: colorMap.STATUS_DANGER || '#da1e28' }
            : null,
          isDisabled
            ? { backgroundColor: colorMap.BACKGROUND_SECONDARY || '#f4f4f4' }
            : Style.utilities['background_surface'],
          style
        ]
      },
      // Password text input
      React.createElement(
        Registry.TextInput,
        Object.assign({
          value: resolvedValue,
          onChangeText: setValue,
          placeholder: placeholder,
          isDisabled: isDisabled,
          isInvalid: isInvalid,
          secureTextEntry: !showPassword,
          accessibilityRole: 'textbox',
          accessibilityLabel: accessibilityLabel,
          style: { flex: 1 }
        }, rest)
      ),
      // Show/hide toggle button
      React.createElement(
        Pressable,
        {
          onPress: function () {
            setShowPassword(!showPassword);
          },
          disabled: isDisabled,
          accessibilityRole: 'button',
          accessibilityLabel: showPassword ? 'Hide password' : 'Show password',
          style: Style.utilities['m_s_xs']
        },
        React.createElement(Registry.Icon, {
          name: showPassword ? 'eye-off' : 'eye',
          size: 'sm',
          color: 'TEXT_SECONDARY'
        })
      )
    );

  };

};
