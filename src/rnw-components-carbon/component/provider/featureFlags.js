// Info: FeatureFlags provider [PROVIDER]. Provides feature flag values to
// descendants via context. Uses M7 (createCompoundContext pattern).
//   flags       -> object (key-value map of feature flags)
//   children    -> content to render within the flag context
'use strict';


/********************************************************************
Build the FeatureFlags provider.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (unused by providers)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The FeatureFlags provider component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  const React = Lib.React;
  const createContext = React.createContext;

  // Context holds the flags object
  const FeatureFlagsContext = createContext({});
  FeatureFlagsContext.displayName = 'FeatureFlagsContext';

  // Hook for descendants to read flags
  const useFeatureFlags = function () {
    return React.useContext(FeatureFlagsContext);
  };

  // Provider component
  const FeatureFlags = function (props) {

    const flags = props.flags || {};
    const children = props.children;

    return React.createElement(
      FeatureFlagsContext.Provider,
      { value: flags },
      children
    );

  };

  return {
    FeatureFlags: FeatureFlags,
    useFeatureFlags: useFeatureFlags,
    FeatureFlagsContext: FeatureFlagsContext
  };

};
