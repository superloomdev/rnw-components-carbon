// Info: ClickableTile molecule [S2 interactive]. A tile that acts as a
// button. Uses M1 (a11y) for aria-* state and M2 (usePressKeys) for keyboard.
//   title       -> string
//   subtitle    -> string
//   onPress     -> function
//   disabled    -> boolean
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the ClickableTile molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ClickableTile component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function ClickableTile (props) {

    const {
      title, subtitle, onPress, disabled, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      disabled: !!disabled
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: onPress,
      disabled: !!disabled
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: disabled ? null : onPress,
        disabled: !!disabled,
        accessibilityRole: 'button',
        accessibilityLabel: title,
        style: [
          Style_.utilities['background_surface'],
          Style_.utilities['br_md'],
          Style_.utilities['border_default'],
          Style_.utilities['p_a_md'],
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      title
        ? React.createElement(Registry.Text, {
          size: 'lg',
          color: 'text_primary',
          weight: 'semibold',
          style: Style_.utilities['m_b_xs']
        }, title)
        : null,
      subtitle
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_secondary'
        }, subtitle)
        : null
    );

  };

};
