// Info: IdPrefix provider [PROVIDER]. Provides an id prefix to descendants
// for generating unique element ids. Uses createCompoundContext pattern.
//   prefix      -> string (the id prefix, e.g. 'my-app')
//   children    -> content to render within the prefix context


// Imports
// None.


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the IdPrefix provider.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { ... }
@param {Object} Registry - Component registry (unused by providers)
@param {Object} Style    - { utilities, tokens, breakpoint }

@return {Object} - The IdPrefix provider interface
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const React = Lib.React;
  const createContext = React.createContext;

  // Context holds the prefix string
  const IdPrefixContext = createContext('');
  IdPrefixContext.displayName = 'IdPrefixContext';

  // Hook for descendants to read the current prefix
  const useIdPrefix = function () {
    return React.useContext(IdPrefixContext);
  };

  // Provider component
  const IdPrefix = function (props) {

    const prefix = props.prefix || '';
    const children = props.children;

    return React.createElement(
      IdPrefixContext.Provider,
      { value: prefix },
      children
    );

  };
  ////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _IdPrefix = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the provider interface
  return {
    IdPrefix: IdPrefix,
    useIdPrefix: useIdPrefix,
    IdPrefixContext: IdPrefixContext
  };

}/////////////////////////// Component Factory END /////////////////////////////
