// Info: SelectableTag molecule [S2 interactive]. A tag that can be
// selected/deselected. Uses M1 (a11y) for aria-* state and M2 (usePressKeys)
// for keyboard activation. Role="button".
//   text        -> string (the tag label)
//   selected    -> boolean (whether the tag is selected)
//   onSelect    -> function (called with next boolean)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the SelectableTag molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SelectableTag component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function SelectableTag (props) {

    const {
      text, selected, onSelect, style,
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    // Handle toggle
    const handlePress = function () {
      if (Lib.Utils.isFunction(onSelect)) {
        onSelect(!selected);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      pressed: !!selected
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'button',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: handlePress,
        accessibilityRole: 'button',
        accessibilityLabel: text,
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['p_h_sm'],
          Style.utilities['p_v_xs'],
          Style.utilities['br_pill'],
          {
            borderWidth: 1,
            borderColor: selected
              ? (colorMap.APP_PRIMARY || '#0f62fe')
              : (colorMap.BORDER || '#e0e0e0'),
            backgroundColor: selected
              ? (colorMap.APP_PRIMARY_SUBTLE || '#edf5ff')
              : 'transparent'
          },
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      React.createElement(Registry.Text, {
        size: 'sm',
        color: selected ? 'app_primary' : 'text_primary'
      }, text)
    );

  };

};
