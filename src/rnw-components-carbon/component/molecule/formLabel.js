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
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The FormLabel component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function FormLabel (props) {

    const {
      children, htmlFor, required, disabled, style, isRtlActive, // eslint-disable-line no-unused-vars
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
        color: isDisabled ? 'text_muted' : 'text_primary',
        weight: 'medium',
        style: [Style_.utilities['m_b_xs'], style]
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
