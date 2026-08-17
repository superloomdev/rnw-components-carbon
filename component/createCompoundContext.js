// Info: M7 - Context factory for compound components.
//
// Carbon has 14 Context modules. A naive "render children in a View" port
// breaks the parent-child contract for Tabs, Accordion, RadioButtonGroup,
// Menu, TreeView, DataTable, ContentSwitcher, ComposedModal, Card, Layer,
// FluidForm.
//
// Contexts are created once per loader call, in createInterface, and
// stored on state.contexts. They are NOT created inside build. If they
// were created inside build, a rebuild would produce a new Context
// identity and every mounted Consumer would fall back to its default
// value, silently breaking every compound component on a theme change.
//
// useContext throws a TypeError naming the required parent when called
// outside its Provider. That turns "AccordionItem rendered outside
// Accordion" from a blank render into a clear boot-time error.
//
// Do not port Carbon's React.Children.map plus cloneElement pattern.
// It inspects child.type and breaks the moment a child is wrapped in
// React.memo or forwardRef, which our HOC does. Use Context for every
// parent-child coordination.


/********************************************************************
Create a compound context pair: a Provider and a useContext hook.

@param {Object} Lib         - The shared Lib container (requires React)
@param {String} displayName - Human-readable name for error messages

@return {Object} - { Provider, useContext, Context }
*********************************************************************/
export default function (Lib, displayName) {

  const React = Lib.React;
  const createContext = Lib.React.createContext;


  // The context holds the compound state; default is undefined so
  // useContext can detect "outside provider" and throw
  const Context = createContext(undefined);


  // Set displayName for React DevTools
  Context.displayName = displayName + 'Context';


  // Hook that throws when used outside its Provider
  const useContext = function () {

    const value = React.useContext(Context);

    // undefined means no Provider is mounted above this consumer
    if (value === undefined) {
      throw new TypeError(
        displayName + ': this component must be rendered inside a ' +
        displayName + ' Provider. Rendering it standalone is not supported.'
      );
    }

    return value;

  };


  return {
    Provider: Context.Provider,
    useContext: useContext,
    Context: Context
  };

}
