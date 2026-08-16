// Info: DataTableCell molecule [S1 presentational]. A cell in a DataTable.
// Uses role="cell" for screen reader semantics. Renders the content string
// with padding; type="header" styles the text as a secondary header label.
// When onPress is provided the cell becomes pressable while keeping role="cell".
//   content     -> string or node rendered inside the cell
//   type        -> 'default' | 'header' (controls text styling)
//   width       -> numeric cell width in pixels
//   onPress     -> optional press handler (makes the cell pressable)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the DataTableCell molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The DataTableCell component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function DataTableCell (props) {

    const {
      content, type, width, onPress, style,
      ...rest
    } = props;

    const React = Lib.React;
    const isHeader = type === 'header';

    const cellStyle = [
      Style.utilities['flex_1'],
      Style.utilities['p_h_md'],
      Style.utilities['p_v_sm'],
      Lib.Utils.isNumber(width) ? { width: width } : null,
      style
    ];

    const textElement = React.createElement(Registry.Text, {
      size: 'sm',
      color: isHeader ? 'text_secondary' : 'text_primary',
      weight: isHeader ? 'medium' : 'regular'
    }, content == null ? '' : String(content));

    if (onPress) {
      return React.createElement(
        Pressable,
        Object.assign({
          onPress: onPress,
          accessibilityRole: 'cell',
          style: cellStyle
        }, rest),
        textElement
      );
    }

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'cell',
        style: cellStyle
      }, rest),
      textElement
    );

  };

};
