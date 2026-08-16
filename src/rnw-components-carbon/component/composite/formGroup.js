// Info: FormGroup composite [S1 presentational]. A wrapper that groups form
// fields with an optional label and message. Role group. Does not use any
// mechanisms. Composes View and Text atoms.
//   children    -> form field elements
//   label       -> string (optional group label)
//   invalid     -> boolean (shows message in danger color)
//   message     -> string (helper or error text shown below the group)
//   disabled    -> boolean (dims the label)
'use strict';


/********************************************************************
Build the FormGroup composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The FormGroup component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function FormGroup (props) {

    const {
      children, label, invalid, message, disabled,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const isDisabled = !!disabled;
    const isInvalid = !!invalid;

    // Build aria state props for the group
    const ariaStateProps = Parts.A11y.state({
      disabled: isDisabled,
      invalid: isInvalid
    });

    // Render the label if provided
    const labelElement = label
      ? React.createElement(Registry.Text, {
        size: 'sm',
        color: isDisabled ? 'text_muted' : 'text_primary',
        weight: 'medium',
        style: Style.utilities['m_b_xs']
      }, label)
      : null;

    // Render the message (error or helper) below the group
    const messageElement = message
      ? React.createElement(Registry.Text, {
        size: 'xs',
        color: isInvalid ? 'status_danger' : 'text_secondary',
        style: Style.utilities['m_t_xs']
      }, message)
      : null;

    return React.createElement(
      Registry.View,
      Object.assign({
        accessibilityRole: 'group',
        accessibilityLabel: accessibilityLabel || label,
        style: [Style.utilities['m_b_md'], style]
      }, ariaStateProps, rest),
      labelElement,
      children,
      messageElement
    );

  };

};
