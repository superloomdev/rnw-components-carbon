// Info: Roving tab index for composite widgets.
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

// Imports
import { Platform as RNPlatform } from 'react-native';


/////////////////////////// Module-Loader START ////////////////////////////////

/********************************************************************
Factory part loader. Uniform parts signature.

@param {Object} shared_libs - Lib container with Utils, Debug, React
@param {Object} config - Merged config from the parent module
@param {Object} errors - Frozen error catalog from the parent module

@return {Function} - useRovingTabIndex hook
*********************************************************************/
export default function (shared_libs, config, errors) { // eslint-disable-line no-unused-vars

  // Capture shared libraries for this part
  const Lib = { Utils: shared_libs.Utils, Debug: shared_libs.Debug, React: shared_libs.React };

  // Delegate to createInterface to build the hook
  return createInterface(Lib);

}/////////////////////////// Module-Loader END /////////////////////////////////



/////////////////////////// createInterface START //////////////////////////////

/********************************************************************
Build the useRovingTabIndex hook.

@param {Object} Lib - The shared Lib container (requires React)

@return {Function} - useRovingTabIndex(options) -> { getItemProps, containerProps }
*********************************************************************/
const createInterface = function (Lib) {


  ///////////////////////////Public Functions START//////////////////////////////

  const useRovingTabIndex = function (options) {

    // Destructure roving tab index options: count, activeIndex, orientation, loop
    const count = options.count;
    const activeIndex = options.activeIndex;
    const onActiveIndexChange = options.onActiveIndexChange;
    const orientation = options.orientation || 'horizontal';
    const loop = options.loop !== false;


    // Arrow key handler on the container
    const handleKeyDown = Lib.React.useCallback(function (event) {

      // Track the candidate next index for the arrow key press
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

      // Notify the parent of the new active index when it changes
      if (nextIndex !== activeIndex && Lib.Utils.isFunction(onActiveIndexChange)) {
        onActiveIndexChange(nextIndex);
      }

    }, [activeIndex, count, orientation, loop, onActiveIndexChange]);


    // Container props: key handler on web only
    const containerProps = {};

    if (RNPlatform.OS === 'web') {
      containerProps.onKeyDown = handleKeyDown;
    }


    // Per-item props: focusable on the active item only
    const getItemProps = function (index) {

      // Mark the active item as focusable; all others are not
      const isActive = index === activeIndex;
      const props = {
        focusable: isActive
      };

      // On web, the active item gets tabindex 0; others get -1
      // RNW reads focusable and translates it
      return props;

    };


    // Return the container props and per-item props getter
    return {
      getItemProps: getItemProps,
      containerProps: containerProps
    };

  };


  // Expose the hook to consumers
  return useRovingTabIndex;

};/////////////////////////// createInterface END //////////////////////////////
