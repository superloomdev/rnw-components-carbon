// Info: FileUploaderButton molecule [S2 interactive]. A button that triggers
// file selection. Uses role="button" for screen reader semantics. Uses M1
// (a11y) for aria-* state and M2 (usePressKeys) for keyboard activation.
//   label       -> string (button label)
//   onPress     -> function (press handler)
//   disabled    -> boolean
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the FileUploaderButton molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The FileUploaderButton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function FileUploaderButton (props) {

    const {
      label, onPress, disabled, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

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
        accessibilityLabel: label || 'Add file'
      }, ariaProps, pressKeysProps, {
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['justify_center'],
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_sm'],
          Style_.utilities['br_sm'],
          {
            backgroundColor: disabled
              ? (colorMap.APP_PRIMARY_DISABLED || '#a6c8ff')
              : (colorMap.APP_PRIMARY || '#0f62fe')
          },
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_on_primary',
        weight: 'medium'
      }, label || 'Add file')
    );

  };

};
