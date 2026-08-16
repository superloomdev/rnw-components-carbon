// Info: ProgressStep molecule [S1 presentational]. A single step in a ProgressIndicator
// navigation component with role="listitem". Uses M1 (a11y) for
// aria-current when the step is the current step.
//   label       -> string (step label)
//   status      -> 'complete' | 'current' | 'incomplete'
//   stepNumber  -> number (1-based step position)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the ProgressStep molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ProgressStep component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function ProgressStep (props) {

    const {
      label, status, stepNumber, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;
    const currentStatus = status || 'incomplete';

    // Determine the indicator color based on status
    const indicatorColor = currentStatus === 'complete'
      ? (colorMap.STATUS_SUCCESS || '#198038')
      : currentStatus === 'current'
        ? (colorMap.APP_PRIMARY || '#0f62fe')
        : (colorMap.BORDER || '#e0e0e0');

    // Build aria state props
    const ariaProps = Parts.A11y.state({
      current: currentStatus === 'current' ? 'step' : undefined
    });

    // Build position props
    const positionProps = Parts.A11y.position({
      posinset: Lib.Utils.isNumber(stepNumber) ? stepNumber : undefined
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'listitem',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['m_r_lg'],
          style
        ]
      }, ariaProps, positionProps, rest),
      // ProgressStep indicator circle
      React.createElement(RNView, {
        style: {
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: indicatorColor,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 8
        }
      },
      React.createElement(Registry.Text, {
        size: 'sm',
        color: 'text_on_primary',
        weight: 'medium'
      }, currentStatus === 'complete' ? '\u2713' : String(stepNumber || ''))
      ),
      // ProgressStep label
      React.createElement(Registry.Text, {
        size: 'md',
        color: currentStatus === 'current' ? 'text_primary' : 'text_secondary',
        weight: currentStatus === 'current' ? 'medium' : 'regular'
      }, label)
    );

  };

};
