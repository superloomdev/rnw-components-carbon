// Info: The single Higher-Order Component every atom/molecule is wrapped with.
// It injects `isRtlActive` so each component can make per-platform RTL decisions
// without re-deriving direction. Uses Platform and I18nManager from react-native
// directly (not an app-local client file, which is not available to consumers).
'use strict';

const { I18nManager, Platform } = require('react-native');


/********************************************************************
Build the RTL-injecting HOC. Resolves direction once per build.

Web reads the locale config; native reads I18nManager.isRTL.

@param {Object} Lib - The shared Lib container

@return {Function} - hoc(InnerComponent) -> Wrapped component
*********************************************************************/
module.exports = function loader (Lib) {

  // Resolve direction once per build
  // Web: check Lib.Config for locale IS_RTL flag (if available)
  // Native: read I18nManager.isRTL
  let isRtlActive = false;

  if (Platform.OS === 'web') {
    // On web, RTL is driven by the app's locale configuration if available
    // The host app may set this through Lib.Config or a global
    if (Lib.Config && Lib.Config.locale && Lib.Config.locale.IS_RTL) {
      isRtlActive = true;
    }
  } else {
    // On native, I18nManager.isRTL is the source of truth
    isRtlActive = I18nManager.isRTL;
  }


  // hoc(InnerComponent) -> Wrapped component with isRtlActive injected
  return function hoc (InnerComponent) {

    return function Wrapped (props) {

      // Inject isRtlActive into every component's props
      return Lib.React.createElement(
        InnerComponent,
        Object.assign({ isRtlActive: isRtlActive }, props)
      );

    };

  };

};
