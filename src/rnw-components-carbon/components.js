// Info: Carbon-informed component library for the RNW pipeline.
//
// Class I standalone module. Atoms and molecules over the themer, with
// theme-driven responsiveness and a real accessibility contract. React
// is injected as Lib.React; react-native is a direct peer dependency
// and imported normally. Platform and viewport are treated differently:
// Platform is a constant read from react-native; viewport is a live
// subscription from the injected Lib.Device (js-rnw-helper-device).
//
// Provides: build, rebuild, themeContract, useBreakpoint.
//
// Factory pattern: each loader call returns an independent instance with
// its own registry state. Re-theming calls rebuild and returns a new
// registry object; the previous registry is never mutated.
//
// Compatibility: React Native Web (web, iOS, Android). Requires the RNW
// runtime. Node.js for testing with injected stubs.
'use strict';


/////////////////////////// Module-Loader START ////////////////////////////////

/********************************************************************
Factory loader. One call = one independent instance with its own
registry, styles, and injected dependencies.

@param {Object} shared_libs - Lib container; requires React, Utils,
                              Debug, Device; optional Icons
@param {Object} config      - Overrides merged over defaults

@return {Object} - Public Components interface
*********************************************************************/
module.exports = function loader (shared_libs, config) {

  // Dependencies for this instance - by reference from the shared container
  const Lib = {
    Utils: shared_libs.Utils,
    Debug: shared_libs.Debug,
    React: shared_libs.React,
    Device: shared_libs.Device,
    Icons: shared_libs.Icons
  };

  // Merge overrides over defaults
  const CONFIG = Object.assign(
    {},
    require('./components.config'),
    config || {}
  );

  // Own frozen error catalog
  const ERRORS = require('./components.errors');

  // Load the validators singleton and inject Lib + ERRORS
  const Validators = require('./components.validators')(Lib, ERRORS);

  // Validate config - throws on misconfiguration
  Validators.validateConfig(CONFIG);

  // Validate required injections - throws on missing dependency
  Validators.validateInjections(shared_libs);

  // Mutable per-instance state: the built registry and styles, rebuilt on re-theme
  // Contexts are created once per loader call, NOT inside build, so a rebuild
  // does not orphan mounted Consumers (Plan 0100 M7)
  const state = {
    registry: null,
    styles: null,
    breakpoint: 'base',
    contexts: {
      // Compound contexts created once per loader instance
      // Populated lazily by compound components on first build
    }
  };

  return createInterface(Lib, CONFIG, ERRORS, Validators, state);

};///////////////////////////// Module-Loader END ///////////////////////////////


/////////////////////////// createInterface START //////////////////////////////

