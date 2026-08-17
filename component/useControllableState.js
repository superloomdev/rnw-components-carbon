// Info: M8 - Controlled/uncontrolled state hook.
//
// Every Carbon form component supports both controlled and uncontrolled
// use. This hook implements the pattern once. Controlled when `value` is
// not undefined, uncontrolled otherwise. Warns once through Lib.Debug.warn
// when a component switches modes between renders. Never warns on every
// render.


/********************************************************************
Build the useControllableState hook.

@param {Object} Lib - The shared Lib container (requires React, Debug)

@return {Function} - useControllableState({ value, defaultValue, onChange })
                     -> [resolvedValue, setValue]
*********************************************************************/
export default function (Lib) {

  const React = Lib.React;


  return function useControllableState (options) {

    const value = options.value;
    const defaultValue = options.defaultValue;
    const onChange = options.onChange;


    // Track whether we started in controlled mode
    const controlledRef = React.useRef(value !== undefined);


    // Internal state for uncontrolled mode
    const internalState = React.useState(defaultValue);
    const internalValue = internalState[0];
    const setInternalValue = internalState[1];


    // Warn once if the component switches between controlled and uncontrolled
    const warnedRef = React.useRef(false);

    React.useEffect(function () {

      if (warnedRef.current) {
        return;
      }

      const isControlled = value !== undefined;

      if (controlledRef.current !== isControlled) {
        warnedRef.current = true;
        Lib.Debug.warn(
          'useControllableState: component switched from ' +
          (controlledRef.current ? 'controlled' : 'uncontrolled') +
          ' to ' + (isControlled ? 'controlled' : 'uncontrolled') +
          ' mode. This is likely a bug.'
        );
      }

    }, [value]);


    // The resolved value: external when controlled, internal when not
    const resolvedValue = value !== undefined ? value : internalValue;


    // Setter: calls onChange for controlled, updates internal for uncontrolled
    const setValue = React.useCallback(function (nextValue) {

      // Allow functional updates: setValue(prev => prev + 1)
      let actualNext = nextValue;

      if (value !== undefined) {
        // Controlled mode: delegate to onChange
        if (Lib.Utils.isFunction(onChange)) {
          onChange(actualNext);
        }
      } else {
        // Uncontrolled mode: update internal state and call onChange
        if (Lib.Utils.isFunction(actualNext)) {
          actualNext = actualNext(internalValue);
        }

        setInternalValue(actualNext);

        if (Lib.Utils.isFunction(onChange)) {
          onChange(actualNext);
        }
      }

    }, [value, onChange, internalValue]);


    return [resolvedValue, setValue];

  };

}
