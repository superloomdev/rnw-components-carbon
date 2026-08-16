// Info: ActionableNotification molecule [S2 interactive]. A notification with
// action buttons. Uses role="alert" for screen reader announcement. Uses M1
// (a11y) for aria-* state and M2 (usePressKeys) for keyboard activation.
//   title       -> primary text
//   subtitle    -> secondary text (optional)
//   actionText  -> string (action button label, optional)
//   onAction    -> function (action handler, optional)
//   onDismiss   -> function (dismiss handler, optional)
//   kind        -> 'info' | 'success' | 'warning' | 'error'
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


// Kind -> background utility key and icon name
const KIND_BG = {
  success: 'background_status_success_subtle',
  error: 'background_status_danger_subtle',
  warning: 'background_status_warning_subtle',
  info: 'background_status_info_subtle'
};

const KIND_ICON = {
  success: 'checkmark--filled',
  error: 'error--filled',
  warning: 'warning--filled',
  info: 'information--filled'
};


/********************************************************************
Build the ActionableNotification molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ActionableNotification component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function ActionableNotification (props) {

    const {
      title, subtitle, actionText, onAction, onDismiss, kind, style,
      isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const resolvedKind = kind || 'info';
    const bgKey = KIND_BG[resolvedKind] || KIND_BG.info;
    const iconName = KIND_ICON[resolvedKind] || KIND_ICON.info;

    // Build the action button if actionText and onAction are provided
    const actionButton = (actionText && Lib.Utils.isFunction(onAction))
      ? React.createElement(
        Pressable,
        Object.assign({
          onPress: onAction,
          accessibilityRole: 'button',
          accessibilityLabel: actionText
        }, a11y.state({}), usePressKeys({
          role: 'button',
          onActivate: onAction,
          disabled: false
        }), {
          style: [
            Style_.utilities['p_h_sm'],
            Style_.utilities['p_v_xs'],
            Style_.utilities['m_e_sm']
          ]
        }),
        React.createElement(Registry.Text, {
          size: 'sm',
          color: 'app_primary',
          weight: 'medium'
        }, actionText)
      )
      : null;

    // Build the dismiss button if onDismiss is provided
    const dismissButton = Lib.Utils.isFunction(onDismiss)
      ? React.createElement(
        Pressable,
        Object.assign({
          onPress: onDismiss,
          accessibilityRole: 'button',
          accessibilityLabel: 'Dismiss notification'
        }, a11y.state({}), usePressKeys({
          role: 'button',
          onActivate: onDismiss,
          disabled: false
        }), {
          style: Style_.utilities['p_a_xs']
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
          Style_.utilities[bgKey] || Style_.utilities['background_surface'],
          Style_.utilities['br_md'],
          Style_.utilities['border_default'],
          Style_.utilities['p_a_md'],
          Style_.utilities['flex_row'],
          Style_.utilities['align_start'],
          style
        ]
      }, rest),
      // Status icon
      React.createElement(Registry.Icon, {
        name: iconName,
        size: 'md',
        color: 'TEXT_SECONDARY',
        style: Style_.utilities['m_e_sm']
      }),
      // Title and subtitle column
      React.createElement(
        Registry.View,
        { style: Style_.utilities['flex_1'] },
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
            style: Style_.utilities['m_t_xs']
          }, subtitle)
          : null
      ),
      actionButton,
      dismissButton
    );

  };

};
