// Info: Select composite [S3 overlay]. A dropdown select with a trigger
// button and a menu of options. Uses A11y, Overlay,
// AnchoredPosition, ControllableState. Role combobox.
//   value       -> string (controlled)
//   defaultValue-> string (uncontrolled)
//   onChange    -> callback receiving the selected value
//   options     -> array of { value, label }
//   placeholder -> string (default 'Select an option')
//   disabled    -> boolean
//   invalid     -> boolean


// Imports
import { View as RNView, Pressable, Platform } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the Select composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Select component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////

  const useOverlay = Parts.Overlay.useOverlay;

  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const Select = function Select (props) {


    const {
      value, defaultValue, onChange, options, placeholder, disabled, invalid,
      style, accessibilityLabel,
      ...rest
    } = props;

    const React = Lib.React;
    const anchorRef = React.useRef(null);

    // Controlled/uncontrolled state for the selected value
    const state = Parts.ControllableState({
      value: value,
      defaultValue: defaultValue,
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    const [isOpen, setIsOpen] = React.useState(false);
    const isDisabled = !!disabled;
    const isInvalid = !!invalid;
    const colorMap = Style.tokens.Color;
    const optionList = options || [];

    // Find the selected option label
    const selectedOption = optionList.filter(function (opt) {
      return opt.value === resolvedValue;
    })[0];
    const displayLabel = selectedOption ? selectedOption.label : (placeholder || 'Select an option');

    // Anchored position for the dropdown panel
    const anchored = Parts.AnchoredPosition({
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

    const handleSelect = function (optValue) {
      setValue(optValue);
      setIsOpen(false);
    };

    // Build aria state props for the trigger
    const ariaStateProps = Parts.A11y.state({
      disabled: isDisabled,
      expanded: !!isOpen,
      invalid: isInvalid
    });

    // Build keyboard activation props for the combobox trigger
    const pressKeysProps = Parts.PressKeys({
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
          accessibilityLabel: accessibilityLabel || placeholder || 'Select',
          style: [
            Style.utilities['flex_row'],
            Style.utilities['align_center'],
            Style.utilities['justify_between'],
            Style.utilities['br_md'],
            Style.utilities['border_default'],
            Style.utilities['p_h_md'],
            Style.utilities['p_v_sm'],
            Style.utilities['background_surface'],
            isInvalid
              ? { borderColor: colorMap.STATUS_DANGER }
              : null,
            isDisabled
              ? { backgroundColor: colorMap.BACKGROUND_SECONDARY }
              : null,
            style
          ]
        }, ariaStateProps, pressKeysProps, rest),
        React.createElement(Registry.Text, {
          size: 'md',
          color: selectedOption ? 'text_primary' : 'text_muted'
        }, displayLabel),
        React.createElement(Registry.Icon, {
          name: isOpen ? 'chevron_up' : 'chevron_down',
          size: 'sm',
          color: 'TEXT_MUTED'
        })
      );
    };

    // Render the dropdown panel
    const renderPanel = function (zIndex) {
      const pos = anchored.position || { top: 0, left: 0 };

      return React.createElement(
        RNView,
        {
          style: [
            Style.utilities['background_surface'],
            Style.utilities['br_md'],
            Style.utilities['border_default'],
            Style.utilities['p_v_xs'],
            { position: 'absolute', top: pos.top, left: pos.left, minWidth: 200, zIndex: zIndex || 1000 }
          ]
        },
        optionList.map(function (opt) {
          const isSelected = opt.value === resolvedValue;
          return React.createElement(
            Pressable,
            Object.assign({
              key: opt.value,
              onPress: function () {
                handleSelect(opt.value);
              },
              accessibilityRole: 'option',
              accessibilityLabel: opt.label,
              style: [
                Style.utilities['p_h_md'],
                Style.utilities['p_v_xs'],
                isSelected
                  ? { backgroundColor: colorMap.APP_PRIMARY_SUBTLE }
                  : null
              ]
            }, Parts.A11y.state({ selected: isSelected })),
            React.createElement(Registry.Text, {
              size: 'md',
              color: isSelected ? 'app_primary' : 'text_primary'
            }, opt.label)
          );
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
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _Select = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return Select;

}/////////////////////////// Component Factory END /////////////////////////////
