// Info: Layer provider [PROVIDER]. Auto-increments an elevation level on
// nesting so descendants pick the next surface token. Uses M7
// (createCompoundContext). Context holds an integer 0 through 2.
//   children    -> content to render within the layer context
//   level       -> number (optional override; defaults to parent level + 1)
'use strict';


/********************************************************************
Build the Layer provider.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by providers)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Layer provider component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  const React = Lib.React;
  const createContext = React.createContext;

  // Context holds an integer 0 through 2
  const LayerContext = createContext(0);
  LayerContext.displayName = 'LayerContext';

  // Hook for descendants to read the current layer
  const useLayer = function () {
    return React.useContext(LayerContext);
  };

  // Provider component
  const Layer = function (props) {

    const overrideLevel = props.level;
    const children = props.children;

    // Read parent layer, default to 0
    const parentLayer = React.useContext(LayerContext);

    // Compute this layer's level: override, or parent + 1, clamped to 0-2
    const myLevel = Lib.Utils.isNumber(overrideLevel)
      ? Parts.Units.clamp(overrideLevel, 0, 2)
      : Parts.Units.clamp(parentLayer + 1, 0, 2);

    return React.createElement(
      LayerContext.Provider,
      { value: myLevel },
      children
    );

  };

  return {
    Layer: Layer,
    useLayer: useLayer,
    LayerContext: LayerContext
  };

};
