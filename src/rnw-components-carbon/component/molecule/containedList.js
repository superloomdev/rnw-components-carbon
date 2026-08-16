// Info: ContainedList molecule [S1 presentational]. A contained list with a
// label. Uses role="list" for screen reader semantics.
//   label       -> string (list label, optional)
//   children    -> list item elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the ContainedList molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ContainedList component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function ContainedList (props) {

    const {
      label, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'list',
        style: [
          Style_.utilities['br_md'],
          Style_.utilities['border_default'],
          Style_.utilities['background_surface'],
          style
        ]
      }, rest),
      label
        ? React.createElement(Registry.Text, {
          size: 'md',
          color: 'text_primary',
          weight: 'medium',
          style: [
            Style_.utilities['p_h_md'],
            Style_.utilities['p_v_sm']
          ]
        }, label)
        : null,
      children
    );

  };

};
