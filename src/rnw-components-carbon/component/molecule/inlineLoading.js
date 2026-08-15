// Info: InlineLoading molecule [S1 presentational]. A small inline loading
// indicator with optional status text. Uses M1 (a11y) and M6 (useAnnounce).
//   status      -> 'active' | 'inactive' | 'error' (default 'active')
//   label       -> string (loading text, default 'Loading...')
//   style       -> custom style overrides
'use strict';

const { View: RNView, ActivityIndicator } = require('react-native');


/********************************************************************
Build the InlineLoading molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The InlineLoading component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);

  return function InlineLoading (props) {

    const {
      status, label, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;
    const st = status || 'active';

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      busy: st === 'active'
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'progressbar',
        accessibilityLabel: label || 'Loading',
        style: [Style_.utilities['flex_row'], Style_.utilities['align_center'], style]
      }, ariaProps, rest),
      st === 'active'
        ? React.createElement(ActivityIndicator, {
          size: 'small',
          color: colorMap.APP_PRIMARY || '#0f62fe',
          style: Style_.utilities['m_e_xs']
        })
        : null,
      React.createElement(Registry.Text, {
        size: 'sm',
        color: st === 'error' ? 'status_danger' : 'text_secondary'
      }, label || (st === 'active' ? 'Loading...' : st === 'error' ? 'Error' : 'Loaded'))
    );

  };

};
