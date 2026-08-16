// Info: AILabel composite [S3 overlay]. An AI-generated content label with
// a toggletip that shows details. Uses M1 (a11y), M5 (useAnchoredPosition).
// Composes Icon, Text, Toggletip atoms/molecules.
//   label       -> string (label text, default 'AI')
//   details     -> string (toggletip content)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the AILabel composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The AILabel component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function AILabel (props) {

    const {
      label, details, style,
      ...rest
    } = props;

    const React = Lib.React;
    const [isOpen, setIsOpen] = React.useState(false);

    // Build aria state props
    const ariaProps = Parts.A11y.state({
      expanded: !!isOpen
    });

    return React.createElement(
      RNView,
      Object.assign({ style: [Style.utilities['flex_row'], Style.utilities['align_center'], style] }, rest),
      React.createElement(
        Pressable,
        Object.assign({
          onPress: function () {
            setIsOpen(!isOpen);
          },
          accessibilityRole: 'button',
          accessibilityLabel: 'AI label',
          style: [
            Style.utilities['br_sm'],
            Style.utilities['p_h_xs'],
            Style.utilities['p_v_xs'],
            { backgroundColor: '#6F6F6F' }
          ]
        }, ariaProps),
        React.createElement(Registry.Text, {
          size: 'xs',
          color: 'text_on_primary',
          weight: 'medium'
        }, label || 'AI')
      ),
      isOpen
        ? React.createElement(
          RNView,
          {
            style: [
              Style.utilities['background_surface'],
              Style.utilities['br_md'],
              Style.utilities['border_default'],
              Style.utilities['p_a_sm'],
              Style.utilities['shadow_sm'],
              { position: 'absolute', top: '100%', left: 0, marginTop: 4, maxWidth: 300, zIndex: 1000 }
            ]
          },
          React.createElement(Registry.Text, {
            size: 'sm',
            color: 'text_primary'
          }, details || 'AI-generated content')
        )
        : null
    );

  };

};
