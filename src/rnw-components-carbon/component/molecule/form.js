// Info: Form molecule [S1]. A form container that wraps children and handles
// submit events. Uses role="form" for screen reader semantics.
//   children    -> form field elements
//   onSubmit    -> submit handler function
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Form molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Form component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function Form (props) {

    const {
      children, onSubmit, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Handle submit by preventing default and calling onSubmit
    const handleSubmit = function (event) {
      if (event && Lib.Utils.isFunction(event.preventDefault)) {
        event.preventDefault();
      }
      if (Lib.Utils.isFunction(onSubmit)) {
        onSubmit(event);
      }
    };

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'form',
        onSubmit: handleSubmit,
        style: [
          Style.utilities['flex_col'],
          style
        ]
      }, rest),
      children
    );

  };

};
