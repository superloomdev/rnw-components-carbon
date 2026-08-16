// Info: FormLabel molecule [S1 presentational]. A label for form fields.
// Uses M1 (a11y) for aria-* relation props (aria-labelledby wiring is done
// by the parent FormItem). Composes Text atom.
//   children     -> string or node, the label text
//   htmlFor      -> string, the id of the associated control (web only)
//   required     -> boolean, shows required indicator
//   disabled     -> boolean, dims the label
//   style        -> custom style overrides
'use strict';

const { Platform } = require('react-native');


/********************************************************************
Build the FormLabel molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The FormLabel component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function FormLabel (props) {

    const {
      children, htmlFor, required, disabled, style,
      ...rest
    } = props;

    const React = Lib.React;
    const isDisabled = !!disabled;

    // On web, htmlFor maps to native label behavior
    const webProps = {};

    if (htmlFor && Platform.OS === 'web') {
      webProps.htmlFor = htmlFor;
    }

    return React.createElement(
      Registry.Text,
      Object.assign({
        size: 'sm',
        color: isDisabled ? 'text_disabled' : 'text_primary',
        weight: 'medium',
        style: [Style.utilities['m_b_xs'], style]
      }, webProps, rest),
      children,
      required
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'status_danger',
          weight: 'medium'
        }, ' *')
        : null
    );

  };

};
