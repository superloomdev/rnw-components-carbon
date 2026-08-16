// Info: Tab molecule [S2 interactive]. A tab trigger with role="tab" that
// fires onPress when activated. Uses M1 (a11y) for aria-selected and
// aria-disabled, and M2 (usePressKeys) for keyboard activation. Can
// optionally consume Tabs context for roving tab index coordination.
//   label       -> string (tab label text)
//   selected    -> boolean, whether this tab is selected
//   onPress     -> function (press handler)
//   disabled    -> boolean
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the Tab molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Tab component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  const getSharedContext = require('../context/sharedContext');

  // Get the shared Tabs context (cached per Lib instance)
  const tabsCtx = getSharedContext(Lib, 'Tabs');

  return function Tab (props) {

    const {
      label, selected, onPress, disabled, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    // Read Tabs context if available (for roving tab index)
    const ctxValue = React.useContext(tabsCtx.Context);

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
      selected: isSelected,
      disabled: isDisabled
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'tab',
      onActivate: handlePress,
      disabled: isDisabled
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: isDisabled ? null : handlePress,
        disabled: isDisabled,
        accessibilityRole: 'tab',
        accessibilityLabel: label,
        focusable: focusable,
        style: [
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          Style.utilities['m_r_sm'],
          {
            borderBottomWidth: 2,
            borderBottomColor: isSelected
              ? (colorMap.APP_PRIMARY || '#0f62fe')
              : 'transparent'
          },
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: isSelected ? 'text_primary' : 'text_secondary',
        weight: isSelected ? 'medium' : 'regular'
      }, label)
    );

  };

};
