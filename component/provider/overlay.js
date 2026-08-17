// Info: M4 - Overlay provider and useOverlay hook.
//
// Replaces Carbon's Portal. A provider plus a hook, owning a stack of
// overlay layers. Maintains an ordered stack so a Popover opened from
// inside a Modal paints above it. Assigns zIndex from the stack position.
// Only the topmost trapping layer traps focus. Escape dismisses the
// topmost layer only.
//
// On native, renders through a single root-level absolute View rather
// than RN Modal, because RN Modal always traps focus and cannot express
// a non-modal popover.
//
// Contexts are created once per loader call, in createInterface, and
// stored on state.contexts. They are NOT created inside build.

// Imports
import { View as RNView, Platform as RNPlatform } from 'react-native';


/********************************************************************
Build the Overlay provider and useOverlay hook.

@param {Object} Lib - The shared Lib container (requires React)

@return {Object} - { Overlay, useOverlay, createContext }
*********************************************************************/
export default function (Lib) {

  const React = Lib.React;
  const createContext = Lib.React.createContext;


  // The default context value: no host mounted
  const OverlayContext = createContext({
    layers: [],
    register: function () {
      return -1;
    },
    unregister: function () {}
  });


  // The provider component, mounted once at app root
  const Overlay = function (props) {

    const children = props.children;

    // Stack of registered overlays: [{ id, trap, onClose }]
    const stackRef = React.useRef([]);
    const stackState = React.useState([]);
    const stack = stackState[0];
    const setStack = stackState[1];


    // Register an overlay layer; returns its index (0-based)
    const register = React.useCallback(function (layer) {

      const id = stackRef.current.length;
      stackRef.current.push(layer);
      setStack(stackRef.current.slice());
      return id;

    }, []);


    // Unregister an overlay layer by id
    const unregister = React.useCallback(function (id) {

      stackRef.current = stackRef.current.filter(function (l) {
        return l.id !== id;
      });
      setStack(stackRef.current.slice());

    }, []);


    // Escape dismisses the topmost layer on web
    React.useEffect(function () {

      if (RNPlatform.OS !== 'web' || typeof document === 'undefined') {
        return;
      }

      const handleKeyDown = function (event) {

        if (event.key !== 'Escape') {
          return;
        }

        // Dismiss the topmost layer that has trap=true
        let topTrapping = null;
        for (let i = stackRef.current.length - 1; i >= 0; i--) {
          if (stackRef.current[i].trap) {
            topTrapping = stackRef.current[i];
            break;
          }
        }

        // If no trapping layer, dismiss the topmost layer
        const top = topTrapping || stackRef.current[stackRef.current.length - 1];

        if (top && Lib.Utils.isFunction(top.onClose)) {
          top.onClose();
        }

      };

      document.addEventListener('keydown', handleKeyDown);

      return function () {
        document.removeEventListener('keydown', handleKeyDown);
      };

    }, []);


    const contextValue = {
      layers: stack,
      register: register,
      unregister: unregister
    };


    return React.createElement(
      OverlayContext.Provider,
      { value: contextValue },
      children,
      // Render all overlay layers in a single root-level container
      React.createElement(
        RNView,
        {
          pointerEvents: 'box-none',
          style: {
            position: RNPlatform.OS === 'web' ? 'fixed' : 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9999
          }
        },
        stack.map(function (layer) {
          return React.createElement(
            RNView,
            {
              key: layer.id,
              pointerEvents: 'box-none',
              style: {
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 1000 + layer.id
              }
            },
            layer.render()
          );
        })
      )
    );

  };


  // Hook for overlay components to register themselves with the host
  const useOverlay = function (options) {

    const isOpen = options.isOpen;
    const trap = options.trap;
    const onClose = options.onClose;
    const render = options.render;

    const ctx = React.useContext(OverlayContext);
    const layerIdRef = React.useRef(-1);


    // Register on open, unregister on close
    React.useEffect(function () {

      if (isOpen) {
        layerIdRef.current = ctx.register({
          id: ctx.layers.length,
          trap: trap,
          onClose: onClose,
          render: render
        });
      }

      return function () {
        if (layerIdRef.current >= 0) {
          ctx.unregister(layerIdRef.current);
          layerIdRef.current = -1;
        }
      };

    }, [isOpen]);


    // Update the layer when trap/onClose/render change
    React.useEffect(function () {

      if (layerIdRef.current >= 0 && isOpen) {
        // Re-register with updated values
        ctx.unregister(layerIdRef.current);
        layerIdRef.current = ctx.register({
          id: ctx.layers.length,
          trap: trap,
          onClose: onClose,
          render: render
        });
      }

    }, [trap, onClose, render]);


    return {
      layerIndex: layerIdRef.current,
      zIndex: layerIdRef.current >= 0 ? 1000 + layerIdRef.current : undefined
    };

  };


  return {
    Overlay: Overlay,
    useOverlay: useOverlay,
    OverlayContext: OverlayContext
  };

}
