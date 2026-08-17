// Info: M6 - LiveRegionProvider and useAnnounce hook.
//
// Fixes the AccessibilityInfo.announceForAccessibility no-op on web.
// On web, renders two permanently-mounted Views with aria-live="polite"
// and aria-live="assertive" and sets their text content to announce.
// The regions must be mounted before the message arrives; injecting a
// region and its text together is not announced by any screen reader.
//
// On native, calls AccessibilityInfo.announceForAccessibility, which
// does work there.
//
// Note: uses the deprecated flat accessibilityAtomic prop instead of
// aria-atomic due to an upstream react-native-web bug in createDOMProps
// line 180 that assigns ariaActiveDescendant to ariaAtomic. Retest
// after any RNW upgrade. This is the single documented exception to
// the aria-only rule. No other file in the package may use an
// accessibility* state prop.

// Imports
import { View as RNView, Platform as RNPlatform, AccessibilityInfo as RNAccessibilityInfo } from 'react-native';


/********************************************************************
Build the LiveRegionProvider and useAnnounce hook.

@param {Object} Lib - The shared Lib container (requires React)

@return {Object} - { LiveRegionProvider, useAnnounce, LiveRegionContext }
*********************************************************************/
export default function (Lib) {

  const React = Lib.React;
  const createContext = Lib.React.createContext;


  // Context holds the announce function
  const LiveRegionContext = createContext({
    announce: function () {}
  });


  // The provider, mounted once at app root
  const LiveRegionProvider = function (props) {

    const children = props.children;

    // Refs to the polite and assertive region text nodes
    const politeRef = React.useRef(null);
    const assertiveRef = React.useRef(null);

    // Counter to force re-announcement of identical messages
    const counterRef = React.useRef(0);


    // Announce a message with the given politeness ('polite' or 'assertive')
    const announce = React.useCallback(function (message, politeness) {

      const level = politeness || 'polite';

      // On native, use AccessibilityInfo.announceForAccessibility
      if (RNPlatform.OS !== 'web') {
        if (RNAccessibilityInfo && Lib.Utils.isFunction(RNAccessibilityInfo.announceForAccessibility)) {
          RNAccessibilityInfo.announceForAccessibility(message);
        }
        return;
      }

      // On web, set the text content of the appropriate live region
      counterRef.current += 1;
      const text = counterRef.current + ': ' + message;

      if (level === 'assertive' && assertiveRef.current) {
        assertiveRef.current.setNativeProps({ text: text });
      } else if (politeRef.current) {
        politeRef.current.setNativeProps({ text: text });
      }

    }, []);


    const contextValue = {
      announce: announce
    };


    // On native, no regions needed; just provide the context
    if (RNPlatform.OS !== 'web') {
      return React.createElement(
        LiveRegionContext.Provider,
        { value: contextValue },
        children
      );
    }


    // On web, render the permanent live regions alongside children
    return React.createElement(
      LiveRegionContext.Provider,
      { value: contextValue },
      children,
      // Polite region: permanently mounted, visually hidden
      React.createElement(RNView, {
        ref: politeRef,
        'aria-live': 'polite',
        accessibilityAtomic: true, // workaround for RNW bug, see header comment
        style: {
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          opacity: 0
        }
      }),
      // Assertive region: permanently mounted, visually hidden
      React.createElement(RNView, {
        ref: assertiveRef,
        'aria-live': 'assertive',
        accessibilityAtomic: true, // workaround for RNW bug, see header comment
        style: {
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          opacity: 0
        }
      })
    );

  };


  // Hook for components to announce messages
  const useAnnounce = function () {

    const ctx = React.useContext(LiveRegionContext);
    return ctx.announce;

  };


  return {
    LiveRegionProvider: LiveRegionProvider,
    useAnnounce: useAnnounce,
    LiveRegionContext: LiveRegionContext
  };

}
