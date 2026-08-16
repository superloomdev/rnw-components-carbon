// Info: GrantPermission molecule [S2 interactive]. A permission request card
// with an icon, title, subtitle, and grant/deny buttons. Uses
// role="alertdialog" for screen reader semantics.
// Platform: native-primary.
//   title       -> primary text
//   subtitle    -> secondary text (optional)
//   icon        -> icon name (optional)
//   onGrant     -> grant handler
//   onDeny      -> deny handler (optional)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the GrantPermission molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The GrantPermission component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function GrantPermission (props) {

    const {
      title, subtitle, icon, onGrant, onDeny, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const iconName = icon || 'information--filled';

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'alertdialog',
        style: [
          Style.utilities['background_surface'],
          Style.utilities['br_md'],
          Style.utilities['border_default'],
          Style.utilities['p_a_md'],
          Style.utilities['flex_col'],
          style
        ]
      }, rest),
      // Icon row
      icon
        ? React.createElement(Registry.Icon, {
          name: iconName,
          size: 'lg',
          color: 'TEXT_SECONDARY',
          style: Style.utilities['m_b_sm']
        })
        : null,
      // Title
      title
        ? React.createElement(Registry.Text, {
          size: 'md',
          color: 'text_primary',
          weight: 'medium'
        }, title)
        : null,
      // Subtitle
      subtitle
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_secondary',
          style: Style.utilities['m_t_xs']
        }, subtitle)
        : null,
      // Button row
      React.createElement(
        Registry.View,
        {
          style: [
            Style.utilities['flex_row'],
            Style.utilities['justify_end'],
            Style.utilities['m_t_md']
          ]
        },
        // Deny button
        Lib.Utils.isFunction(onDeny)
          ? React.createElement(Registry.Button, {
            kind: 'ghost',
            title: 'Deny',
            onPress: onDeny,
            style: Style.utilities['m_e_sm']
          })
          : null,
        // Grant button
        Lib.Utils.isFunction(onGrant)
          ? React.createElement(Registry.Button, {
            kind: 'primary',
            title: 'Grant',
            onPress: onGrant
          })
          : null
      )
    );

  };

};
