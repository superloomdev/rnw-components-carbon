// Info: IconSwitch molecule [S2 interactive]. A switch with an icon. Uses
// role="switch" for screen reader semantics. Uses M1 (a11y) for aria-* state
// and M2 (usePressKeys) for keyboard activation.
//   icon        -> string (icon name)
//   checked     -> boolean (whether the switch is on)
//   onToggle    -> function (called with next boolean)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the IconSwitch molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The IconSwitch component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function IconSwitch (props) {

    const {
      icon, checked, onToggle, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;
    const isChecked = !!checked;

    // Handle toggle
    const handlePress = function () {
      if (Lib.Utils.isFunction(onToggle)) {
        onToggle(!isChecked);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      checked: isChecked
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'switch',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: handlePress,
        accessibilityRole: 'switch',
        accessibilityLabel: icon
      }, ariaProps, pressKeysProps, {
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          {
            width: 48,
            height: 28,
            borderRadius: 14,
            backgroundColor: isChecked
              ? (colorMap.APP_PRIMARY || '#0f62fe')
              : (colorMap.BACKGROUND_SECONDARY || '#f4f4f4'),
            padding: 2
          },
          style
        ]
      }, rest),
      icon
        ? React.createElement(Registry.Icon, {
          name: icon,
          size: 'sm',
          color: isChecked ? 'text_on_primary' : 'TEXT_SECONDARY'
        })
        : null
    );

  };

};
