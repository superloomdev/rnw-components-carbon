// Info: Copy molecule [S2 interactive]. A copy-to-clipboard button. Uses
// role="button" for screen reader semantics. Uses M1 (a11y) for aria-* state
// and M2 (usePressKeys) for keyboard activation. Platform: split (web uses
// navigator.clipboard, native uses injected clipboard).
//   text        -> string (the text to copy)
//   onSuccess   -> function (callback after successful copy)
//   style       -> custom style overrides
/* global navigator */
'use strict';

const { Pressable, Platform } = require('react-native');


/********************************************************************
Build the Copy molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Copy component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function Copy (props) {

    const {
      text, onSuccess, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const [copied, setCopied] = React.useState(false);

    // Handle copy action
    const handlePress = function () {

      // Web: use navigator.clipboard; native: use injected Lib.Clipboard
      if (Platform.OS === 'web') {
        if (typeof navigator !== 'undefined' &&
            navigator.clipboard &&
            Lib.Utils.isFunction(navigator.clipboard.writeText)) {
          navigator.clipboard.writeText(text);
        }
      } else if (Lib.Clipboard && Lib.Utils.isFunction(Lib.Clipboard.setString)) {
        Lib.Clipboard.setString(text);
      }

      setCopied(true);
      setTimeout(function () {
        setCopied(false);
      }, 2000);

      if (Lib.Utils.isFunction(onSuccess)) {
        onSuccess(text);
      }

    };

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      pressed: copied
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: handlePress,
        accessibilityRole: 'button',
        accessibilityLabel: 'Copy to clipboard'
      }, ariaProps, pressKeysProps, {
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_sm'],
          Style_.utilities['br_md'],
          Style_.utilities['border_default'],
          Style_.utilities['background_surface'],
          style
        ]
      }, rest),
      React.createElement(Registry.Icon, {
        name: copied ? 'checkmark' : 'copy',
        size: 'sm',
        color: 'TEXT_SECONDARY',
        style: Style_.utilities['m_e_xs']
      }),
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_primary'
      }, copied ? 'Copied!' : 'Copy')
    );

  };

};
