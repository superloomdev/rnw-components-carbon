// Info: TableToolbarSearch molecule [S2 interactive]. A search input for
// filtering table rows. Uses role="searchbox" for screen reader semantics.
// Composes the TextInput atom with a leading search icon.
//   value       -> string (controlled search value)
//   onChange    -> callback receiving the text value
//   placeholder -> string (placeholder text, default 'Search')
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TableToolbarSearch molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableToolbarSearch component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function TableToolbarSearch (props) {

    const {
      value, onChange, placeholder, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      {
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['br_md'],
          Style.utilities['border_default'],
          Style.utilities['background_surface'],
          Style.utilities['p_h_sm'],
          style
        ]
      },
      React.createElement(Registry.Icon, {
        name: 'search',
        size: 'sm',
        color: 'TEXT_SECONDARY',
        style: Style.utilities['m_e_xs']
      }),
      React.createElement(
        Registry.TextInput,
        Object.assign({
          value: value,
          onChangeText: onChange,
          placeholder: placeholder || 'Search',
          accessibilityRole: 'searchbox',
          accessibilityLabel: 'Search table',
          style: { flex: 1 }
        }, rest)
      )
    );

  };

};
