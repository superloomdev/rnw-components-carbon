// Info: TableExpandHeader molecule [S1 presentational]. A header cell with an
// expand/collapse toggle for expandable rows. Uses role="columnheader" for
// screen reader semantics and exposes aria-expanded for the toggle state.
//   isExpanded -> boolean, whether the row group is currently expanded
//   onToggle   -> function invoked when the toggle is pressed
//   style      -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the TableExpandHeader molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The TableExpandHeader component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);

  return function TableExpandHeader (props) {

    const {
      isExpanded, onToggle, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    const ariaProps = a11y.state({
      expanded: !!isExpanded
    });

    const toggle = React.createElement(
      Pressable,
      {
        onPress: onToggle,
        accessibilityRole: 'button',
        accessibilityLabel: isExpanded ? 'Collapse row' : 'Expand row',
        style: [
          Style_.utilities['p_h_sm'],
          Style_.utilities['p_v_xs']
        ]
      },
      React.createElement(Registry.Icon, {
        name: isExpanded ? 'chevron-up' : 'chevron-down',
        size: 'sm',
        color: 'TEXT_SECONDARY'
      })
    );

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'columnheader',
        style: [
          Style_.utilities['p_h_sm'],
          Style_.utilities['p_v_sm'],
          style
        ]
      }, ariaProps, rest),
      toggle
    );

  };

};
