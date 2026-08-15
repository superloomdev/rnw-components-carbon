// Info: Fieldset molecule [S1]. A grouping container for related form fields
// with an optional legend. Uses role="group" for screen reader semantics.
//   children    -> form field elements
//   legend      -> legend text (optional)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Fieldset molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Fieldset component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function Fieldset (props) {

    const {
      children, legend, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style_.utilities['border_default'],
          Style_.utilities['br_md'],
          Style_.utilities['p_a_md'],
          Style_.utilities['flex_col'],
          style
        ]
      }, rest),
      legend
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_secondary',
          weight: 'medium',
          style: Style_.utilities['m_b_sm']
        }, legend)
        : null,
      children
    );

  };

};
