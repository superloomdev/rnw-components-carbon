// Info: ToggletipButton molecule [S2 interactive]. A button inside a
// Toggletip. Composes Registry.Button with kind="ghost". Uses A11y for
// aria-* state. Role="button".
//   text        -> string (the button label)
//   onPress     -> function (called when pressed)
//   style       -> custom style overrides


// Imports



/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the ToggletipButton molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ToggletipButton component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  /////////////////////////// Static Constants START ////////////////////////////


  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const ToggletipButton = function ToggletipButton (props) {


    const {
      text, onPress, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      Registry.Button,
      Object.assign({
        kind: 'ghost',
        onPress: onPress,
        accessibilityRole: 'button',
        accessibilityLabel: text,
        style: style
      }, rest),
      text
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _ToggletipButton = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return ToggletipButton;

}/////////////////////////// Component Factory END /////////////////////////////
