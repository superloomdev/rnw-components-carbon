// Info: MenuButton composite [S3 overlay]. A button that opens a Menu.
// Uses M1 (a11y), M4 (OverlayHost), M5 (useAnchoredPosition), M7 (createCompoundContext).
// Composes Button, Menu, MenuItem atoms.
//   label       -> string (button label)
//   items       -> array of { label, onPress, disabled }
//   icon        -> string (optional leading icon)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the MenuButton composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The MenuButton component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const Menu = require('./menu')(Lib, CONFIG, ERRORS, Registry, Style_);

  return function MenuButton (props) {

    const {
      label, items, icon, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClose = function () {
      setIsOpen(false);
    };

    // Build aria state props
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
      { style: { position: 'relative' } },
      React.createElement(
        Registry.Button,
        Object.assign({
          onPress: function () {
            setIsOpen(!isOpen);
          },
          icon: icon
        }, ariaProps, rest),
        label
      ),
      React.createElement(Menu, { isOpen: isOpen, onClose: handleClose }, menuItems)
    );

  };

};
