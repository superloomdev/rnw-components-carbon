// Info: BottomToolbarPrimaryAction molecule [S2 interactive]. A bottom
// toolbar with a primary call-to-action button and secondary actions.
// Uses role="toolbar" for screen reader semantics.
//   primaryAction -> object with { text, onPress }
//   items         -> array of secondary { text, icon, onPress }
//   style         -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the BottomToolbarPrimaryAction molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The BottomToolbarPrimaryAction component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function BottomToolbarPrimaryAction (props) {

    // Destructure props
    const {
      primaryAction, items, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Render secondary items
    let secondaryElements = [];

    if (Array.isArray(items)) {
      secondaryElements = items.map(function (item, index) {
        return React.createElement(Registry.Button, {
          key: index,
          kind: 'ghost',
          title: item.text,
          icon: item.icon,
          onPress: item.onPress
        });
      });
    }

    // Render primary action
    let primaryElement = null;

    if (primaryAction && Lib.Utils.isFunction(primaryAction.onPress)) {
      primaryElement = React.createElement(Registry.Button, {
        kind: 'primary',
        title: primaryAction.text,
        onPress: primaryAction.onPress
      });
    }

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'toolbar',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['items_center'],
          Style.utilities['justify_between'],
          style
        ]
      }, rest),
      React.createElement(RNView, { style: Style.utilities['flex_row'] }, secondaryElements),
      primaryElement
    );

  };

};
