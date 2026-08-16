// Info: MenuItemGroup molecule [S1 presentational]. A group of menu items with
// a label. Uses role="group" for screen reader semantics.
//   label       -> string (group label, optional)
//   children    -> menu item elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the MenuItemGroup molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The MenuItemGroup component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function MenuItemGroup (props) {

    const {
      label, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: style
      }, rest),
      label
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_secondary',
          weight: 'medium',
          style: [
            Style_.utilities['p_h_md'],
            Style_.utilities['p_v_xs']
          ]
        }, label)
        : null,
      children
    );

  };

};
