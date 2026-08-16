// Info: MenuItemRadioGroup composite [S4 compound]. A group of menu items
// with role="group" where exactly one is selected. Uses M1 (a11y),
// M3 (useRovingTabIndex), M7 (createCompoundContext).
//   items       -> array of { label, value }
//   value       -> string (selected value)
//   onChange    -> function (called with selected value)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the MenuItemRadioGroup composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The MenuItemRadioGroup component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  return function MenuItemRadioGroup (props) {

    const {
      items, value, onChange, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build radio menu items
    const radioItems = (items || []).map(function (item) {
      return React.createElement(Registry.MenuItemSelectable, {
        key: item.value,
        label: item.label,
        checked: item.value === value,
        onChange: function () {
          if (Lib.Utils.isFunction(onChange)) {
            onChange(item.value);
          }
        }
      });
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [style]
      }, rest),
      radioItems
    );

  };

};
