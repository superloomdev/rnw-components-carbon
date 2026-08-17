// Info: DocumentViewer molecule [S1 presentational]. A document viewer that
// displays content from a URL or HTML string. Uses role="document" for
// screen reader semantics. Platform: split (web uses iframe, native uses
// WebView). P3 establishes the prop contract; platform split is P6.
//   source      -> string (URL or HTML content)
//   style       -> custom style overrides


// Imports
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the DocumentViewer molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The DocumentViewer component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const DocumentViewer = function DocumentViewer (props) {


    // Destructure props
    const {
      source, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'document',
        style: [
          Style.utilities['flex_1'],
          style
        ]
      }, rest),
      React.createElement(Registry.Text, null, source || '')
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _DocumentViewer = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return DocumentViewer;

}/////////////////////////// Component Factory END /////////////////////////////
