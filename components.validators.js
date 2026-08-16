// Info: Validators for rnw-components-carbon.
//
// Receives Lib and ERRORS by injection from the loader.
// Never self-requires the error catalog or data files.
// Boot-time validation throws TypeError; render-time validation is
// handled inside component factories via Lib.Debug.warn + fallback.
'use strict';

module.exports = function (Lib, ERRORS) {

  const Validators = {

    /********************************************************************
    Validate the merged config object. Throws TypeError on any
    misconfiguration so the module fails at startup, not at call time.

    @param {Object} CONFIG - Merged config for this instance
    @return {void}
    *********************************************************************/
    validateConfig: function (CONFIG) {

      // DEFAULT_FONT_SIZE must be a non-empty string
      if (!Lib.Utils.isString(CONFIG.DEFAULT_FONT_SIZE)) {
        throw new TypeError('rnw-components-carbon: DEFAULT_FONT_SIZE must be a string');
      }

      // DEFAULT_FONT_COLOR must be a non-empty string
      if (!Lib.Utils.isString(CONFIG.DEFAULT_FONT_COLOR)) {
        throw new TypeError('rnw-components-carbon: DEFAULT_FONT_COLOR must be a string');
      }

      // DEFAULT_FONT_WEIGHT must be a non-empty string
      if (!Lib.Utils.isString(CONFIG.DEFAULT_FONT_WEIGHT)) {
        throw new TypeError('rnw-components-carbon: DEFAULT_FONT_WEIGHT must be a string');
      }

      // MIN_HIT_TARGET must be a positive number
      if (!Lib.Utils.isNumber(CONFIG.MIN_HIT_TARGET) || CONFIG.MIN_HIT_TARGET <= 0) {
        throw new TypeError('rnw-components-carbon: MIN_HIT_TARGET must be a positive number');
      }

      // BREAKPOINT_ORDER must be a non-empty array of strings
      if (!Array.isArray(CONFIG.BREAKPOINT_ORDER) || CONFIG.BREAKPOINT_ORDER.length === 0) {
        throw new TypeError('rnw-components-carbon: BREAKPOINT_ORDER must be a non-empty array');
      }

    },


    /********************************************************************
    Validate the injected shared_libs container. Throws TypeError when
    a required injection is missing.

    @param {Object} shared_libs - The shared library container
    @return {void}
    *********************************************************************/
    validateInjections: function (shared_libs) {

      // React is required - two copies break hooks
      if (Lib.Utils.isNullOrUndefined(shared_libs.React)) {
        throw new TypeError('rnw-components-carbon: shared_libs.React is required (the react module)');
      }

      // Utils is required
      if (Lib.Utils.isNullOrUndefined(shared_libs.Utils)) {
        throw new TypeError('rnw-components-carbon: shared_libs.Utils is required');
      }

      // Debug is required for render-time warnings
      if (Lib.Utils.isNullOrUndefined(shared_libs.Debug)) {
        throw new TypeError('rnw-components-carbon: shared_libs.Debug is required');
      }

      // Device is required for viewport and breakpoint resolution
      if (Lib.Utils.isNullOrUndefined(shared_libs.Device)) {
        throw new TypeError('rnw-components-carbon: shared_libs.Device is required (js-rnw-helper-device)');
      }

    },


    /********************************************************************
    Validate a theme contract at build time. Throws TypeError when the
    theme is malformed or missing a required token group. This is a
    boot-time check, so it throws normally.

    @param {Object} theme - The theme contract { Color, Dimension, Font, Breakpoint }
    @return {void}
    *********************************************************************/
    validateTheme: function (theme) {

      // Theme must be an object
      if (!Lib.Utils.isObject(theme)) {
        throw new TypeError('rnw-components-carbon: theme must be an object');
      }

      // Color group is required
      if (!Lib.Utils.isObject(theme.Color)) {
        throw new TypeError('rnw-components-carbon: theme.Color must be an object');
      }

      // Dimension group is required
      if (!Lib.Utils.isObject(theme.Dimension)) {
        throw new TypeError('rnw-components-carbon: theme.Dimension must be an object');
      }

      // Dimension.fontSize is required
      if (!Lib.Utils.isObject(theme.Dimension.fontSize)) {
        throw new TypeError('rnw-components-carbon: theme.Dimension.fontSize must be an object');
      }

      // Dimension.space is required
      if (!Lib.Utils.isObject(theme.Dimension.space)) {
        throw new TypeError('rnw-components-carbon: theme.Dimension.space must be an object');
      }

      // Dimension.radius is required
      if (!Lib.Utils.isObject(theme.Dimension.radius)) {
        throw new TypeError('rnw-components-carbon: theme.Dimension.radius must be an object');
      }

      // Font group is required
      if (!Lib.Utils.isObject(theme.Font)) {
        throw new TypeError('rnw-components-carbon: theme.Font must be an object');
      }

      // Font.family is required
      if (!Lib.Utils.isObject(theme.Font.family)) {
        throw new TypeError('rnw-components-carbon: theme.Font.family must be an object');
      }

      // Font.weight is required
      if (!Lib.Utils.isObject(theme.Font.weight)) {
        throw new TypeError('rnw-components-carbon: theme.Font.weight must be an object');
      }

      // Breakpoint group is required
      if (!Lib.Utils.isObject(theme.Breakpoint)) {
        throw new TypeError('rnw-components-carbon: theme.Breakpoint must be an object');
      }

      // Value-level validation: dimension values must be finite numbers
      // Catches the web projection (rem/em strings) being fed to RNW components
      const UNIT_PATTERN = /(?:rem|em|%|vh|vw|px|pt)$/;
      const dimensionGroups = ['fontSize', 'space', 'radius'];

      for (let g = 0; g < dimensionGroups.length; g++) {
        const groupName = dimensionGroups[g];
        const group = theme.Dimension[groupName];

        if (!Lib.Utils.isObject(group)) {
          continue;
        }

        const keys = Object.keys(group);

        for (let k = 0; k < keys.length; k++) {
          const tokenKey = keys[k];
          const value = group[tokenKey];

          // Reject unit-suffixed strings (web projection leak)
          if (Lib.Utils.isString(value) && UNIT_PATTERN.test(value)) {
            throw new TypeError(
              'rnw-components-carbon: theme.Dimension.' + groupName + '.' + tokenKey +
              ' is "' + value + '" (unit-suffixed string). ' +
              'Pass the native projection, not the web projection. ' +
              ERRORS.THEME_VALUE_UNIT_STRING.type
            );
          }

          // Reject NaN and non-finite numbers
          if (!Lib.Utils.isNumber(value)) {
            throw new TypeError(
              'rnw-components-carbon: theme.Dimension.' + groupName + '.' + tokenKey +
              ' must be a finite number, got ' + typeof value + '. ' +
              ERRORS.THEME_VALUE_NOT_FINITE.type
            );
          }

        }

      }

    }


  };

  return Validators;

};
