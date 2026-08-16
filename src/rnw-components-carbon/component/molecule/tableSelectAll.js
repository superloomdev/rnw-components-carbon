// Info: TableSelectAll molecule [S2 interactive]. A header cell with a
// checkbox to select all rows. Uses role="columnheader" for screen reader
// semantics. Composes the Checkbox atom and forwards its toggle to
// onSelectAll.
//   checked     -> true | false | 'mixed' (current selection state)
//   onSelectAll -> function receiving the next boolean
//   ariaLabel   -> string (accessibility label for the checkbox)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TableSelectAll molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The TableSelectAll component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function TableSelectAll (props) {

    const {
      checked, onSelectAll, ariaLabel, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    const handleChange = function (next) {

      if (Lib.Utils.isFunction(onSelectAll)) {
        onSelectAll(next);
      }

    };

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'columnheader',
        style: [
          Style_.utilities['p_h_sm'],
          Style_.utilities['p_v_sm'],
          style
        ]
      }, rest),
      React.createElement(Registry.Checkbox, {
        checked: checked,
        onChange: handleChange,
        accessibilityLabel: ariaLabel || 'Select all rows'
      })
    );

  };

};
