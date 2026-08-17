// Info: TableToolbarSearch molecule [S2 interactive]. A search input for
// filtering table rows. Uses role="searchbox" for screen reader semantics.
// Composes the TextInput atom with a leading search icon.
//   value       -> string (controlled search value)
//   onChange    -> callback receiving the text value
//   placeholder -> string (placeholder text, default 'Search')
//   style       -> custom style overrides


// Imports
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the TableToolbarSearch molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableToolbarSearch component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const TableToolbarSearch = function TableToolbarSearch (props) {


    const {
      value, onChange, placeholder, style,
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
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _TableToolbarSearch = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return TableToolbarSearch;

}/////////////////////////// Component Factory END /////////////////////////////
