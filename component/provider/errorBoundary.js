// Info: ErrorBoundary provider [PROVIDER]. Catches render errors in
// descendants and renders a fallback. This is the one component in the
// package that must be a class, because componentDidCatch has no hook
// equivalent. Do not "fix" it to a function component.
//   fallback    -> node (rendered when an error is caught)
//   onError     -> function (called with the error)
//   children    -> content to protect


// Imports
// None.


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the ErrorBoundary provider.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { ... }
@param {Object} Registry - Component registry (unused by providers)
@param {Object} Style    - { utilities, tokens, breakpoint }

@return {Object} - The ErrorBoundary provider interface
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const React = Lib.React;

  // Class component: componentDidCatch has no hook equivalent
  class ErrorBoundary extends React.Component {

    constructor (props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError () {
      return { hasError: true };
    }

    componentDidCatch (error) {
      if (Lib.Utils.isFunction(this.props.onError)) {
        this.props.onError(error);
      }
    }

    render () {
      if (this.state.hasError) {
        return this.props.fallback || null;
      }
      return this.props.children;
    }
  }
  ////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _ErrorBoundary = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the provider interface
  return { ErrorBoundary: ErrorBoundary };

}/////////////////////////// Component Factory END /////////////////////////////
