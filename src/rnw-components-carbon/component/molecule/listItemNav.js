// Info: ListItemNav molecule [S2 interactive]. A navigation list item with
// label, optional children, and press handling. Uses M1 (a11y) for aria-*
// state and M2 (usePressKeys) for keyboard activation. role="listitem".
//   label       -> primary text for the nav item
//   onPress     -> press handler
//   children    -> additional content (optional)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the ListItemNav molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ListItemNav component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function ListItemNav (props) {

    const {
      label, onPress, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({});

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: onPress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'listitem',
        accessibilityLabel: label,
        style: [
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_sm'],
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_primary',
        weight: 'medium',
        style: Style_.utilities['flex_1']
      }, label),
      children || null
    );

  };

};
