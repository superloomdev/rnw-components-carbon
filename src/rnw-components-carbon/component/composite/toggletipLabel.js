// Info: ToggletipLabel composite [S1/S3]. A label with an inline toggletip
// that shows additional content on interaction. Uses M1 (a11y) for aria-*
// state and role="group" for screen reader semantics. Composes the
// Toggletip molecule for the tooltip behavior.
//   label             -> the label text
//   toggletipContent  -> content to show in the toggletip
//   children          -> additional content (optional)
//   style             -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the ToggletipLabel composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ToggletipLabel component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);

  return function ToggletipLabel (props) {

    const {
      label, toggletipContent, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria props through the a11y translator
    const ariaProps = a11y.state({});

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          style
        ]
      }, ariaProps, rest),
      // Label text
      label
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_secondary',
          weight: 'medium',
          style: Style_.utilities['m_e_xs']
        }, label)
        : null,
      // Toggletip with content
      React.createElement(Registry.Toggletip, {
        content: toggletipContent
      }),
      // Additional children
      children || null
    );

  };

};
