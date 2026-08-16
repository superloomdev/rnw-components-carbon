// Info: ToggletipButton molecule [S2 interactive]. A button inside a
// Toggletip. Composes Registry.Button with kind="ghost". Uses M1 (a11y) for
// aria-* state. Role="button".
//   text        -> string (the button label)
//   onPress     -> function (called when pressed)
//   style       -> custom style overrides
'use strict';


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
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  return function ToggletipButton (props) {

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

  };

};
