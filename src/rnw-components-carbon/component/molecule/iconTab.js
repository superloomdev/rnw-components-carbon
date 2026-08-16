// Info: IconTab molecule [S2 interactive]. A tab with only an icon. Uses
// role="tab" for screen reader semantics. Uses M1 (a11y) for aria-* state and
// M2 (usePressKeys) for keyboard activation.
//   icon        -> string (icon name)
//   active      -> boolean (whether this tab is active)
//   onPress     -> function (press handler)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the IconTab molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The IconTab component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function IconTab (props) {

    const {
      icon, active, onPress, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;
    const isActive = !!active;

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({
      selected: isActive
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
      role: 'tab',
      onActivate: onPress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'tab',
        accessibilityLabel: icon
      }, ariaProps, pressKeysProps, {
        style: [
          Style.utilities['p_h_md'],
          Style.utilities['p_v_sm'],
          Style.utilities['m_r_sm'],
          {
            borderBottomWidth: 2,
            borderBottomColor: isActive
              ? (colorMap.APP_PRIMARY || '#0f62fe')
              : 'transparent'
          },
          style
        ]
      }, rest),
      React.createElement(Registry.Icon, {
        name: icon,
        size: 'md',
        color: isActive ? 'text_primary' : 'TEXT_SECONDARY'
      })
    );

  };

};
