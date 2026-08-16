// Info: DataTableHeaderSelected molecule [S1 presentational]. A header shown
// when rows are selected, displaying the selected count and batch actions.
// Uses role="row" for screen reader semantics. Renders the count and batch
// action buttons on the leading edge and a cancel button on the trailing edge.
//   selectedCount -> number of selected rows
//   batchActions  -> array of action objects { label, onPress, kind }
//   onCancel      -> function invoked when the cancel button is pressed
//   style         -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the DataTableHeaderSelected molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The DataTableHeaderSelected component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function DataTableHeaderSelected (props) {

    const {
      selectedCount, batchActions, onCancel, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    const count = selectedCount || 0;
    const countText = count + ' item' + (count === 1 ? '' : 's') + ' selected';

    const actions = (batchActions || []).map(function (action, index) {
      return React.createElement(Registry.Button, {
        key: 'batch-' + index,
        kind: action.kind || 'secondary',
        onPress: action.onPress,
        accessibilityLabel: action.label,
        style: Style.utilities['m_s_xs']
      }, action.label);
    });

    const cancelButton = onCancel
      ? React.createElement(
        Pressable,
        {
          onPress: onCancel,
          accessibilityRole: 'button',
          accessibilityLabel: 'Cancel',
          style: Style.utilities['m_s_xs']
        },
        React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_primary'
        }, 'Cancel')
      )
      : null;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'row',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['justify_between'],
          Style.utilities['background_background_secondary'],
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          style
        ]
      }, rest),
      React.createElement(
        RNView,
        { style: Style.utilities['flex_row'] },
        React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_primary',
          weight: 'medium'
        }, countText),
        actions
      ),
      cancelButton
    );

  };

};
