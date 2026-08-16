'use strict';

// Real themer-driven theme generation. Never hand-written.
// Builds the matrix: platforms x variants, using the same template the demo
// uses. The native projection is the primary matrix for all component tests;
// the web projection is tested only to assert it is rejected.

const path = require('path');


/********************************************************************
Build a real theme from the themer engine for a given platform.

@param {Object} Themer   - Built themer instance
@param {Object} Components - Built Components instance (for themeContract)
@param {String} platform  - 'native' or 'web'

@return {Object} - Theme contract { Color, Dimension, Font, Breakpoint }
*********************************************************************/
function buildRealTheme (Themer, Components, platform) {

  // Load the template from the demo app if available, otherwise use inline
  let template;
  try {
    template = require(path.resolve(
      __dirname, '..', '..', '..', '..', '..', 'codebase-demo-client-rnw',
      'src', 'themes', 'themer-template.js'
    ));
  } catch (e) {
    // Fallback inline template matching the demo's structure
    template = createFallbackTemplate();
  }

  // Build with the real engine
  const built = Themer.buildTheme(template, [], platform);

  // Bridge through themeContract to get the shape components expect
  return Components.themeContract(built);

}


/********************************************************************
Create the theme matrix: platforms x variants.

@param {Object} deps - { Utils, Debug }

@return {Object} - { native, web, createTestTheme }
*********************************************************************/
function createThemeMatrix (deps) {

  const Utils = deps.Utils;
  const Debug = deps.Debug;

  const Themer = require('helper-themer')({ Utils: Utils, Debug: Debug });

  // We need a minimal Components instance to use themeContract
  // But themeContract is a static reshaper, we can call it from any instance
  const React = deps.React;
  const Device = deps.Device;
  const Components = require('rnw-components-carbon')({
    Utils: Utils,
    Debug: Debug,
    React: React,
    Device: Device
  });

  return {
    native: buildRealTheme(Themer, Components, 'native'),
    web: buildRealTheme(Themer, Components, 'web'),

    // Retained for one purpose: a fixed-value control case
    createTestTheme: createTestTheme
  };

}


// The fixed-value control theme. Retained for backward compatibility with
// existing tests that need deterministic values. It is no longer the default.
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
      TEXT_MUTED: '#8d8d8d',
      TEXT_ON_PRIMARY: '#ffffff',
      BACKGROUND_PRIMARY: '#ffffff',
      BACKGROUND_SECONDARY: '#f4f4f4',
      SURFACE: '#ffffff',
      BORDER: '#e0e0e0',
      STATUS_SUCCESS: '#198038',
      STATUS_SUCCESS_SUBTLE: '#e8f5e9',
      STATUS_DANGER: '#da1e28',
      STATUS_DANGER_SUBTLE: '#fff1f1',
      STATUS_WARNING: '#f1c21b',
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


