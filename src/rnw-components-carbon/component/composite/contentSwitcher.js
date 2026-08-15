// Info: ContentSwitcher composite [S4 compound]. A content switcher
// container with role="tablist" that coordinates Switch children. Uses M1
// (a11y), M3 (useRovingTabIndex), M7 (createCompoundContext). Wraps each
// Switch child in a context Provider so it can read its index, selected
// state, and focusable flag without cloneElement.
//   selectedIndex -> number (0-based active switch index)
//   onChange      -> function (called with new index)
//   children      -> Switch elements
//   style         -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the ContentSwitcher composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ContentSwitcher component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const getSharedContext = require('../context/sharedContext');
  const useRovingTabIndex = require('../useRovingTabIndex')(Lib);

  // Get the shared compound context (cached per Lib instance)
  const ctx = getSharedContext(Lib, 'ContentSwitcher');

  return function ContentSwitcher (props) {

    const {
      selectedIndex, onChange, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    const activeIndex = Lib.Utils.isNumber(selectedIndex) ? selectedIndex : 0;
    const childArray = React.Children.toArray(children);
    const count = childArray.length;

    // Roving tab index for arrow key navigation
    const roving = useRovingTabIndex({
      count: count,
      activeIndex: activeIndex,
      onActiveIndexChange: function (nextIndex) {
        if (Lib.Utils.isFunction(onChange)) {
          onChange(nextIndex);
        }
      },
      orientation: 'horizontal',
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
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          style
        ]
      }, roving.containerProps, rest),
      wrappedChildren
    );

  };

};
