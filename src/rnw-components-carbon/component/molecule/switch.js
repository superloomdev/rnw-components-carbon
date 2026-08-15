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
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Switch component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);
  const getSharedContext = require('../context/sharedContext');

  // Get the shared ContentSwitcher context (cached per Lib instance)
  const contentSwitcherCtx = getSharedContext(Lib, 'ContentSwitcher');

  return function Switch (props) {

    const {
      label, selected, onPress, disabled, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

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
    const ariaProps = a11y.state({
      pressed: isSelected,
      disabled: isDisabled
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
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
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_sm'],
          Style_.utilities['m_r_sm'],
          Style_.utilities['br_sm'],
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
