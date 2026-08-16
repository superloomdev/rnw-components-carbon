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
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The NotificationButton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function NotificationButton (props) {

    const {
      onPress, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

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
        accessibilityLabel: 'Dismiss notification'
      }, ariaProps, pressKeysProps, {
        style: [
          Style_.utilities['p_a_xs'],
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
