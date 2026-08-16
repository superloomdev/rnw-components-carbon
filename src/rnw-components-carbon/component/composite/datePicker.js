// Info: DatePicker composite [S3 overlay]. A date picker with a trigger
// button and a calendar-like view. Uses M1 (a11y), M4 (Overlay),
// M5 (useAnchoredPosition), M8 (useControllableState). Role combobox.
//   value       -> string YYYY-MM-DD (controlled)
//   defaultValue-> string YYYY-MM-DD (uncontrolled)
//   onChange    -> callback receiving the selected date string
//   disabled    -> boolean
//   invalid     -> boolean
//   datePickerType -> 'single' | 'range' (default 'single'; 'range' absorbed from DateRangePicker)
'use strict';

const { View: RNView, Pressable, Platform } = require('react-native');


/********************************************************************
Build the DatePicker composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The DatePicker component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const useControllableState = require('../useControllableState')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);
  const useAnchoredPosition = require('../useAnchoredPosition')(Lib);
  const overlay = require('../Overlay')(Lib);
  const useOverlay = overlay.useOverlay;

  return function DatePicker (props) {

    const {
      value, defaultValue, onChange, disabled, invalid, datePickerType,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    // datePickerType: 'range' renders two date triggers (start and end).
    // Absorbs the deleted DateRangePicker composite.
    const isRange = datePickerType === 'range';

    const React = Lib.React;
    const anchorRef = React.useRef(null);

    // Controlled/uncontrolled state for the selected date
    const state = useControllableState({
      value: value,
      defaultValue: defaultValue || '',
      onChange: onChange
    });
    const resolvedValue = state[0];
    const setValue = state[1];

    const [isOpen, setIsOpen] = React.useState(false);
    const [viewYear, setViewYear] = React.useState(null);
    const [viewMonth, setViewMonth] = React.useState(null);
    const isDisabled = !!disabled;
    const isInvalid = !!invalid;
    const colorMap = Style_.tokens.Color;

    // Initialize the calendar view from the current value or today
    React.useEffect(function () {
      if (!isOpen) {
        return;
      }
      let year, month;
      if (resolvedValue) {
        const parts = String(resolvedValue).split('-');
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
      } else {
        const now = new Date();
        year = now.getFullYear();
        month = now.getMonth();
      }
      if (Lib.Utils.isNumber(year) && Lib.Utils.isNumber(month)) {
        setViewYear(year);
        setViewMonth(month);
      }
    }, [isOpen]);

    // Anchored position for the dropdown panel
    const anchored = useAnchoredPosition({
      placement: 'bottom-start',
      anchorRef: anchorRef
    });

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

    const handleSelectDay = function (day) {
      const monthStr = String(viewMonth + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      setValue(viewYear + '-' + monthStr + '-' + dayStr);
      setIsOpen(false);
    };

    const handlePrevMonth = function () {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear(viewYear - 1);
      } else {
        setViewMonth(viewMonth - 1);
      }
    };

    const handleNextMonth = function () {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear(viewYear + 1);
      } else {
        setViewMonth(viewMonth + 1);
      }
    };

    // Build aria state props for the trigger
    const ariaStateProps = a11y.state({
      disabled: isDisabled,
      expanded: !!isOpen,
      invalid: isInvalid
    });

    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: handleToggle,
      disabled: isDisabled
    });

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Compute the days in the current view month
    const daysInMonth = Lib.Utils.isNumber(viewYear) && Lib.Utils.isNumber(viewMonth)
      ? new Date(viewYear, viewMonth + 1, 0).getDate()
      : 30;
    const firstDayOfWeek = Lib.Utils.isNumber(viewYear) && Lib.Utils.isNumber(viewMonth)
      ? new Date(viewYear, viewMonth, 1).getDay()
      : 0;

    // Parse the selected day from the current value
    let selectedDay = null;
    if (resolvedValue) {
      const parts = String(resolvedValue).split('-');
      if (parseInt(parts[0], 10) === viewYear && parseInt(parts[1], 10) - 1 === viewMonth) {
        selectedDay = parseInt(parts[2], 10);
      }
    }

    // Render the trigger button
    const renderTrigger = function () {
      return React.createElement(
        Pressable,
        Object.assign({
          ref: anchorRef,
          onPress: handleToggle,
          disabled: isDisabled,
          accessibilityRole: 'combobox',
          accessibilityLabel: accessibilityLabel || 'Date picker',
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
          color: resolvedValue ? 'text_primary' : 'text_muted'
        }, resolvedValue || 'YYYY-MM-DD'),
        React.createElement(Registry.Icon, {
          name: 'calendar',
          size: 'sm',
          color: 'TEXT_MUTED'
        })
      );
    };

    // Render the calendar panel
    const renderPanel = function (zIndex) {
      const pos = anchored.position || { top: 0, left: 0 };

      // Build the calendar grid cells
      const cells = [];

      // Leading empty cells for the first week
      for (let i = 0; i < firstDayOfWeek; i++) {
        cells.push(React.createElement(RNView, {
          key: 'empty_' + i,
          style: { width: 32, height: 32 }
        }));
      }

      // Day cells
      for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = day === selectedDay;
        cells.push(React.createElement(
          Pressable,
          {
            key: 'day_' + day,
            onPress: function () {
              handleSelectDay(day);
            },
            accessibilityRole: 'option',
            accessibilityLabel: day + ' ' + (monthNames[viewMonth] || '') + ' ' + viewYear,
            style: [
              { width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
              isSelected
                ? { backgroundColor: colorMap.APP_PRIMARY || '#0f62fe' }
                : null
            ]
          },
          React.createElement(Registry.Text, {
            size: 'sm',
            color: isSelected ? 'text_on_primary' : 'text_primary'
          }, String(day))
        ));
      }

      return React.createElement(
        RNView,
        {
          style: [
            Style_.utilities['background_surface'],
            Style_.utilities['br_md'],
            Style_.utilities['border_default'],
            Style_.utilities['p_a_sm'],
            { position: 'absolute', top: pos.top, left: pos.left, width: 240, zIndex: zIndex || 1000 }
          ]
        },
        // Header with month navigation
        React.createElement(
          RNView,
          {
            style: [
              Style_.utilities['flex_row'],
              Style_.utilities['align_center'],
              Style_.utilities['justify_between'],
              Style_.utilities['m_b_xs']
            ]
          },
          React.createElement(
            Pressable,
            { onPress: handlePrevMonth, accessibilityRole: 'button', accessibilityLabel: 'Previous month' },
            React.createElement(Registry.Text, { size: 'md', color: 'text_primary', weight: 'bold' }, '<')
          ),
          React.createElement(Registry.Text, {
            size: 'md',
            color: 'text_primary',
            weight: 'semibold'
          }, (monthNames[viewMonth] || '') + ' ' + viewYear),
          React.createElement(
            Pressable,
            { onPress: handleNextMonth, accessibilityRole: 'button', accessibilityLabel: 'Next month' },
            React.createElement(Registry.Text, { size: 'md', color: 'text_primary', weight: 'bold' }, '>')
          )
        ),
        // Calendar grid
        React.createElement(
          RNView,
          { style: [Style_.utilities['flex_row'], Style_.utilities['flex_wrap']] },
          cells
        )
      );
    };

    // Render backdrop
    const renderBackdrop = function () {
      return React.createElement(Pressable, {
        onPress: handleClose,
        style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
      });
    };

    // Range mode: wrap two triggers in a group. The full range calendar
    // is built in P4; P3 establishes the prop contract.
    if (isRange) {
      return React.createElement(
        RNView,
        {
          accessibilityRole: 'group',
          accessibilityLabel: accessibilityLabel || 'date range picker',
          style: [Style_.utilities['flex_row'], Style_.utilities['items_center'], style]
        },
        renderTrigger(),
        React.createElement(Registry.Text, null, ' - '),
        renderTrigger()
      );
    }

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
