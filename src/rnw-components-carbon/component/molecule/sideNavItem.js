// Info: SideNavItem molecule [S2 interactive]. A single navigation item.
// Uses role="link" for screen reader semantics. Uses M1 (a11y) for aria-*
// state (current) and M2 (usePressKeys) for keyboard activation.
//   text        -> string (item label)
//   onPress     -> function (press handler)
//   active      -> boolean (whether this item is active)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the SideNavItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The SideNavItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function SideNavItem (props) {

    const {
      text, onPress, active, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;
    const isActive = !!active;

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      current: isActive ? 'page' : undefined
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'link',
      onActivate: onPress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'link',
        accessibilityLabel: text
      }, ariaProps, pressKeysProps, {
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_sm'],
          {
            backgroundColor: isActive
              ? (colorMap.APP_PRIMARY_SUBTLE || '#edf5ff')
              : 'transparent'
          },
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: isActive ? 'app_primary' : 'text_primary',
        weight: isActive ? 'medium' : 'regular'
      }, text || '')
    );

  };

};
