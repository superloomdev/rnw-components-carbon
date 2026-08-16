// Info: BadgeIndicator atom [S1 presentational]. A small numeric badge
// for counts. Uses M1 (a11y) for aria-* label. Composes Text atom.
//   count       -> number (the count to display)
//   max         -> number (display '99+' when count exceeds max, default 99)
//   color       -> string (color token, default 'app_primary')
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the BadgeIndicator atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The BadgeIndicator component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function BadgeIndicator (props) {

    const {
      count, max, color, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;
    const maxVal = Lib.Utils.isNumber(max) ? max : 99;
    const displayCount = count > maxVal ? maxVal + '+' : String(count || 0);

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityLabel: displayCount + ' items',
        style: [
          {
            backgroundColor: colorMap.APP_PRIMARY || '#0f62fe',
            borderRadius: 10,
            minWidth: 20,
            height: 20,
            paddingHorizontal: 6,
            justifyContent: 'center',
            alignItems: 'center'
          },
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'xs',
        color: 'text_on_primary',
        weight: 'medium'
      }, displayCount)
    );

  };

};
