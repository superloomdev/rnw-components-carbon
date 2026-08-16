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
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ClickableTile component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function ClickableTile (props) {

    const {
      title, subtitle, onPress, disabled, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      disabled: !!disabled
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
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
          Style.utilities['background_surface'],
          Style.utilities['br_md'],
          Style.utilities['border_default'],
          Style.utilities['p_a_md'],
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      title
        ? React.createElement(Registry.Text, {
          size: 'lg',
          color: 'text_primary',
          weight: 'semibold',
          style: Style.utilities['m_b_xs']
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
