// Info: M2 - Keyboard activation per role.
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
'use strict';

const { Platform } = require('react-native');


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
module.exports = function (Lib) {

  const React = Lib.React;


  return function usePressKeys (options) {

    const role = options.role;
    const onActivate = options.onActivate;
    const disabled = options.disabled;


    // On native, activation already works; return nothing
    if (Platform.OS !== 'web') {
      return {};
    }


    // Stable keydown handler
    const handleKeyDown = React.useCallback(function (event) {

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


    return {
      onKeyDown: handleKeyDown
    };

  };

};
