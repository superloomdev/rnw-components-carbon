// Info: ActionableNotification molecule [S2 interactive]. A notification with
// action buttons. Uses role="alert" for screen reader announcement. Uses M1
// (a11y) for aria-* state and PressKeys for keyboard activation.
//   title       -> primary text
//   subtitle    -> secondary text (optional)
//   actionText  -> string (action button label, optional)
//   onAction    -> function (action handler, optional)
//   onDismiss   -> function (dismiss handler, optional)
//   kind        -> 'info' | 'success' | 'warning' | 'error'
//   style       -> custom style overrides


// Imports
import { View as RNView, Pressable } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the ActionableNotification molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ActionableNotification component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  const KIND_BG = {
    success: 'background_status_success',
    error: 'background_status_danger',
    warning: 'background_status_warning',
    info: 'background_status_info'
  };

  const KIND_ICON = {
    success: 'checkmark',
    error: 'error',
    warning: 'warning',
    info: 'information'
  };
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const ActionableNotification = function ActionableNotification (props) {


    const {
      title, subtitle, actionText, onAction, onDismiss, kind, style,
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
        }, Parts.A11y.state({}), Parts.PressKeys({
          role: 'button',
          onActivate: onAction,
          disabled: false
        }), {
          style: [
            Style.utilities['p_h_sm'],
            Style.utilities['p_v_xs'],
            Style.utilities['m_e_sm']
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
        }, Parts.A11y.state({}), Parts.PressKeys({
          role: 'button',
          onActivate: onDismiss,
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
          : null
      ),
      actionButton,
      dismissButton
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _ActionableNotification = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return ActionableNotification;

}/////////////////////////// Component Factory END /////////////////////////////
