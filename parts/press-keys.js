// Info: Keyboard activation per role.
//
// Fixes the react-native-web PressResponder bug where Space does not
// activate non-button roles (checkbox, radio, switch, menuitem, option,
// tab). RNW's isButtonish check gates Space behind role="button", so a
// Pressable with accessibilityRole="checkbox" does not fire on Space.
// This is a WCAG 2.1.1 failure.
//
// On web: attaches onKeyDown and calls onActivate for Enter always, and
// for Space when the role is one of the gated roles. Calls preventDefault
// on Space to suppress page scroll.
//
// On native: returns an empty object; native activation already works.

// Imports
import { Platform as RNPlatform } from 'react-native';


/////////////////////////// Module-Loader START ////////////////////////////////

/********************************************************************
    Factory part loader. Uniform parts signature.

    @param {Object} shared_libs - Lib container with Utils, Debug, React
    @param {Object} config - Merged config from the parent module
    @param {Object} errors - Frozen error catalog from the parent module

    @return {Function} - usePressKeys hook
*********************************************************************/
export default function (shared_libs, config, errors) { // eslint-disable-line no-unused-vars

  // Capture shared libraries for this part
  const Lib = { Utils: shared_libs.Utils, Debug: shared_libs.Debug, React: shared_libs.React };

  // Delegate to createInterface to build the hook
  return createInterface(Lib);

}/////////////////////////// Module-Loader END /////////////////////////////////



/////////////////////////// createInterface START //////////////////////////////

// Roles that should activate on Space (in addition to Enter)
const SPACE_ACTIVATING_ROLES = {
  checkbox: true,
  radio: true,
  switch: true,
  menuitem: true,
  option: true,
  tab: true
};


/********************************************************************
    Build the usePressKeys hook. Returns a React hook that normalizes
    Enter and Space activation per role.

    @param {Object} Lib - The shared Lib container (requires React)

    @return {Function} - usePressKeys({ role, onActivate, disabled }) -> props
*********************************************************************/
const createInterface = function (Lib) {


  ///////////////////////////Public Functions START//////////////////////////////

  const usePressKeys = function (options) {

    // Destructure activation options: role, onActivate, disabled
    const role = options.role;
    const onActivate = options.onActivate;
    const disabled = options.disabled;


    // On native, activation already works; return nothing
    if (RNPlatform.OS !== 'web') {
      return {};
    }


    // Stable keydown handler
    const handleKeyDown = Lib.React.useCallback(function (event) {

      // Ignore when disabled
      if (disabled) {
        return;
      }

      // Enter always activates
      if (event.key === 'Enter') {
        if (Lib.Utils.isFunction(onActivate)) {
          onActivate(event);
        }
        return;
      }

      // Space activates for gated roles; preventDefault to stop page scroll
      if (event.key === ' ' && SPACE_ACTIVATING_ROLES[role]) {
        event.preventDefault();
        if (Lib.Utils.isFunction(onActivate)) {
          onActivate(event);
        }
      }

    }, [role, onActivate, disabled]);


    // Return the keydown handler for the host element
    return {
      onKeyDown: handleKeyDown
    };

  };


  // Expose the hook to consumers
  return usePressKeys;

};/////////////////////////// createInterface END //////////////////////////////
