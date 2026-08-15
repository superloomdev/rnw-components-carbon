// Info: DateRangePicker composite [S3 overlay]. A date range picker with two
// date inputs for start and end dates. Uses M1 (a11y), M8
// (useControllableState). Role group.
//   startDate   -> string YYYY-MM-DD (controlled)
//   endDate     -> string YYYY-MM-DD (controlled)
//   onChange    -> callback receiving { startDate, endDate }
//   disabled    -> boolean
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the DateRangePicker composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The DateRangePicker component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);

  return function DateRangePicker (props) {

    const {
      startDate, endDate, onChange, disabled,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const isDisabled = !!disabled;
    const colorMap = Style_.tokens.Color;

    const handleStartChange = function (text) {
      if (Lib.Utils.isFunction(onChange)) {
        onChange({ startDate: text, endDate: endDate });
      }
    };

    const handleEndChange = function (text) {
      if (Lib.Utils.isFunction(onChange)) {
        onChange({ startDate: startDate, endDate: text });
      }
    };

    // Build aria state props for the group
    const ariaStateProps = a11y.state({
      disabled: isDisabled
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        accessibilityLabel: accessibilityLabel || 'Date range',
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          style
        ]
      }, ariaStateProps, rest),
      React.createElement(Registry.TextInput, {
        value: startDate || '',
        onChangeText: handleStartChange,
        isDisabled: isDisabled,
        accessibilityLabel: 'Start date',
        placeholder: 'YYYY-MM-DD',
        style: [Style_.utilities['flex_1'], { marginRight: 4 }]
      }),
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_secondary',
        style: { marginHorizontal: 4 }
      }, '-'),
      React.createElement(Registry.TextInput, {
        value: endDate || '',
        onChangeText: handleEndChange,
        isDisabled: isDisabled,
        accessibilityLabel: 'End date',
        placeholder: 'YYYY-MM-DD',
        style: [Style_.utilities['flex_1'], { marginLeft: 4, borderColor: colorMap.BORDER || '#e0e0e0' }]
      })
    );

  };

};
