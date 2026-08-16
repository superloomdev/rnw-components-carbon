// Info: BottomToolbar molecule [S1 presentational]. A bottom toolbar with
// action buttons. Uses role="toolbar" for screen reader semantics.
//   items       -> array of { text, icon, onPress }
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the BottomToolbar molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The BottomToolbar component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function BottomToolbar (props) {

    // Destructure props
    const {
      items, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Render each toolbar item as a ghost Button
    const renderItem = function (item, index) {

      return React.createElement(Registry.Button, {
        key: index,
        kind: 'ghost',
        title: item.text,
        icon: item.icon,
        onPress: item.onPress
      });

    };

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'toolbar',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['justify_evenly'],
          style
        ]
      }, rest),
      (Array.isArray(items) ? items : []).map(renderItem)
    );

  };

};
