// Info: NotificationButton molecule [S2 interactive]. A dismiss button for a
// notification. Uses role="button" for screen reader semantics. Uses M1 (a11y)
// for aria-* state and M2 (usePressKeys) for keyboard activation.
//   onPress     -> function (press handler)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the NotificationButton molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The NotificationButton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function NotificationButton (props) {

    const {
      onPress, style,
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({});

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'button',
      onActivate: onPress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'button',
        accessibilityLabel: 'Dismiss notification'
      }, ariaProps, pressKeysProps, {
        style: [
          Style.utilities['p_a_xs'],
          style
        ]
      }, rest),
      React.createElement(Registry.Icon, {
        name: 'close',
        size: 'sm',
        color: 'TEXT_SECONDARY'
      })
    );

  };

};
