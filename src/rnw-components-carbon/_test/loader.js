'use strict';

// Bootstrap jsdom globals before any react-native-web require.
// RNW needs a DOM environment to define its components and stylesheets.
require('./harness/dom');

// Intercept require('react-native') to use real react-native-web.
// RNW provides the same API surface minus a few removed exports
// (Slider was removed from RN core in 0.62 and RNW never shipped it).
// Resolve the path once from _test/ where react-native-web is installed.
const Module = require('module');
const originalResolveFilename = Module._resolveFilename;
const rnwPath = require.resolve('react-native-web');

Module._resolveFilename = function (request, parent, isMain, options) {

  if (request === 'react-native') {
    return rnwPath;
  }

  return originalResolveFilename.apply(this, arguments);

};


// --- Stubs for injected dependencies ---

// Device stub with viewport subscription support
function createDeviceStub (width, height) {

  const listeners = [];
  let current = { width: width, height: height };

  return {

    getPlatform: function () {
      return { success: true, platform: 'web', error: null };
    },

    getViewport: function () {
      return { success: true, width: current.width, height: current.height, error: null };
    },

    onViewportChange: function (callback) {
      listeners.push(callback);
      return {
        success: true,
        unsubscribe: function () {
          const idx = listeners.indexOf(callback);
          if (idx !== -1) {
            listeners.splice(idx, 1);
          }
        },
        error: null
      };
    },

    // Test helper: simulate a viewport change event
    _emitChange: function (dims) {
      current = { width: dims.width, height: dims.height };
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](dims);
      }
    },

    // Pass-through for unused optional APIs
    getNetworkState: async function () {
      return { success: true, isConnected: true, type: 'wifi', error: null };
    },
    onAppStateChange: function () {
      return { success: true, unsubscribe: function () {}, error: null };
    },
    getSafeAreaInsets: function () {
      return { success: true, top: 0, bottom: 0, left: 0, right: 0, error: null };
    }

  };

}

// Icon stub: renders a proper React element so test-renderer can handle it
function createIconsStub () {

  return {
    Glyph: function (props) {
      return React.createElement('Glyph', props);
    }
  };

}


// --- Build a real theme contract for testing ---

function createTestTheme () {

  return {
    Color: {
      APP_PRIMARY: '#0f62fe',
      APP_PRIMARY_HOVERED: '#0353e9',
      APP_PRIMARY_PRESSED: '#0043d9',
      APP_PRIMARY_DISABLED: '#a6c8ff',
      APP_PRIMARY_SUBTLE: '#edf5ff',
      TEXT_PRIMARY: '#161616',
      TEXT_SECONDARY: '#525252',
      TEXT_MUTED: '#6f6f6f',
      TEXT_DISABLED: '#a8a8a8',
      TEXT_ON_PRIMARY: '#ffffff',
      BACKGROUND_PRIMARY: '#ffffff',
      BACKGROUND_SECONDARY: '#f4f4f4',
      SURFACE: '#ffffff',
      BORDER: '#e0e0e0',
      BORDER_STRONG: '#8d8d8d',
      BORDER_SUBTLE: '#e0e0e0',
      STATUS_SUCCESS: '#0e6027',
      STATUS_SUCCESS_SUBTLE: '#e8f5e9',
      STATUS_DANGER: '#da1e28',
      STATUS_DANGER_SUBTLE: '#fff1f1',
      STATUS_WARNING: '#8e6a00',
      STATUS_WARNING_SUBTLE: '#fcf4d6',
      STATUS_INFO: '#0043ce',
      STATUS_INFO_SUBTLE: '#edf5ff'
    },
    Dimension: {
      fontSize: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 },
      space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
      radius: { sm: 4, md: 8, lg: 12, xl: 16, pill: 999 },
      lineHeightRatio: 1.4
    },
    Font: {
      family: { primary: 'System', secondary: 'System' },
      weight: { regular: '400', medium: '500', semibold: '600', bold: '700' }
    },
    Breakpoint: {
      base: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  };

}


// --- Build the Components module with stubs ---

const Utils = require('helper-utils')();
const Debug = require('helper-debug')({ Utils: Utils });
const React = require('react');
const TestRenderer = require('react-test-renderer');
const Device = createDeviceStub(375, 812);
const Icons = createIconsStub();

const Components = require('rnw-components-carbon')({
  Utils: Utils,
  Debug: Debug,
  React: React,
  Device: Device,
  Icons: Icons
});

// Build the themed registry
const testTheme = createTestTheme();
const built = Components.build(testTheme, 'base');


module.exports = {
  Components: Components,
  Component: built.Component,
  Style: built.Style,
  theme: testTheme,
  Utils: Utils,
  Debug: Debug,
  React: React,
  TestRenderer: TestRenderer,
  Device: Device,
  Icons: Icons,
  createDeviceStub: createDeviceStub,
  createIconsStub: createIconsStub,
  createTestTheme: createTestTheme
};
