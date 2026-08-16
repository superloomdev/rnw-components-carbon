// Info: SelectItemGroup molecule [S1 presentational]. A group of SelectItem
// options with a label. Uses role="group" for screen reader semantics.
//   label       -> string (the group label)
//   children    -> SelectItem elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the SelectItemGroup molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SelectItemGroup component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function SelectItemGroup (props) {

    const {
      label, children, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        accessibilityLabel: label,
        style: [
          Style.utilities['flex_col'],
          style
        ]
      }, rest),
      label
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_secondary',
          weight: 'medium',
          style: Style.utilities['p_h_md']
        }, label)
        : null,
      children
    );

  };

};
