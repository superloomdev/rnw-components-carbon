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
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ComboButton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const Menu = require('./menu')(Lib, CONFIG, ERRORS, Registry, Style_);

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
    const ariaProps = a11y.state({
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
      Object.assign({ style: [Style_.utilities['flex_row'], style] }, rest),
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
          style: [Style_.utilities['p_h_sm'], Style_.utilities['p_v_sm'], Style_.utilities['border_default']]
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
