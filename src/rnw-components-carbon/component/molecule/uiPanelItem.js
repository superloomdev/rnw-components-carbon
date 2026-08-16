// Info: UiPanelItem molecule [S2 interactive]. A single item within a
// UiPanel, with icon, text, and onPress. Uses role="button" for screen
// reader semantics.
//   icon        -> icon name (optional)
//   text        -> item label
//   onPress     -> callback when pressed
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the UiPanelItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The UiPanelItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function UiPanelItem (props) {

    // Destructure props
    const {
      icon, text, onPress, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onPress,
        accessibilityRole: 'button',
        accessibilityLabel: text,
        style: [
          Style.utilities['flex_row'],
          Style.utilities['items_center'],
          style
        ]
      }, rest),
      icon ? React.createElement(Registry.Icon, { name: icon }) : null,
      React.createElement(Registry.Text, null, text || '')
    );

  };

};
