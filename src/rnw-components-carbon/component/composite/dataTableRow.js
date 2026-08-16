// Info: DataTableRow composite [S2 interactive]. An interactive table row
// with press handling and selection state. Uses M1 (a11y) for aria-* state
// and M2 (usePressKeys) for keyboard activation. role="row".
//   cells       -> array of cell values (strings or elements)
//   onPress     -> press handler (optional; when absent, row is static)
//   selected    -> boolean, whether the row is selected
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the DataTableRow composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The DataTableRow component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function DataTableRow (props) {

    const {
      cells, onPress, selected, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    // Build the row content (shared between pressable and static variants)
    const rowContent = (cells || []).map(function (cell, index) {
      return React.createElement(
        RNView,
        {
          key: 'cell-' + index,
          accessibilityRole: 'cell',
          style: [
            Style.utilities['flex_1'],
            Style.utilities['p_h_md'],
            Style.utilities['p_v_sm']
          ]
        },
        React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_primary'
        }, String(cell))
      );
    });

    // Row container styles
    const rowStyle = [
      Style.utilities['flex_row'],
      Style.utilities['align_center'],
      Style.utilities['border_default'],
      selected
        ? { backgroundColor: (colorMap.BACKGROUND_SECONDARY || '#f4f4f4') }
        : null,
      style
    ];

    // Static (non-pressable) row
    if (!Lib.Utils.isFunction(onPress)) {
      return React.createElement(
        RNView,
        Object.assign({
          accessibilityRole: 'row',
          style: rowStyle
        }, rest),
        rowContent
      );
    }

    // Pressable row: S2 interactive
    const ariaProps = Parts.A11y.state({
      selected: !!selected
    });

    const pressKeysProps = Parts.PressKeys({
      role: 'button',
      onActivate: onPress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'row',
        style: function () {
          return rowStyle;
        }
      }, ariaProps, pressKeysProps, rest),
      rowContent
    );

  };

};
