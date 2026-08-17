// Info: Accordion composite [S4 compound]. An accordion container that
// coordinates AccordionItem children. Uses A11y, M7
// (createCompoundContext). Wraps each AccordionItem child in a context
// Provider so it can read its key, expanded state, and toggle handler
// without cloneElement (which breaks under the HOC).
//   allowMultiple  -> boolean (allow multiple items expanded at once)
//   expandedKeys   -> array (keys of expanded items)
//   onChange       -> function (called with key of toggled item)
//   children       -> AccordionItem elements
//   style          -> custom style overrides


// Imports
import getSharedContext from '../context/sharedContext.js';
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the Accordion composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Accordion component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  /////////////////////////// Static Constants START ////////////////////////////



  // Get the shared compound context (cached per Lib instance)
  const ctx = getSharedContext(Lib, 'Accordion');

  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const Accordion = function Accordion (props) {


    const {
      allowMultiple, expandedKeys, onChange, children, style,
      ...rest
    } = props;

    const React = Lib.React;

    const keys = Array.isArray(expandedKeys) ? expandedKeys : [];
    const childArray = React.Children.toArray(children);

    // Wrap each child in a Provider with its key and state
    const wrappedChildren = childArray.map(function (child, index) {
      return React.createElement(
        ctx.Provider,
        {
          key: index,
          value: {
            allowMultiple: !!allowMultiple,
            expandedKeys: keys,
            onChange: onChange,
            itemKey: index
          }
        },
        child
      );
    });

    return React.createElement(
      RNView,
      Object.assign({
        style: [style]
      }, rest),
      wrappedChildren
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _Accordion = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return Accordion;

}/////////////////////////// Component Factory END /////////////////////////////
