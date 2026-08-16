// Info: HeaderMenuItem molecule [S2 interactive]. A single item in a header
// menu. Uses role="menuitem" for screen reader semantics. Uses M1 (a11y)
// for aria-* state and M2 (usePressKeys) for keyboard activation.
//   text        -> string (item label)
//   onPress     -> function (press handler)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the HeaderMenuItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The HeaderMenuItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function HeaderMenuItem (props) {

    const {
      text, onPress, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({});

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'menuitem',
      onActivate: onPress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'menuitem',
        accessibilityLabel: text
      }, ariaProps, pressKeysProps, {
        style: [
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_sm'],
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_primary'
      }, text || '')
    );

  };

};
