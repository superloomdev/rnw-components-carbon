// Info: Toast molecule [S1/S2]. A transient notification that auto-dismisss
// after a duration. Uses M1 (a11y) for aria-* state, role="alert" for
// screen reader announcement, and a timer effect for auto-dismiss.
//   title       -> primary text
//   subtitle    -> secondary text (optional)
//   status      -> 'success' | 'error' | 'warning' | 'info'
//   onClose     -> close handler (called on close or auto-dismiss)
//   duration    -> milliseconds before auto-dismiss (default 3000)
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
Build the Toast molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Toast component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function Toast (props) {

    const {
      title, subtitle, status, onClose, duration, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const resolvedStatus = status || 'info';
    const bgKey = STATUS_BG[resolvedStatus] || STATUS_BG.info;
    const iconName = STATUS_ICON[resolvedStatus] || STATUS_ICON.info;
    const dismissMs = Lib.Utils.isNumber(duration) ? duration : 3000;

    // Auto-dismiss timer
    React.useEffect(function () {

      if (!Lib.Utils.isFunction(onClose)) {
        return undefined;
      }

      const timer = setTimeout(function () {
        onClose();
      }, dismissMs);

      return function () {
        clearTimeout(timer);
      };

    }, [dismissMs, onClose]);

    // Build the close button if onClose is provided
    const closeButton = Lib.Utils.isFunction(onClose)
      ? React.createElement(
        Pressable,
        Object.assign({
          onPress: onClose,
          accessibilityRole: 'button',
          accessibilityLabel: 'Close toast'
        }, a11y.state({}), usePressKeys({
          role: 'button',
          onActivate: onClose,
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
      closeButton
    );

  };

};
