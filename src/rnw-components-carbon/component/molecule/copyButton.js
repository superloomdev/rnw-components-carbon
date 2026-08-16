// Info: CopyButton molecule [S2 interactive]. A button that copies text to
// clipboard and shows a success state. Uses M1 (a11y) for aria-* state and
// M6 (useAnnounce) for screen reader announcement of the copy action.
//   text        -> string (the text to copy)
//   label       -> string (button label, default 'Copy')
//   onCopy      -> function (callback after copy)
//   disabled    -> boolean
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the CopyButton molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The CopyButton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function CopyButton (props) {

    const {
      text, label, onCopy, disabled, style,
      ...rest
    } = props;

    const React = Lib.React;
    const [copied, setCopied] = React.useState(false);

    // Handle copy action
    const handlePress = function () {
      if (disabled) {
        return;
      }

      // Use clipboard if available
      if (Lib.Clipboard && Lib.Utils.isFunction(Lib.Clipboard.setString)) {
        Lib.Clipboard.setString(text);
      }

      setCopied(true);
      setTimeout(function () {
        setCopied(false);
      }, 2000);

      if (Lib.Utils.isFunction(onCopy)) {
        onCopy(text);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      disabled: !!disabled,
      pressed: copied
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: handlePress,
        disabled: !!disabled,
        accessibilityRole: 'button',
        accessibilityLabel: label || 'Copy',
        style: [
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          Style.utilities['br_md'],
          Style.utilities['border_default'],
          Style.utilities['background_surface'],
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          style
        ]
      }, ariaProps, rest),
      React.createElement(Registry.Icon, {
        name: copied ? 'checkmark' : 'copy',
        size: 'sm',
        color: 'TEXT_SECONDARY',
        style: Style.utilities['m_e_xs']
      }),
      React.createElement(Registry.Text, {
        size: 'md',
        color: disabled ? 'text_muted' : 'text_primary'
      }, copied ? 'Copied!' : (label || 'Copy'))
    );

  };

};
