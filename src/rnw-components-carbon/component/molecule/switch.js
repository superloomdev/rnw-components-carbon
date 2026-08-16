// Info: Switch molecule [S2 interactive]. A content switcher button with
// role="button" that toggles selected state. Used inside the ContentSwitcher
// composite. Uses M1 (a11y) for aria-pressed and aria-disabled, and M2
// (usePressKeys) for keyboard activation. Can optionally consume
// ContentSwitcher context for selection coordination.
//   label       -> string (switch label text)
//   selected    -> boolean, whether this switch is selected
//   onPress     -> function (press handler)
//   disabled    -> boolean
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the Switch molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Switch component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  const getSharedContext = require('../context/sharedContext');

  // Get the shared ContentSwitcher context (cached per Lib instance)
  const contentSwitcherCtx = getSharedContext(Lib, 'ContentSwitcher');

  return function Switch (props) {

    const {
      label, selected, onPress, disabled, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    // Read ContentSwitcher context if available
    const ctxValue = React.useContext(contentSwitcherCtx.Context);

    // Determine selected state: context overrides props
    const isSelected = ctxValue ? (ctxValue.selectedIndex === ctxValue.index) : !!selected;
    const isDisabled = !!disabled;

    // Determine focusable from roving tab index
    const focusable = ctxValue ? ctxValue.focusable : undefined;

    // Handle press
    const handlePress = function () {
      if (isDisabled) {
        return;
      }
      if (Lib.Utils.isFunction(onPress)) {
        onPress();
      }
      if (ctxValue && Lib.Utils.isFunction(ctxValue.onChange)) {
        ctxValue.onChange(ctxValue.index);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      pressed: isSelected,
      disabled: isDisabled
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'button',
      onActivate: handlePress,
      disabled: isDisabled
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: isDisabled ? null : handlePress,
        disabled: isDisabled,
        accessibilityRole: 'button',
        accessibilityLabel: label,
        focusable: focusable,
        style: [
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          Style.utilities['m_r_sm'],
          Style.utilities['br_sm'],
          {
            backgroundColor: isSelected
              ? (colorMap.APP_PRIMARY || '#0f62fe')
              : (colorMap.BACKGROUND_SECONDARY || '#f4f4f4')
          },
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      React.createElement(Registry.Text, {
        size: 'sm',
        color: isSelected ? 'text_on_primary' : 'text_secondary',
        weight: 'medium'
      }, label)
    );

  };

};
