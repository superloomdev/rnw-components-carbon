// Info: Theme provider [PROVIDER]. Provides a theme contract to descendants
// via context. Uses createCompoundContext pattern. This is separate
// from the build-time theme; it allows runtime theme overrides for subtrees.
//   theme       -> object (theme contract to provide)
//   children    -> content to render within the theme context


// Imports
// None.


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the Theme provider.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { ... }
@param {Object} Registry - Component registry (unused by providers)
@param {Object} Style    - { utilities, tokens, breakpoint }

@return {Object} - The Theme provider interface
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const React = Lib.React;
  const createContext = React.createContext;

  // Context holds the theme contract
  const ThemeContext = createContext(null);
  ThemeContext.displayName = 'ThemeContext';

  // Hook for descendants to read the current theme
  const useTheme = function () {
    return React.useContext(ThemeContext);
  };

  // Provider component
  const Theme = function (props) {

    const theme = props.theme;
    const children = props.children;

    return React.createElement(
      ThemeContext.Provider,
      { value: theme },
      children
    );

  };
  ////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _Theme = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the provider interface
  return {
    Theme: Theme,
    useTheme: useTheme,
    ThemeContext: ThemeContext
  };

}/////////////////////////// Component Factory END /////////////////////////////
