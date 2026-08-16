// Info: TableBatchAction molecule [S2 interactive]. A single action button used
// within TableBatchActions for batch operations. Uses M1 (a11y) for aria-* state
// and M2 (usePressKeys) for keyboard activation.
//   label       -> button text
//   onPress     -> press handler
//   disabled    -> boolean
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the TableBatchAction molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableBatchAction component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function TableBatchAction (props) {

    const {
      label, onPress, disabled, style, isRtlActive, // eslint-disable-line no-unused-vars
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
        accessibilityLabel: label,
        style: [
          Style.utilities['p_h_sm'],
          Style.utilities['p_v_xs'],
          Style.utilities['br_md'],
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      React.createElement(Registry.Text, {
        size: 'sm',
        color: 'text_primary',
        weight: 'medium'
      }, label)
    );

  };

};
