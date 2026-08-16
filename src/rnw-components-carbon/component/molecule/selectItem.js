// Info: SelectItem molecule [S2 interactive]. A single option in a Select.
// Uses M1 (a11y) for aria-* state and M2 (usePressKeys) for keyboard
// activation. Role="option".
//   value       -> string (the option value)
//   text        -> string (the display label)
//   onSelect    -> function (called with the value when selected)
//   disabled    -> boolean
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the SelectItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SelectItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function SelectItem (props) {

    const {
      value, text, onSelect, disabled, style,
      ...rest
    } = props;

    const React = Lib.React;

    // Handle selection
    const handlePress = function () {
      if (disabled) {
        return;
      }
      if (Lib.Utils.isFunction(onSelect)) {
        onSelect(value);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      disabled: !!disabled
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'option',
      onActivate: handlePress,
      disabled: !!disabled
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: disabled ? null : handlePress,
        disabled: !!disabled,
        accessibilityRole: 'option',
        accessibilityLabel: text,
        style: [
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: disabled ? 'text_disabled' : 'text_primary'
      }, text)
    );

  };

};
