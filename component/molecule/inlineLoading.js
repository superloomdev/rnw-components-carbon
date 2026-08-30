// Info: InlineLoading molecule [S1 presentational]. A small inline loading
// indicator with optional status text. Uses A11y and useAnnounce.
//   status      -> 'active' | 'inactive' | 'error' (default 'active')
//   label       -> string (loading text, default 'Loading...')
//   style       -> custom style overrides


// Imports
import { View as RNView, ActivityIndicator } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the InlineLoading molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The InlineLoading component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const InlineLoading = function InlineLoading (props) {


    const {
      status, label, style,
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;
    const st = status || 'active';

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      busy: st === 'active'
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'progressbar',
        accessibilityLabel: label || 'Loading',
        style: [Style.utilities['flex_row'], Style.utilities['align_center'], style]
      }, ariaProps, rest),
      st === 'active'
        ? React.createElement(ActivityIndicator, {
          size: 'small',
          color: colorMap.APP_PRIMARY,
          style: Style.utilities['m_e_xs']
        })
        : null,
      React.createElement(Registry.Text, {
        size: 'sm',
        color: st === 'error' ? 'status_danger' : 'text_secondary'
      }, label || (st === 'active' ? 'Loading...' : st === 'error' ? 'Error' : 'Loaded'))
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _InlineLoading = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return InlineLoading;

}/////////////////////////// Component Factory END /////////////////////////////
