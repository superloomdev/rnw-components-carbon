// Info: ComboButton composite [S3 overlay]. A split button: primary action
// plus a dropdown for secondary actions. Uses M1 (a11y), M4 (Overlay),
// M5 (useAnchoredPosition), M7 (createCompoundContext).
//   primaryLabel  -> string (main button label)
//   onPrimaryPress-> function (main button handler)
//   items         -> array of { label, onPress, disabled }
//   style         -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the ComboButton composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ComboButton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  const Menu = require('./menu')(Lib, CONFIG, ERRORS, Parts, Registry, Style);

  return function ComboButton (props) {

    const {
      primaryLabel, onPrimaryPress, items, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClose = function () {
      setIsOpen(false);
    };

    // Build aria state props for the dropdown trigger
    const ariaProps = Parts.A11y.state({
      expanded: !!isOpen
    });

    // Build menu items
    const menuItems = (items || []).map(function (item) {
      return React.createElement(Registry.MenuItem, {
        key: item.label,
        label: item.label,
        onPress: function () {
          setIsOpen(false);
          if (Lib.Utils.isFunction(item.onPress)) {
            item.onPress();
          }
        },
        disabled: item.disabled
      });
    });

    return React.createElement(
      RNView,
      Object.assign({ style: [Style.utilities['flex_row'], style] }, rest),
      // Primary button
      React.createElement(
        Registry.Button,
        { onPress: onPrimaryPress },
        primaryLabel
      ),
      // Dropdown trigger
      React.createElement(
        Pressable,
        Object.assign({
          onPress: function () {
            setIsOpen(!isOpen);
          },
          accessibilityRole: 'button',
          accessibilityLabel: 'More options',
          style: [Style.utilities['p_h_sm'], Style.utilities['p_v_sm'], Style.utilities['border_default']]
        }, ariaProps),
        React.createElement(Registry.Icon, {
          name: 'chevron-down',
          size: 'sm',
          color: 'TEXT_PRIMARY'
        })
      ),
      React.createElement(Menu, { isOpen: isOpen, onClose: handleClose }, menuItems)
    );

  };

};
