// Info: FormItem molecule [S1 presentational]. A wrapper that groups a
// FormLabel, a child control, and optional helper/error text. Does not use
// any mechanisms (no M1-M8 needed). Composes View and Text atoms.
//   label        -> string, rendered through FormLabel
//   children     -> the form control element
//   helperText   -> string, shown below the control when no error
//   errorText    -> string, shown below the control in danger color
//   required     -> boolean, passed to FormLabel
//   disabled     -> boolean, passed to FormLabel
//   style        -> custom style overrides
'use strict';


/********************************************************************
Build the FormItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The FormItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function FormItem (props) {

    const {
      label, children, helperText, errorText, required, disabled, style,
      ...rest
    } = props;

    const React = Lib.React;

    // Render the label if provided
    const labelElement = label
      ? React.createElement(Registry.Text, {
        size: 'sm',
        color: disabled ? 'text_disabled' : 'text_primary',
        weight: 'medium',
        style: Style.utilities['m_b_xs']
      }, label, required
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'status_danger',
          weight: 'medium'
        }, ' *')
        : null)
      : null;

    // Render helper or error text below the control
    const messageElement = errorText
      ? React.createElement(Registry.Text, {
        size: 'xs',
        color: 'status_danger',
        style: Style.utilities['m_t_xs']
      }, errorText)
      : helperText
        ? React.createElement(Registry.Text, {
          size: 'xs',
          color: 'text_secondary',
          style: Style.utilities['m_t_xs']
        }, helperText)
        : null;

    return React.createElement(
      Registry.View,
      Object.assign({ style: [Style.utilities['m_b_md'], style] }, rest),
      labelElement,
      children,
      messageElement
    );

  };

};
