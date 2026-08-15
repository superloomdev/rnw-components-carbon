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
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The AILabel component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);

  return function AILabel (props) {

    const {
      label, details, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const [isOpen, setIsOpen] = React.useState(false);

    // Build aria state props
    const ariaProps = a11y.state({
      expanded: !!isOpen
    });

    return React.createElement(
      RNView,
      Object.assign({ style: [Style_.utilities['flex_row'], Style_.utilities['align_center'], style] }, rest),
      React.createElement(
        Pressable,
        Object.assign({
          onPress: function () {
            setIsOpen(!isOpen);
          },
          accessibilityRole: 'button',
          accessibilityLabel: 'AI label',
          style: [
            Style_.utilities['br_sm'],
            Style_.utilities['p_h_xs'],
            Style_.utilities['p_v_xs'],
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
              Style_.utilities['background_surface'],
              Style_.utilities['br_md'],
              Style_.utilities['border_default'],
              Style_.utilities['p_a_sm'],
              Style_.utilities['shadow_sm'],
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
