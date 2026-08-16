// Info: OperationalTag molecule [S2 interactive]. An operational tag with an
// action. Uses role="button" for screen reader semantics. Uses M1 (a11y) for
// aria-* state and M2 (usePressKeys) for keyboard activation.
//   text        -> string (the tag label)
//   onAction    -> function (called when the tag is pressed)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the OperationalTag molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The OperationalTag component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function OperationalTag (props) {

    const {
      text, onAction, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({});

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: onAction,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onAction,
        accessibilityRole: 'button',
        accessibilityLabel: text
      }, ariaProps, pressKeysProps, {
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['p_h_sm'],
          Style_.utilities['p_v_xs'],
          Style_.utilities['br_pill'],
          {
            borderWidth: 1,
            borderColor: colorMap.BORDER || '#e0e0e0',
            backgroundColor: colorMap.BACKGROUND_SECONDARY || '#f4f4f4'
          },
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'sm',
        color: 'text_primary'
      }, text)
    );

  };

};
