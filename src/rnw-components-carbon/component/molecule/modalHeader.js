// Info: ModalHeader molecule [S1 presentational]. Header section of a
// ComposedModal. Uses M7 (createCompoundContext) to coordinate with
// ComposedModal. Composes Text and View atoms.
//   title       -> string
//   subtitle    -> string (optional)
//   closeOnPress-> function (optional close handler)
//   children    -> additional content
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the ModalHeader molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ModalHeader component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function ModalHeader (props) {

    const {
      title, subtitle, closeOnPress, children, style,
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        style: [
          Style.utilities['p_h_lg'],
          Style.utilities['p_v_md'],
          Style.utilities['border_default'],
          { borderBottomWidth: 1 },
          style
        ]
      }, rest),
      React.createElement(
        RNView,
        { style: [Style.utilities['flex_row'], Style.utilities['align_center'], Style.utilities['justify_between']] },
        React.createElement(RNView, { style: { flex: 1 } },
          title
            ? React.createElement(Registry.Text, {
              size: 'xl',
              color: 'text_primary',
              weight: 'semibold'
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
        closeOnPress
          ? React.createElement(
            Pressable,
            {
              onPress: closeOnPress,
              accessibilityRole: 'button',
              accessibilityLabel: 'Close',
              style: Style.utilities['m_s_sm']
            },
            React.createElement(Registry.Text, {
              size: 'lg',
              color: 'text_secondary'
            }, '\u00d7')
          )
          : null
      ),
      children
    );

  };

};
