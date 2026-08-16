// Info: OverflowMenu composite [S3 overlay]. A button that opens a Menu.
// Uses M1 (a11y), M3 (useRovingTabIndex), M4 (Overlay), M5 (useAnchoredPosition),
// M7 (createCompoundContext). Composes Button, Menu, MenuItem atoms.
//   items       -> array of { label, onPress, disabled }
//   triggerLabel-> string (default 'Options')
//   placement   -> string (default 'bottom-end')
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the OverflowMenu composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The OverflowMenu component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  const Menu = require('./menu')(Lib, CONFIG, ERRORS, Parts, Registry, Style);

  return function OverflowMenu (props) {

    const {
      items, triggerLabel, placement, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClose = function () {
      setIsOpen(false);
    };
    const handleTrigger = function () {
      setIsOpen(!isOpen);
    };

    // Build aria state props for trigger
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
      { style: { position: 'relative' } },
      React.createElement(
        Pressable,
        Object.assign({
          onPress: handleTrigger,
          accessibilityRole: 'button',
          accessibilityLabel: triggerLabel || 'Options',
          style: [Style.utilities['p_h_sm'], Style.utilities['p_v_sm'], style]
        }, ariaProps, rest),
        React.createElement(Registry.Icon, {
          name: 'overflow',
          size: 'md',
          color: 'TEXT_PRIMARY'
        })
      ),
      React.createElement(Menu, { isOpen: isOpen, onClose: handleClose }, menuItems)
    );

  };

};
