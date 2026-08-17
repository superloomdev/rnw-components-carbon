import createCompoundContext from '../component/createCompoundContext.js';

export default function (shared_libs, config, errors) { // eslint-disable-line no-unused-vars
  // createCompoundContext is a direct function (Lib, displayName) -> { Provider, useContext }
  // Return a bound version that closes over Lib so callers pass only displayName
  const Lib = { Utils: shared_libs.Utils, Debug: shared_libs.Debug, React: shared_libs.React };
  return function (displayName) {
    return createCompoundContext(Lib, displayName);
  };
}
