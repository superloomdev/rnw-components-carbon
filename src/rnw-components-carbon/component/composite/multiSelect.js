// Info: MultiSelect composite [S3 overlay]. A dropdown with multi-select
// checkboxes. Uses M1 (a11y), M4 (Overlay), M5 (useAnchoredPosition),
// M8 (useControllableState). Role listbox.
//   values      -> array (controlled)
//   defaultValues-> array (uncontrolled)
//   onChange    -> callback receiving the selected values array
//   options     -> array of { value, label }
//   placeholder -> string (default 'Select options')
//   disabled    -> boolean
//   invalid     -> boolean
'use strict';

const { View: RNView, Pressable, Platform } = require('react-native');


/********************************************************************
Build the MultiSelect composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The MultiSelect component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const useControllableState = require('../useControllableState')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);
  const useAnchoredPosition = require('../useAnchoredPosition')(Lib);
  const overlay = require('../Overlay')(Lib);
  const useOverlay = overlay.useOverlay;

  return function MultiSelect (props) {

    const {
      values, defaultValues, onChange, options, placeholder, disabled, invalid,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const anchorRef = React.useRef(null);

    // Controlled/uncontrolled state for the selected values array
    const state = useControllableState({
      value: values,
      defaultValue: defaultValues || [],
      onChange: onChange
    });
    const resolvedValues = state[0];
    const setValues = state[1];

    const [isOpen, setIsOpen] = React.useState(false);
    const isDisabled = !!disabled;
    const isInvalid = !!invalid;
    const colorMap = Style_.tokens.Color;
    const optionList = options || [];
    const selectedArray = resolvedValues || [];

    // Build the display label from selected count
    const displayLabel = selectedArray.length === 0
      ? (placeholder || 'Select options')
      : selectedArray.length + ' selected';

    // Anchored position for the dropdown panel
    const anchored = useAnchoredPosition({
      placement: 'bottom-start',
      anchorRef: anchorRef
    });

    // Measure position when the dropdown opens
    React.useEffect(function () {
      if (isOpen) {
        anchored.measure();
      }
    }, [isOpen]);

    const handleToggle = function () {
      if (isDisabled) {
        return;
      }
      setIsOpen(!isOpen);
    };

    const handleClose = function () {
      setIsOpen(false);
    };

    const handleToggleOption = function (optValue) {
      const isSelected = selectedArray.indexOf(optValue) >= 0;
      if (isSelected) {
        setValues(selectedArray.filter(function (v) {
          return v !== optValue;
        }));
      } else {
        setValues(selectedArray.concat([optValue]));
      }
    };

    // Build aria state props for the trigger
    const ariaStateProps = a11y.state({
      disabled: isDisabled,
      expanded: !!isOpen,
      invalid: isInvalid
    });

    // Build keyboard activation props for the trigger
    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: handleToggle,
      disabled: isDisabled
    });

    // Render the trigger button
    const renderTrigger = function () {
      return React.createElement(
        Pressable,
        Object.assign({
          ref: anchorRef,
          onPress: handleToggle,
          disabled: isDisabled,
          accessibilityRole: 'combobox',
          accessibilityLabel: accessibilityLabel || placeholder || 'Multi-select',
          style: [
            Style_.utilities['flex_row'],
            Style_.utilities['align_center'],
            Style_.utilities['justify_between'],
            Style_.utilities['br_md'],
            Style_.utilities['border_default'],
            Style_.utilities['p_h_md'],
            Style_.utilities['p_v_sm'],
            Style_.utilities['background_surface'],
            isInvalid
              ? { borderColor: colorMap.STATUS_DANGER || '#da1e28' }
              : null,
            isDisabled
              ? { backgroundColor: colorMap.BACKGROUND_SECONDARY || '#f4f4f4' }
              : null,
            style
          ]
        }, ariaStateProps, pressKeysProps, rest),
        React.createElement(Registry.Text, {
          size: 'md',
          color: selectedArray.length > 0 ? 'text_primary' : 'text_muted'
        }, displayLabel),
        React.createElement(Registry.Icon, {
          name: isOpen ? 'chevron_up' : 'chevron_down',
          size: 'sm',
          color: 'TEXT_MUTED'
        })
      );
    };

    // Render the dropdown panel with checkbox options
    const renderPanel = function (zIndex) {
      const pos = anchored.position || { top: 0, left: 0 };

      return React.createElement(
        RNView,
        {
          accessibilityRole: 'listbox',
          'aria-multiselectable': true,
          style: [
            Style_.utilities['background_surface'],
            Style_.utilities['br_md'],
            Style_.utilities['border_default'],
            Style_.utilities['p_v_xs'],
            { position: 'absolute', top: pos.top, left: pos.left, minWidth: 200, zIndex: zIndex || 1000 }
          ]
        },
        optionList.map(function (opt) {
          const isSelected = selectedArray.indexOf(opt.value) >= 0;
          return React.createElement(Registry.Checkbox, {
            key: opt.value,
            checked: isSelected,
            onChange: function () {
              handleToggleOption(opt.value);
            },
            label: opt.label,
            disabled: isDisabled
          });
        })
      );
    };

    // Render backdrop
    const renderBackdrop = function () {
      return React.createElement(Pressable, {
        onPress: handleClose,
        style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
      });
    };

    if (!isOpen) {
      return React.createElement(RNView, { style: { position: 'relative' } }, renderTrigger());
    }

    // On native, render inline with backdrop
    if (Platform.OS !== 'web') {
      return React.createElement(
        RNView,
        { style: { position: 'relative' } },
        renderTrigger(),
        renderBackdrop(),
        renderPanel(1000)
      );
    }

    // On web, use Overlay
    const overlay = useOverlay({
      isOpen: true,
      trap: false,
      onClose: handleClose,
      render: function () {
        return React.createElement(
          React.Fragment,
          null,
          renderBackdrop(),
          renderPanel()
        );
      }
    });

    if (overlay.layerIndex < 0) {
      return React.createElement(
        RNView,
        { style: { position: 'relative' } },
        renderTrigger(),
        renderBackdrop(),
        renderPanel(1000)
      );
    }

    return React.createElement(RNView, { style: { position: 'relative' } }, renderTrigger());

  };

};
