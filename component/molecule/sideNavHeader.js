// Info: SideNavHeader molecule [S1 presentational]. A header section in the
// side nav. Uses role="group" for screen reader semantics.
//   title       -> string (section title)
//   children    -> header content elements
//   style       -> custom style overrides


// Imports
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the SideNavHeader molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The SideNavHeader component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const SideNavHeader = function SideNavHeader (props) {


    const {
      title, children, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style.utilities['flex_col'],
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          style
        ]
      }, rest),
      title
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_secondary',
          weight: 'medium',
          style: Style.utilities['m_b_xs']
        }, title)
        : null,
      children
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _SideNavHeader = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return SideNavHeader;

}/////////////////////////// Component Factory END /////////////////////////////
