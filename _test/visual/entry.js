// Info: Single entry point for esbuild. Bundles everything into one ESM file.
// Exports React, ReactDOM, and the component registry builder.
'use strict';

var React = require('react');
var ReactDOM = require('react-dom/client');
var UtilsFactory = require('helper-utils');
var DebugFactory = require('helper-debug');
var ComponentsFactory = require('rnw-components-carbon');
var HINT_PROPS = require('rnw-components-carbon/data/hint-props');

// Components excluded: Tooltip/DefinitionTooltip require React element children
var INTERACTIVE = [
  'Button', 'IconButton', 'Toggle', 'Checkbox', 'RadioButton',
  'Switch', 'Link', 'InlineLink', 'Tab', 'AccordionItem',
  'Slider', 'CopyButton',
  'MenuItem', 'SelectItem', 'ClickableTile', 'SelectableTile'
];

function buildRegistry() {
  var Utils = UtilsFactory();
  var Debug = DebugFactory({ Utils: Utils });
  var Device = {
    getPlatform: function () { return { success: true, platform: 'web', error: null }; },
    getViewport: function () { return { success: true, width: 1280, height: 800, error: null }; },
    onViewportChange: function () { return { success: true, unsubscribe: function () {}, error: null }; }
  };
  var Icons = {
    Glyph: function (props) {
      return React.createElement('span', { 'data-icon': props.name, 'aria-hidden': 'true' }, props.name);
    }
  };

  var Components = ComponentsFactory({
    Utils: Utils, Debug: Debug, React: React, Device: Device, Icons: Icons
  });

  var theme = {
    Color: {
      APP_PRIMARY: '#0f62fe', APP_PRIMARY_HOVERED: '#0353e9',
      APP_PRIMARY_PRESSED: '#0043d9', APP_PRIMARY_DISABLED: '#a6c8ff',
      APP_PRIMARY_SUBTLE: '#edf5ff', TEXT_PRIMARY: '#161616',
      TEXT_SECONDARY: '#525252', TEXT_MUTED: '#8d8d8d',
      TEXT_ON_PRIMARY: '#ffffff', BACKGROUND_PRIMARY: '#ffffff',
      BACKGROUND_SECONDARY: '#f4f4f4', SURFACE: '#ffffff',
      BORDER: '#e0e0e0', STATUS_SUCCESS: '#198038',
      STATUS_SUCCESS_SUBTLE: '#e8f5e9', STATUS_DANGER: '#da1e28',
      STATUS_DANGER_SUBTLE: '#fff1f1', STATUS_WARNING: '#f1c21b',
      STATUS_WARNING_SUBTLE: '#fcf4d6', STATUS_INFO: '#0043ce',
      STATUS_INFO_SUBTLE: '#edf5ff'
    },
    Dimension: {
      fontSize: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 },
      space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
      radius: { sm: 4, md: 8, lg: 12, xl: 16, pill: 999 },
      lineHeightRatio: 1.4
    },
    Font: {
      family: { primary: 'system-ui', secondary: 'system-ui' },
      weight: { regular: '400', medium: '500', semibold: '600', bold: '700' }
    },
    Breakpoint: { base: 0, sm: 480, md: 768, lg: 1024, xl: 1280 }
  };

  var built = Components.build(theme, 'base');
  return { C: built.Component, ALL_NAMES: Object.keys(built.Component) };
}

// Error Boundary class
class SafeBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error: error };
  }
  render() {
    if (this.state.error) {
      return React.createElement('span', {
        'data-error': this.state.error.message,
        style: { fontSize: 11, color: '#da1e28' }
      }, this.props.name + ': ' + this.state.error.message);
    }
    return this.props.children;
  }
}

exports.React = React;
exports.ReactDOM = ReactDOM;
exports.SafeBoundary = SafeBoundary;
exports.buildRegistry = buildRegistry;
exports.HINT_PROPS = HINT_PROPS;
exports.INTERACTIVE = INTERACTIVE;
