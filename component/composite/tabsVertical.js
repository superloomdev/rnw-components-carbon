// Info: TabsVertical composite [S4 compound]. A vertical tabs container
// coordinating TabListVertical and TabPanels. Uses role="tablist" for
// screen reader semantics. Uses A11y, RovingTabIndex, M7
// (createCompoundContext). Wraps each child in a context Provider so it
// can read its index, selected state, and focusable flag without
// cloneElement (which breaks under the HOC).
//   selectedIndex -> number (0-based active tab index)
//   onChange      -> function (called with new index)
//   children      -> TabListVertical and TabPanels elements
//   style         -> custom style overrides


// Imports
import getSharedContext from '../context/sharedContext.js';
import { View as RNView } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the TabsVertical composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TabsVertical component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////

  // Get the shared compound context (cached per Lib instance)
  const ctx = getSharedContext(Lib, 'TabsVertical');

  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const TabsVertical = function TabsVertical (props) {


    const {
      selectedIndex, onChange, children, style,
      ...rest
    } = props;

    const React = Lib.React;

    const activeIndex = Lib.Utils.isNumber(selectedIndex) ? selectedIndex : 0;
    const childArray = React.Children.toArray(children);
    const count = childArray.length;

    // Roving tab index for arrow key navigation (vertical orientation)
    const roving = Parts.RovingTabIndex({
      count: count,
      activeIndex: activeIndex,
      onActiveIndexChange: function (nextIndex) {
        if (Lib.Utils.isFunction(onChange)) {
          onChange(nextIndex);
        }
      },
      orientation: 'vertical',
      loop: true
    });

    // Wrap each child in a Provider with its index and state
    const wrappedChildren = childArray.map(function (child, index) {
      const itemProps = roving.getItemProps(index);
      return React.createElement(
        ctx.Provider,
        {
          key: index,
          value: {
            selectedIndex: activeIndex,
            onChange: onChange,
            index: index,
            focusable: itemProps.focusable
          }
        },
        child
      );
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'tablist',
        style: [
          Style.utilities['flex_row'],
          style
        ]
      }, roving.containerProps, rest),
      wrappedChildren
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _TabsVertical = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return TabsVertical;

}/////////////////////////// Component Factory END /////////////////////////////
