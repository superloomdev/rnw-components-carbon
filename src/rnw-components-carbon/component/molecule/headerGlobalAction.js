// Info: HeaderGlobalAction molecule [S2 interactive]. A global action button
// in the header. Uses role="button" for screen reader semantics. Uses M1
// (a11y) for aria-* state and M2 (usePressKeys) for keyboard activation.
//   icon        -> string (icon name)
//   onPress     -> function (press handler)
//   label       -> string (accessibility label)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the HeaderGlobalAction molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The HeaderGlobalAction component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function HeaderGlobalAction (props) {

    const {
      icon, onPress, label, style, isRtlActive, // eslint-disable-line no-unused-vars
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
        accessibilityLabel: label || icon
      }, ariaProps, pressKeysProps, {
        style: [
          Style_.utilities['p_a_sm'],
          Style_.utilities['br_sm'],
          style
        ]
      }, rest),
      icon
        ? React.createElement(Registry.Icon, {
          name: icon,
          size: 'md',
          color: 'TEXT_PRIMARY'
        })
        : React.createElement(Registry.Text, {
          size: 'md',
          color: 'text_primary'
        }, label || '')
    );

  };

};
