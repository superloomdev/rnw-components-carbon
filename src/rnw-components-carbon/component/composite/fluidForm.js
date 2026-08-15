// Info: FluidForm composite [S1 presentational]. Wraps form content in a
// FluidForm provider context so descendant FormItem components render with
// fluid labels (label inside the field). Uses the FluidForm provider context.
//   children    -> form content to render within the fluid context
//   fluid       -> boolean (default true, pass false to opt out)
'use strict';


/********************************************************************
Build the FluidForm composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The FluidForm composite component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function FluidForm (props) {

    const {
      children, fluid, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Use the FluidForm provider from the registry
    return React.createElement(
      Registry.provider.FluidForm,
      { fluid: fluid !== false },
      React.createElement(
        Registry.View,
        Object.assign({ style: [Style_.utilities['flex_col'], style] }, rest),
        children
      )
    );

  };

};
