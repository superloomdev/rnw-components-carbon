// Info: Dropdown molecule [S3 overlay] (CANONICAL). A dropdown menu with
// focus trap, Escape/back dismissal, outside-press dismissal, and focus
// restoration. Uses the shared useFocusTrap hook. Composes Button, Text,
// and Icon atoms.
//
// S3 obligations (all six, same as Modal):
//   1. On open: record focus and move into the dropdown
//   2. While open: trap focus so Tab cycles within the dropdown
//   3. On Escape (web) or hardware back (Android): close
//   4. On outside press: close
//   5. On close: restore focus to the trigger
//   6. Announce with accessibilityViewIsModal (iOS)
//
// This is genuinely new code. Neither CTP nor the prototype has focus management.
'use strict';

const { View: RNView, Pressable, Platform } = require('react-native');


/********************************************************************
Build the Dropdown molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Dropdown component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  // Build the focus trap hook once
  const useFocusTrap = require('../useFocusTrap')(Lib);

  return function Dropdown (props) {

    // Destructure props
    const {
      triggerLabel, items, onSelect, style, isRtlActive, // eslint-disable-line no-unused-vars
      accessibilityLabel, ...rest
    } = props;

    const React = Lib.React;
    const [isOpen, setIsOpen] = React.useState(false);

    // Close handler
    const handleClose = function () {
      setIsOpen(false);
    };

    // Use the focus trap hook for all six S3 obligations
    const focusTrap = useFocusTrap({
      isOpen: isOpen,
      onClose: handleClose
    });

    const containerRef = focusTrap.containerRef;
    const onOutsidePress = focusTrap.onOutsidePress;
    const accessibilityProps = focusTrap.accessibilityProps;

    // Toggle the dropdown open/closed
    const handleTriggerPress = function () {
      setIsOpen(!isOpen);
    };

    // Handle item selection
    const handleItemSelect = function (item) {

      setIsOpen(false);

      if (Lib.Utils.isFunction(onSelect)) {
        onSelect(item);
      }

    };

    // Build accessibility state for the trigger
    const triggerAccessibilityState = {
      expanded: !!isOpen
    };

    // Render the trigger button
    const trigger = Lib.React.createElement(
      Pressable,
      {
        onPress: handleTriggerPress,
        accessibilityRole: 'button',
        accessibilityLabel: accessibilityLabel || triggerLabel,
        accessibilityState: triggerAccessibilityState,
        style: [
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_sm'],
          Style_.utilities['br_md'],
          Style_.utilities['border_default'],
          Style_.utilities['background_surface'],
          Style_.utilities['flex_row'],
          Style_.utilities['align_center']
        ]
      },
      Lib.React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_primary'
      }, triggerLabel),
      Lib.React.createElement(Registry.Icon, {
        name: isOpen ? 'chevron-up' : 'chevron-down',
        size: 'sm',
        color: 'TEXT_SECONDARY',
        style: Style_.utilities['m_s_xs']
      })
    );

    // Render the dropdown panel when open
    if (!isOpen) {
      return trigger;
    }

    // Build the dropdown items
    const itemElements = (items || []).map(function (item) {
      return Lib.React.createElement(
        Pressable,
        {
          key: item.value,
          onPress: function () {
            handleItemSelect(item);
          },
          accessibilityRole: 'menuitem',
          accessibilityLabel: item.label,
          style: [
            Style_.utilities['p_h_md'],
            Style_.utilities['p_v_sm']
          ]
        },
        Lib.React.createElement(Registry.Text, {
          size: 'md',
          color: 'text_primary'
        }, item.label)
      );
    });

    // Dropdown panel with focus trap
    const panel = Lib.React.createElement(
      RNView,
      Object.assign({
        ref: containerRef,
        style: [
          Style_.utilities['background_surface'],
          Style_.utilities['br_md'],
          Style_.utilities['border_default'],
          Style_.utilities['p_v_xs'],
          {
            position: Platform.OS === 'web' ? 'absolute' : 'absolute',
            top: '100%',
            left: 0,
            minWidth: 200,
            zIndex: 1000
          },
          style
        ]
      }, accessibilityProps, rest),
      itemElements
    );

    // Render trigger + backdrop + panel
    return Lib.React.createElement(
      RNView,
      { style: { position: 'relative' } },
      trigger,
      // Backdrop for outside-press dismissal
      Lib.React.createElement(Pressable, {
        onPress: onOutsidePress,
        style: {
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 999
        }
      }),
      panel
    );

  };

};
