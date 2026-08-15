// Info: Legend molecule [S1]. A legend caption for a Fieldset. Uses
// role="legend" for screen reader semantics. Renders children as a
// small secondary-text label.
//   children    -> legend content
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Legend molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Legend component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function Legend (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'legend',
        style: [
          Style_.utilities['p_b_xs'],
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'sm',
        color: 'text_secondary',
        weight: 'medium'
      }, children)
    );

  };

};
