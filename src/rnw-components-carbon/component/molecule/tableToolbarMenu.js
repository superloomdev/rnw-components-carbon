// Info: TableToolbarMenu molecule [S2 interactive]. A dropdown menu in the
// table toolbar. Uses role="button" (on the trigger) for screen reader
// semantics. Composes the OverflowMenu composite, forwarding label as the
// trigger label and children as the menu items.
//   label       -> string (trigger label, default 'Options')
//   children    -> array of menu item objects { label, onPress, disabled }
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TableToolbarMenu molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableToolbarMenu component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  return function TableToolbarMenu (props) {

    const {
      label, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      { style: style },
      React.createElement(Registry.OverflowMenu, Object.assign({
        triggerLabel: label || 'Options',
        items: children
      }, rest))
    );

  };

};
