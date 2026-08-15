// Info: SelectableTile molecule [S2 interactive]. A tile that acts as a
// checkbox. Uses M1 (a11y) for aria-* state and M2 (usePressKeys) for keyboard.
//   title       -> string
//   selected    -> boolean
//   onSelect    -> function (called with next boolean)
//   disabled    -> boolean
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the SelectableTile molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The SelectableTile component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function SelectableTile (props) {

    const {
      title, selected, onSelect, disabled, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

    // Handle toggle
    const handlePress = function () {
      if (disabled) {
        return;
      }
      if (Lib.Utils.isFunction(onSelect)) {
        onSelect(!selected);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      disabled: !!disabled,
      checked: !!selected
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'checkbox',
      onActivate: handlePress,
      disabled: !!disabled
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: handlePress,
        disabled: !!disabled,
        accessibilityRole: 'checkbox',
        accessibilityLabel: title,
        style: [
          Style_.utilities['br_md'],
          Style_.utilities['p_a_md'],
          {
            borderWidth: 2,
            borderColor: selected
              ? (colorMap.APP_PRIMARY || '#0f62fe')
              : (colorMap.BORDER || '#a8a8a8'),
            backgroundColor: selected
              ? (colorMap.BACKGROUND_SECONDARY || '#f4f4f4')
              : 'transparent'
          },
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      title
        ? React.createElement(Registry.Text, {
          size: 'md',
          color: 'text_primary',
          weight: 'medium'
        }, title)
        : null
    );

  };

};
