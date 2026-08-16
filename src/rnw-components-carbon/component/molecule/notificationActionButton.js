// Info: NotificationActionButton molecule [S2 interactive]. An action button
// in a notification. Uses role="button" for screen reader semantics. Uses M1
// (a11y) for aria-* state and M2 (usePressKeys) for keyboard activation.
//   text        -> string (button label)
//   onPress     -> function (press handler)
//   kind        -> string (button kind, optional)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the NotificationActionButton molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The NotificationActionButton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function NotificationActionButton (props) {

    const {
      text, onPress, kind, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({});

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: onPress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'button',
        accessibilityLabel: text
      }, ariaProps, pressKeysProps, {
        style: [
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_sm'],
          Style_.utilities['br_md'],
          {
            backgroundColor: kind === 'primary'
              ? (colorMap.APP_PRIMARY || '#0f62fe')
              : 'transparent',
            borderWidth: kind === 'primary' ? 0 : 1,
            borderColor: colorMap.BORDER || '#e0e0e0'
          },
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'sm',
        color: kind === 'primary' ? 'text_on_primary' : 'text_primary',
        weight: 'medium'
      }, text)
    );

  };

};