/********************************************************************
Builds the public interface for one instance. Public and private
functions close over the provided Lib, CONFIG, ERRORS, Validators,
and state.

@param {Object} Lib       - Dependency container
@param {Object} CONFIG    - Merged configuration for this instance
@param {Object} ERRORS    - Frozen error catalog
@param {Object} Validators - Validators singleton
@param {Object} state     - Mutable state holder

@return {Object} - Public interface for this module
*********************************************************************/
const createInterface = function (Lib, CONFIG, ERRORS, Validators, state) {

  ///////////////////////////Public Functions START//////////////////////////////
  const Components = {


    // ~~~~~~~~~~~~~~~~~~~~ Registry Build ~~~~~~~~~~~~~~~~~~~~

    /********************************************************************
    Build the themed component registry from a theme contract. Generates
    utility styles per breakpoint, wires the HOC, and instantiates every
    atom, molecule, variant, and freeform component.

    @param {Object} theme       - Theme contract { Color, Dimension, Font, Breakpoint }
    @param {String} breakpoint  - Active breakpoint key (default 'base')

    @return {Object} - { Component, Style }
    *********************************************************************/
    build: function (theme, breakpoint) {

      // Validate the theme contract at boot time - throws on malformed theme
      Validators.validateTheme(theme);

      // Resolve the active breakpoint, defaulting to 'base'
      const activeBreakpoint = breakpoint || 'base';

      // Generate utility styles for every breakpoint, memoized by key
      const generateStyles = require('./component/commonStyles');
      const allStyles = {};
      const breakpointKeys = Object.keys(theme.Breakpoint);

      // Generate the utility set for each breakpoint
      for (let i = 0; i < breakpointKeys.length; i++) {
        const bpKey = breakpointKeys[i];

        // Skip non-numeric breakpoint entries
        if (!Lib.Utils.isNumber(theme.Breakpoint[bpKey])) {
          continue;
        }

        // Generate and cache the utility set for this breakpoint
        allStyles[bpKey] = generateStyles(theme, bpKey);

      }

      // Build the Style slot consumed by every component factory
      const Style = {
        utilities: allStyles[activeBreakpoint] || allStyles['base'],
        tokens: theme,
        breakpoint: activeBreakpoint,
        allBreakpoints: allStyles
      };

      // Build the RTL-injecting HOC once
      const hoc = require('./component/componentHoc')(Lib);

      // The shared component registry (molecules close over this object)
      const Component = {};

      // Helper: instantiate a factory and wrap it with the HOC
      // Lib is first, matching every other Superloom module
      const make = function (factory) {
        return hoc(factory(Lib, CONFIG, ERRORS, Component, Style));
      };

      // ~~~~~~~~~~ Atoms ~~~~~~~~~~
      Component.View = make(require('./component/atom/view'));
      Component.Text = make(require('./component/atom/text'));
      Component.Icon = make(require('./component/atom/icon'));
      Component.Image = make(require('./component/atom/image'));
      Component.Badge = make(require('./component/atom/badge'));
      Component.Separator = make(require('./component/atom/separator'));
      Component.ProgressBar = make(require('./component/atom/progressBar'));
      Component.Button = make(require('./component/atom/button'));
      Component.TextInput = make(require('./component/atom/textInput'));
      Component.Toggle = make(require('./component/atom/toggle'));
      Component.Checkbox = make(require('./component/atom/checkbox'));
      Component.RadioButton = make(require('./component/atom/radioButton'));
      Component.TextArea = make(require('./component/atom/textArea'));
      Component.Slider = make(require('./component/atom/slider'));
      Component.Link = make(require('./component/atom/link'));

      // ~~~~~~~~~~ Molecules (canonical) ~~~~~~~~~~
      Component.ButtonPrimary = make(require('./component/molecule/buttonPrimary'));
      Component.ButtonLink = make(require('./component/molecule/buttonLink'));
      Component.Card = make(require('./component/molecule/card'));
      Component.ListItem = make(require('./component/molecule/listItem'));
      Component.Dropdown = make(require('./component/molecule/dropdown'));
      Component.Modal = make(require('./component/molecule/modal'));
      Component.Search = make(require('./component/molecule/search'));
      Component.PasswordInput = make(require('./component/molecule/passwordInput'));
      Component.NumberInput = make(require('./component/molecule/numberInput'));
      Component.ExpandableSearch = make(require('./component/molecule/expandableSearch'));
      Component.FormLabel = make(require('./component/molecule/formLabel'));
      Component.FormItem = make(require('./component/molecule/formItem'));

      // ~~~~~~~~~~ Structured exceptions (variant registry) ~~~~~~~~~~
      Component.variant = {
        ButtonPrimaryOutlined: make(require('./component/variant/buttonPrimaryOutlined'))
      };

      // ~~~~~~~~~~ Unstructured exceptions (freeform; NO tokens) ~~~~~~~~~~
      // Freeform factories receive Lib (for React access) but NOT Style or
      // Registry. They cannot read tokens or compose atoms. They take raw
      // styles only and do not retheme.
      Component.freeform = {
        RawBox: require('./component/freeform/rawBox')(Lib)
      };

      // ~~~~~~~~~~ Providers (context-only, no tokens, no visual output) ~~~~~~~~~~
      // Providers register at Component.provider.[name], matching the
      // Component.variant and Component.freeform namespacing. They do not
      // count toward the flat top-level key count.
      const overlayHostModule = require('./component/OverlayHost')(Lib);
      const liveRegionModule = require('./component/LiveRegionProvider')(Lib);
      Component.provider = {
        OverlayHost: overlayHostModule.OverlayHost,
        LiveRegionProvider: liveRegionModule.LiveRegionProvider
      };

      // Store in state for rebuild reference
      state.registry = Component;
      state.styles = Style;
      state.breakpoint = activeBreakpoint;

      // Return the themed library and its generated styles
      return { Component: Component, Style: Style };

    },


    /********************************************************************
    Rebuild the themed component registry from a new theme. Returns a
    new registry object; the previous registry is never mutated. This
    is the runtime re-theming mechanism.

    @param {Object} theme       - New theme contract
    @param {String} breakpoint  - Active breakpoint key

    @return {Object} - { Component, Style }
    *********************************************************************/
    rebuild: function (theme, breakpoint) {

      // Delegate to build, which validates and constructs a fresh registry
      return Components.build(theme, breakpoint);

    },


    /********************************************************************
    Bridge themer output to the component theme contract. Converts the
    flat emitted token map from buildTheme() into the nested
    { Color, Dimension, Font, Breakpoint } shape the library consumes.

    @param {Object} themer_output - Result from Lib.Themer.buildTheme()

    @return {Object} - { Color, Dimension, Font, Breakpoint }
    *********************************************************************/
    themeContract: function (themer_output) {

      // Delegate to the bridge module
      const bridge = require('./components.theme-contract');
      return bridge(themer_output);

    },


    // ~~~~~~~~~~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~

    /********************************************************************
    React hook that resolves the active breakpoint from the injected
    Device helper. Seeds from Device.getViewport() and subscribes to
    viewport changes, unsubscribing on unmount. Returns the active
    breakpoint key.

    @param {Object} theme  - Theme contract with Breakpoint group

    @return {String} - Active breakpoint key ('base', 'sm', 'md', 'lg', 'xl')
    *********************************************************************/
    useBreakpoint: function (theme) {

      // Resolve the active breakpoint from the current viewport width
      const resolveBreakpoint = function (width) {

        // Walk the breakpoint order in descending width to find the match
        const order = CONFIG.BREAKPOINT_ORDER;
        let active = 'base';

        for (let i = order.length - 1; i >= 0; i--) {
          const bpKey = order[i];
          const bpWidth = theme.Breakpoint[bpKey];

          if (Lib.Utils.isNumber(bpWidth) && width >= bpWidth) {
            active = bpKey;
            break;
          }

        }

        return active;

      };

      // Read the current viewport
      const viewportResult = Lib.Device.getViewport();
      const initialWidth = viewportResult.success ? viewportResult.width : 0;

      // State holds the active breakpoint key
      const React = Lib.React;
      const breakpointState = React.useState(resolveBreakpoint(initialWidth));
      const currentBreakpoint = breakpointState[0];
      const setBreakpoint = breakpointState[1];

      // Subscribe to viewport changes
      React.useEffect(function () {

        // Subscribe to viewport changes from the Device helper
        const subResult = Lib.Device.onViewportChange(function (dims) {

          // Resolve the new breakpoint and update state if it changed
          const next = resolveBreakpoint(dims.width);

          if (next !== currentBreakpoint) {
            setBreakpoint(next);
          }

        });

        // Return the cleanup function to unsubscribe on unmount
        return function () {

          if (subResult.success && Lib.Utils.isFunction(subResult.unsubscribe)) {
            subResult.unsubscribe();
          }

        };

      }, [currentBreakpoint]);

      return currentBreakpoint;

    },


    // ~~~~~~~~~~~~~~~~~~~~ Token Constants ~~~~~~~~~~~~~~~~~~~~

    /********************************************************************
    Export the valid token sets as constants so applications reference
    a constant instead of a string literal. This shrinks the error
    surface for render-time prop validation.

    @return {Object} - { fontSize, fontColor, fontWeight, space, radius }
    *********************************************************************/
    tokens: Object.freeze({
      fontSize: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      fontColor: ['text_primary', 'text_secondary', 'text_muted', 'text_on_primary',
        'app_primary', 'status_success', 'status_danger', 'status_warning', 'status_info'],
      fontWeight: ['regular', 'medium', 'semibold', 'bold'],
      space: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      radius: ['sm', 'md', 'lg', 'xl', 'pill']
    })

  };///////////////////////////Public Functions END//////////////////////////////


  return Components;

};/////////////////////////// createInterface END //////////////////////////////
