// Info: Notification molecule [S1/S2]. A themed notification banner with
// title, subtitle, status icon, and an optional close button. Uses M1
// (a11y) for aria-* state and role="alert" for screen reader announcement.
//   title       -> primary text
//   subtitle    -> secondary text (optional)
//   status      -> 'success' | 'error' | 'warning' | 'info'
//   onClose     -> close handler (optional; when absent, no close button)
//   children    -> additional content (optional)
'use strict';

const { View: RNView, Pressable } = require('react-native');


// Status -> background utility key and icon name
const STATUS_BG = {
  success: 'background_status_success_subtle',
  error: 'background_status_danger_subtle',
  warning: 'background_status_warning_subtle',
  info: 'background_status_info_subtle'
};

const STATUS_ICON = {
  success: 'checkmark--filled',
  error: 'error--filled',
  warning: 'warning--filled',
  info: 'information--filled'
};


/********************************************************************
Build the Notification molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Notification component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function Notification (props) {

    const {
      title, subtitle, status, onClose, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const resolvedStatus = status || 'info';
    const bgKey = STATUS_BG[resolvedStatus] || STATUS_BG.info;
    const iconName = STATUS_ICON[resolvedStatus] || STATUS_ICON.info;

    // Build the close button if onClose is provided
    const closeButton = Lib.Utils.isFunction(onClose)
      ? React.createElement(
        Pressable,
        Object.assign({
          onPress: onClose,
          accessibilityRole: 'button',
          accessibilityLabel: 'Close notification'
        }, Parts.A11y.state({}), Parts.PressKeys({
          role: 'button',
          onActivate: onClose,
          disabled: false
        }), {
          style: Style.utilities['p_a_xs']
        }),
        React.createElement(Registry.Icon, {
          name: 'close',
          size: 'sm',
          color: 'TEXT_SECONDARY'
        })
      )
      : null;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'alert',
        style: [
          Style.utilities[bgKey] || Style.utilities['background_surface'],
          Style.utilities['br_md'],
          Style.utilities['border_default'],
          Style.utilities['p_a_md'],
          Style.utilities['flex_row'],
          Style.utilities['align_start'],
          style
        ]
      }, rest),
      // Status icon
      React.createElement(Registry.Icon, {
        name: iconName,
        size: 'md',
        color: 'TEXT_SECONDARY',
        style: Style.utilities['m_e_sm']
      }),
      // Title and subtitle column
      React.createElement(
        Registry.View,
        { style: Style.utilities['flex_1'] },
        title
          ? React.createElement(Registry.Text, {
            size: 'md',
            color: 'text_primary',
            weight: 'medium'
          }, title)
          : null,
        subtitle
          ? React.createElement(Registry.Text, {
            size: 'sm',
            color: 'text_secondary',
            style: Style.utilities['m_t_xs']
          }, subtitle)
          : null,
        children || null
      ),
      closeButton
    );

  };

};
