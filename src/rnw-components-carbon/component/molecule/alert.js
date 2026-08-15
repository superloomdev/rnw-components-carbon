// Info: Alert molecule [S1]. A themed alert banner with title, kind, and
// optional children content. Uses role="alert" for screen reader
// announcement. Similar to Notification but more urgent.
//   title       -> primary text
//   kind        -> 'info' | 'success' | 'warning' | 'error'
//   children    -> additional content (optional)
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
Build the Alert molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Alert component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function Alert (props) {

    const {
      title, kind, children, style, isRtlActive, // eslint-disable-line no-unused-vars
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
          Style_.utilities[bgKey] || Style_.utilities['background_surface'],
          Style_.utilities['br_md'],
          Style_.utilities['border_default'],
          Style_.utilities['p_a_md'],
          style
        ]
      }, rest),
      // Title row with icon
      React.createElement(
        RNView,
        {
          style: [
            Style_.utilities['flex_row'],
            Style_.utilities['align_center']
          ]
        },
        React.createElement(Registry.Icon, {
          name: iconName,
          size: 'md',
          color: 'TEXT_SECONDARY',
          style: Style_.utilities['m_e_sm']
        }),
        title
          ? React.createElement(Registry.Text, {
            size: 'md',
            color: 'text_primary',
            weight: 'medium'
          }, title)
          : null
      ),
      children
        ? React.createElement(
          Registry.View,
          { style: Style_.utilities['m_t_sm'] },
          children
        )
        : null
    );

  };

};