// Fallback template when the demo template is not accessible
function createFallbackTemplate () {

  return {
    polarity: 'light',
    ramp: [
      '#ffffff', '#f4f4f4', '#e0e0e0', '#c6c6c6', '#a8a8a8',
      '#8d8d8d', '#6f6f6f', '#525252', '#393939', '#262626', '#161616'
    ],
    palette: {
      blue60: '#0f62fe',
      red60: '#da1e28',
      green60: '#198038',
      yellow60: '#f1c21b',
      indigo60: '#4f46e5'
    },
    scales: {
      base_font_size: 16,
      geometric: { base: 16, ratio: 1.2 },
      miniUnit: { base: 4 }
    },
    tokens: {
      _white: '#ffffff',
      _black: '#161616',
      'color.APP_PRIMARY': '#4F46E5',
      'color.TEXT_PRIMARY': '#111827',
      'color.BACKGROUND_PRIMARY': '#FFFFFF',
      'color.STATUS_SUCCESS': '#16A34A',
      'color.STATUS_DANGER': '#DC2626',
      'color.STATUS_WARNING': '#D97706',
      'color.STATUS_INFO': '#2563EB',
      'color.TEXT_ON_PRIMARY': '#FFFFFF',
      'color.APP_PRIMARY_HOVERED': { op: 'mix', args: ['color.APP_PRIMARY', '_white', 90] },
      'color.APP_PRIMARY_PRESSED': { op: 'mix', args: ['color.APP_PRIMARY', '_white', 82] },
      'color.APP_PRIMARY_FOCUSED': { op: 'mix', args: ['color.APP_PRIMARY', '_white', 86] },
      'color.APP_PRIMARY_DISABLED': { op: 'mix', args: ['color.APP_PRIMARY', '_white', 45] },
      'color.APP_PRIMARY_SUBTLE': { op: 'mix', args: ['color.APP_PRIMARY', 'color.BACKGROUND_PRIMARY', 12] },
      'color.TEXT_SECONDARY': { op: 'mix', args: ['color.TEXT_PRIMARY', 'color.BACKGROUND_PRIMARY', 62] },
      'color.TEXT_MUTED': { op: 'mix', args: ['color.TEXT_PRIMARY', 'color.BACKGROUND_PRIMARY', 40] },
      'color.BACKGROUND_SECONDARY': { op: 'mix', args: ['color.TEXT_PRIMARY', 'color.BACKGROUND_PRIMARY', 4] },
      'color.SURFACE': '{color.BACKGROUND_PRIMARY}',
      'color.BORDER': { op: 'mix', args: ['color.TEXT_PRIMARY', 'color.BACKGROUND_PRIMARY', 14] },
      'color.STATUS_SUCCESS_SUBTLE': { op: 'mix', args: ['color.STATUS_SUCCESS', 'color.BACKGROUND_PRIMARY', 12] },
      'color.STATUS_DANGER_SUBTLE': { op: 'mix', args: ['color.STATUS_DANGER', 'color.BACKGROUND_PRIMARY', 12] },
      'color.STATUS_WARNING_SUBTLE': { op: 'mix', args: ['color.STATUS_WARNING', 'color.BACKGROUND_PRIMARY', 12] },
      'color.STATUS_INFO_SUBTLE': { op: 'mix', args: ['color.STATUS_INFO', 'color.BACKGROUND_PRIMARY', 12] },
      'dimension.font_size.xs': { scale: 'geometric', step: -1 },
      'dimension.font_size.sm': { scale: 'geometric', step: 0 },
      'dimension.font_size.md': { scale: 'geometric', step: 1 },
      'dimension.font_size.lg': { scale: 'geometric', step: 2 },
      'dimension.font_size.xl': { scale: 'geometric', step: 3 },
      'dimension.font_size.xxl': { scale: 'geometric', step: 4 },
      'dimension.space.none': { scale: 'miniUnit', multiplier: 0 },
      'dimension.space.xs': { scale: 'miniUnit', multiplier: 1 },
      'dimension.space.sm': { scale: 'miniUnit', multiplier: 2 },
      'dimension.space.md': { scale: 'miniUnit', multiplier: 3 },
      'dimension.space.lg': { scale: 'miniUnit', multiplier: 4 },
      'dimension.space.xl': { scale: 'miniUnit', multiplier: 6 },
      'dimension.space.xxl': { scale: 'miniUnit', multiplier: 8 },
      'dimension.radius.none': 0,
      'dimension.radius.sm': 4,
      'dimension.radius.md': 8,
      'dimension.radius.lg': 12,
      'dimension.radius.pill': 999,
      'dimension.line_height_ratio': 1.45,
      'font.family.primary': 'System',
      'font.family.secondary': 'System',
      'font.weight.regular': '400',
      'font.weight.medium': '500',
      'font.weight.semibold': '600',
      'font.weight.bold': '700'
    },
    meta: {
      '_white': { group: 'colour' },
      '_black': { group: 'colour' },
      'color.APP_PRIMARY': { group: 'colour' },
      'color.TEXT_PRIMARY': { group: 'colour' },
      'color.BACKGROUND_PRIMARY': { group: 'colour' },
      'color.STATUS_SUCCESS': { group: 'colour' },
      'color.STATUS_DANGER': { group: 'colour' },
      'color.STATUS_WARNING': { group: 'colour' },
      'color.STATUS_INFO': { group: 'colour' },
      'color.TEXT_ON_PRIMARY': { group: 'colour' }
    }
  };

}


// Real-family theme variant for exercising the native per-weight-face path.
// Uses Poppins family names to prove that Typeface.isSynthesizing returns
// false and fontWeight is omitted from the style fragment. The component
// package does not ship Poppins fonts; this is a name-only test fixture.
function createRealFamilyTheme () {

  return {
    Color: {
      APP_PRIMARY: '#0f62fe',
      APP_PRIMARY_HOVERED: '#0353e9',
      APP_PRIMARY_PRESSED: '#0043d9',
      APP_PRIMARY_DISABLED: '#a6c8ff',
      APP_PRIMARY_SUBTLE: '#edf5ff',
      TEXT_PRIMARY: '#161616',
      TEXT_SECONDARY: '#525252',
      TEXT_MUTED: '#8d8d8d',
      TEXT_ON_PRIMARY: '#ffffff',
      BACKGROUND_PRIMARY: '#ffffff',
      BACKGROUND_SECONDARY: '#f4f4f4',
      SURFACE: '#ffffff',
      BORDER: '#e0e0e0',
      STATUS_SUCCESS: '#198038',
      STATUS_SUCCESS_SUBTLE: '#e8f5e9',
      STATUS_DANGER: '#da1e28',
      STATUS_DANGER_SUBTLE: '#fff1f1',
      STATUS_WARNING: '#f1c21b',
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
      family: { primary: 'Poppins_400Regular', secondary: 'Poppins_600SemiBold' },
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


module.exports = {
  createThemeMatrix: createThemeMatrix,
  createTestTheme: createTestTheme,
  createRealFamilyTheme: createRealFamilyTheme
};
