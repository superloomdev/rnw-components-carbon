// Info: Error catalog for rnw-components-carbon.
//
// Frozen on export. Injected into validators and the public interface.
// Boot-time misconfiguration throws TypeError; render-time prop errors
// warn and fall back deterministically (see docs/philosophy.md).

export default Object.freeze({

  THEME_INVALID: {
    type: 'rnw-components-carbon/theme-invalid',
    message: 'Theme contract is malformed. Required groups: Color, Dimension, Font, Breakpoint'
  },

  THEME_MISSING_TOKEN_GROUP: {
    type: 'rnw-components-carbon/theme-missing-token-group',
    message: 'Theme contract is missing a required token group'
  },

  REACT_NOT_INJECTED: {
    type: 'rnw-components-carbon/react-not-injected',
    message: 'React is not injected. Provide shared_libs.React (the react module)'
  },

  DEVICE_NOT_INJECTED: {
    type: 'rnw-components-carbon/device-not-injected',
    message: 'Device helper is not injected. Provide shared_libs.Device (js-rnw-helper-device)'
  },

  ICONS_NOT_INJECTED: {
    type: 'rnw-components-carbon/icons-not-injected',
    message: 'Icon source is not injected. Provide shared_libs.Icons with a Glyph component'
  },

  THEME_VALUE_NOT_FINITE: {
    type: 'rnw-components-carbon/theme-value-not-finite',
    message: 'Theme dimension value must be a finite number'
  },

  THEME_VALUE_UNIT_STRING: {
    type: 'rnw-components-carbon/theme-value-unit-string',
    message: 'Theme dimension value contains a CSS unit suffix. Pass the native projection instead of the web projection'
  }

});
