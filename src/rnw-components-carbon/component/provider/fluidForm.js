// Info: FluidForm provider [PROVIDER]. Marks a form as fluid (label inside
// field) for descendants. Uses M7 (createCompoundContext pattern).
//   fluid       -> boolean (default true)
//   children    -> content to render within the fluid context
'use strict';


/********************************************************************
Build the FluidForm provider.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by providers)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The FluidForm provider component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  const React = Lib.React;
  const createContext = React.createContext;

  // Context holds a boolean
  const FluidFormContext = createContext(false);
  FluidFormContext.displayName = 'FluidFormContext';

  // Hook for descendants to check if they are in a fluid form
  const useFluidForm = function () {
    return React.useContext(FluidFormContext);
  };

  // Provider component
  const FluidForm = function (props) {

    const fluid = props.fluid !== false;
    const children = props.children;

    return React.createElement(
      FluidFormContext.Provider,
      { value: fluid },
      children
    );

  };

  return {
    FluidForm: FluidForm,
    useFluidForm: useFluidForm,
    FluidFormContext: FluidFormContext
  };

};
