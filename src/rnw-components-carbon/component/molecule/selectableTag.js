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
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The SelectableTag component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function SelectableTag (props) {

    const {
      text, selected, onSelect, style,
      isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

    // Handle toggle
    const handlePress = function () {
      if (Lib.Utils.isFunction(onSelect)) {
        onSelect(!selected);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      pressed: !!selected
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
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
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['p_h_sm'],
          Style_.utilities['p_v_xs'],
          Style_.utilities['br_pill'],
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
