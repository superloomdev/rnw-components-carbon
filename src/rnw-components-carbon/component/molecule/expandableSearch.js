// Info: ExpandableSearch molecule [S2 interactive]. A search input that
// collapses to a search icon button and expands on press. Uses M1 (a11y)
// for aria-* state and M8 (useControllableState) for controlled/uncontrolled
// value. Composes TextInput, Icon, and Pressable atoms.
//   value         -> string (controlled)
//   defaultValue  -> string (uncontrolled)
//   onChange      -> callback receiving the text value
//   onClear       -> callback when clear button is pressed
//   placeholder   -> string (default 'Search')
//   disabled      -> boolean
//   defaultExpanded -> boolean (default false)
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the ExpandableSearch molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ExpandableSearch component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const useControllableState = require('../useControllableState')(Lib);
  // a11y not needed: TextInput handles its own aria-* state

  return function ExpandableSearch (props) {

    const {
      value, defaultValue, onChange, onClear, placeholder, disabled,
      defaultExpanded, style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Controlled/uncontrolled state for the search text
    const state = useControllableState({
      value: value,
      defaultValue: defaultValue || '',
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    // Expanded/collapsed state (always uncontrolled)
    const expandState = React.useState(!!defaultExpanded);
    const isExpanded = expandState[0];
    const setIsExpanded = expandState[1];

    const isDisabled = !!disabled;
    const colorMap = Style_.tokens.Color;

    // Clear button handler
    const handleClear = function () {
      setValue('');
      if (Lib.Utils.isFunction(onClear)) {
        onClear();
      }
    };

    // Toggle expand/collapse
    const handleToggle = function () {
      if (isDisabled) {
        return;
      }
      setIsExpanded(!isExpanded);
    };

    // Collapsed state: render just the search icon button
    if (!isExpanded) {
      return React.createElement(
        Pressable,
        {
          onPress: handleToggle,
          disabled: isDisabled,
          accessibilityRole: 'button',
          accessibilityLabel: accessibilityLabel || 'Expand search',
          style: [Style_.utilities['p_h_sm'], Style_.utilities['p_v_sm'], style]
        },
        React.createElement(Registry.Icon, {
          name: 'search',
          size: 'md',
          color: isDisabled ? 'text_muted' : 'text_primary'
        })
      );
    }

    // Expanded state: render the search input with collapse button
    return React.createElement(
      RNView,
      {
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['br_md'],
          Style_.utilities['border_default'],
          isDisabled
            ? { backgroundColor: colorMap.BACKGROUND_SECONDARY || '#f4f4f4' }
            : Style_.utilities['background_surface'],
          Style_.utilities['p_h_sm'],
          style
        ]
      },
      // Search icon (press to collapse)
      React.createElement(
        Pressable,
        {
          onPress: handleToggle,
          disabled: isDisabled,
          accessibilityRole: 'button',
          accessibilityLabel: 'Collapse search',
          style: Style_.utilities['m_e_xs']
        },
        React.createElement(Registry.Icon, {
          name: 'search',
          size: 'sm',
          color: 'TEXT_SECONDARY'
        })
      ),
      // Text input
      React.createElement(
        Registry.TextInput,
        Object.assign({
          value: resolvedValue,
          onChangeText: setValue,
          placeholder: placeholder || 'Search',
          isDisabled: isDisabled,
          accessibilityRole: 'searchbox',
          accessibilityLabel: accessibilityLabel || 'Search',
          style: { flex: 1 }
        }, rest)
      ),
      // Clear button (visible when there is text)
      resolvedValue && !isDisabled
        ? React.createElement(
          Pressable,
          {
            onPress: handleClear,
            accessibilityRole: 'button',
            accessibilityLabel: 'Clear search',
            style: Style_.utilities['m_s_xs']
          },
          React.createElement(Registry.Icon, {
            name: 'close',
            size: 'sm',
            color: 'TEXT_MUTED'
          })
        )
        : null
    );

  };

};
