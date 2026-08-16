// Info: InlineNotification molecule [S1 presentational]. An inline notification
// banner. Uses role="alert" for screen reader announcement.
//   title       -> primary text
//   subtitle    -> secondary text (optional)
//   kind        -> 'info' | 'success' | 'warning' | 'error'
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


// Kind -> background utility key and icon name
const KIND_BG = {
  success: 'background_status_success_subtle',
  error: 'background_status_danger_subtle',
  warning: 'background_status_warning_subtle',
  info: 'background_status_info_subtle'
};

const KIND_ICON = {
  success: 'checkmark--filled',
  error: 'error--filled',
  warning: 'warning--filled',
  info: 'information--filled'
};


/********************************************************************
Build the InlineNotification molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The InlineNotification component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function InlineNotification (props) {

    const {
      title, subtitle, kind, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const resolvedKind = kind || 'info';
    const bgKey = KIND_BG[resolvedKind] || KIND_BG.info;
    const iconName = KIND_ICON[resolvedKind] || KIND_ICON.info;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'alert',
        style: [
          Style.utilities[bgKey] || Style.utilities['background_surface'],
          Style.utilities['br_md'],
          Style.utilities['border_default'],
          Style.utilities['p_a_md'],
          Style.utilities['flex_row'],
          Style.utilities['align_start'],
          style
        ]
      }, rest),
      // Status icon
      React.createElement(Registry.Icon, {
        name: iconName,
        size: 'md',
        color: 'TEXT_SECONDARY',
        style: Style.utilities['m_e_sm']
      }),
      // Title and subtitle column
      React.createElement(
        Registry.View,
        { style: Style.utilities['flex_1'] },
        title
          ? React.createElement(Registry.Text, {
            size: 'md',
            color: 'text_primary',
            weight: 'medium'
          }, title)
          : null,
        subtitle
          ? React.createElement(Registry.Text, {
            size: 'sm',
            color: 'text_secondary',
            style: Style.utilities['m_t_xs']
          }, subtitle)
          : null
      )
    );

  };

};
