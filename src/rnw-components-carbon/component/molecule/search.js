// Info: Search molecule [S2 interactive]. A TextInput with a search icon
// and optional clear button. Uses M1 (a11y) for aria-* state and M8
// (useControllableState) for controlled/uncontrolled value.
//   value         -> string (controlled)
//   defaultValue  -> string (uncontrolled)
//   onChange      -> callback receiving the text value
//   onClear       -> callback when clear button is pressed
//   placeholder   -> string (default 'Search')
//   disabled      -> boolean
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the Search molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Search component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function Search (props) {

    const {
      value, defaultValue, onChange, onClear, placeholder, disabled, style,
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

    const isDisabled = !!disabled;
    const colorMap = Style.tokens.Color;

    // Clear button handler
    const handleClear = function () {
      setValue('');
      if (Lib.Utils.isFunction(onClear)) {
        onClear();
      }
    };

    return React.createElement(
      RNView,
      {
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['br_md'],
          Style.utilities['border_default'],
          isDisabled
            ? { backgroundColor: colorMap.BACKGROUND_SECONDARY || '#f4f4f4' }
            : Style.utilities['background_surface'],
          Style.utilities['p_h_sm'],
          style
        ]
      },
      // Search icon
      React.createElement(Registry.Icon, {
        name: 'search',
        size: 'sm',
        color: 'TEXT_SECONDARY',
        style: Style.utilities['m_e_xs']
      }),
      // Text input
      React.createElement(
        Registry.TextInput,
        Object.assign({
          value: resolvedValue,
          onChangeText: setValue,
          placeholder: placeholder || 'Search',
          isDisabled: isDisabled,
          accessibilityRole: 'searchbox',
          accessibilityLabel: accessibilityLabel || 'Search',
          style: { flex: 1 }
        }, rest)
      ),
      // Clear button (visible when there is text)
      resolvedValue && !isDisabled
        ? React.createElement(
          Pressable,
          {
            onPress: handleClear,
            accessibilityRole: 'button',
            accessibilityLabel: 'Clear search',
            style: Style.utilities['m_s_xs']
          },
          React.createElement(Registry.Icon, {
            name: 'close',
            size: 'sm',
            color: 'TEXT_MUTED'
          })
        )
        : null
    );

  };

};
