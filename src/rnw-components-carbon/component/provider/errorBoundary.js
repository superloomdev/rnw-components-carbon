// Info: ErrorBoundary provider [PROVIDER]. Catches render errors in
// descendants and renders a fallback. This is the one component in the
// package that must be a class, because componentDidCatch has no hook
// equivalent. Do not "fix" it to a function component.
//   fallback    -> node (rendered when an error is caught)
//   onError     -> function (called with the error)
//   children    -> content to protect
'use strict';


/********************************************************************
Build the ErrorBoundary provider.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by providers)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ErrorBoundary class component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) { // eslint-disable-line no-unused-vars

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

  return { ErrorBoundary: ErrorBoundary };

};
