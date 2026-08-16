// Info: M3 - Roving tab index for composite widgets.
//
// For Tabs, RadioButtonGroup, Menu, ContentSwitcher, TreeView, PaginationNav.
// Exactly one item carries focusable={true}; every other carries
// focusable={false}. Arrow keys move the active index. On native, returns
// focusable values but no key handlers, because native screen readers use
// swipe order rather than tab order.
//
// You must pass focusable={false} explicitly to unselected items. RNW
// auto-assigns tabindex="0" to radio and checkbox roles, so omitting it
// produces a tab stop on every item.
'use strict';

const { Platform } = require('react-native');


/********************************************************************
Build the useRovingTabIndex hook.

@param {Object} Lib - The shared Lib container (requires React)

@return {Function} - useRovingTabIndex(options) -> { getItemProps, containerProps }
*********************************************************************/
module.exports = function (Lib) {

  const React = Lib.React;


  return function useRovingTabIndex (options) {

    const count = options.count;
    const activeIndex = options.activeIndex;
    const onActiveIndexChange = options.onActiveIndexChange;
    const orientation = options.orientation || 'horizontal';
    const loop = options.loop !== false;


    // Arrow key handler on the container
    const handleKeyDown = React.useCallback(function (event) {

      let nextIndex;

      // Determine which keys to listen to based on orientation
      const isHorizontal = orientation === 'horizontal';
      const forwardKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
      const backwardKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

      if (event.key === forwardKey) {
        nextIndex = activeIndex + 1;
      } else if (event.key === backwardKey) {
        nextIndex = activeIndex - 1;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = count - 1;
      } else {
        return;
      }

      // Wrap around when loop is enabled
      if (loop) {
        if (nextIndex >= count) {
          nextIndex = 0;
        } else if (nextIndex < 0) {
          nextIndex = count - 1;
        }
      } else {
        nextIndex = Math.max(0, Math.min(count - 1, nextIndex));
      }

      // Prevent default scroll behavior
      event.preventDefault();

      if (nextIndex !== activeIndex && Lib.Utils.isFunction(onActiveIndexChange)) {
        onActiveIndexChange(nextIndex);
      }

    }, [activeIndex, count, orientation, loop, onActiveIndexChange]);


    // Container props: key handler on web only
    const containerProps = {};

    if (Platform.OS === 'web') {
      containerProps.onKeyDown = handleKeyDown;
    }


    // Per-item props: focusable on the active item only
    const getItemProps = function (index) {

      const isActive = index === activeIndex;
      const props = {
        focusable: isActive
      };

      // On web, the active item gets tabindex 0; others get -1
      // RNW reads focusable and translates it
      return props;

    };


    return {
      getItemProps: getItemProps,
      containerProps: containerProps
    };

  };

};
