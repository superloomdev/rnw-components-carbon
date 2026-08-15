// Info: ProgressIndicator molecule [S1 presentational]. A navigation step
// progress indicator with role="progressbar". Shows current step out of
// total steps. Uses M1 (a11y) for aria-value* props. This is DIFFERENT from
// the atom ProgressBar - this tracks navigation step progress, not a
// continuous fill bar.
//   current     -> number (current step, 1-based)
//   total       -> number (total number of steps)
//   label       -> string (optional accessible label)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the ProgressIndicator molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ProgressIndicator component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);

  return function ProgressIndicator (props) {

    const {
      current, total, label, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

    const currentStep = Lib.Utils.isNumber(current) ? current : 0;
    const totalSteps = Lib.Utils.isNumber(total) ? total : 0;
    const clampedCurrent = Math.max(0, Math.min(totalSteps, currentStep));
    const progressPercent = totalSteps > 0
      ? Math.round((clampedCurrent / totalSteps) * 100)
      : 0;

    // Build aria value props through the a11y translator
    const valueProps = a11y.value({
      min: 0,
      max: totalSteps,
      now: clampedCurrent,
      text: 'Step ' + clampedCurrent + ' of ' + totalSteps
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'progressbar',
        accessibilityLabel: label || 'Navigation progress',
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          style
        ]
      }, valueProps, rest),
      // Track
      React.createElement(RNView, {
        style: {
          flex: 1,
          height: 4,
          borderRadius: 2,
          backgroundColor: colorMap.BORDER || '#e0e0e0',
          overflow: 'hidden'
        }
      },
      // Fill
      React.createElement(RNView, {
        style: {
          width: progressPercent + '%',
          height: '100%',
          backgroundColor: colorMap.APP_PRIMARY || '#0f62fe'
        }
      })
      ),
      // Step counter text
      React.createElement(Registry.Text, {
        size: 'sm',
        color: 'text_secondary',
        style: Style_.utilities['m_s_sm']
      }, clampedCurrent + ' / ' + totalSteps)
    );

  };

};
