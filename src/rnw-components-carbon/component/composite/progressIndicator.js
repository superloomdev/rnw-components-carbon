// Info: ProgressIndicator composite [S4 compound]. A step navigation container with
// role="list" that coordinates ProgressStep children. Uses M1 (a11y), M7
// (createCompoundContext). Wraps each ProgressStep child in a context Provider so
// it can read its index and current status without cloneElement.
//   current     -> number (1-based current step number)
//   children    -> ProgressStep elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the ProgressIndicator composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ProgressIndicator component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const getSharedContext = require('../context/sharedContext');

  // Get the shared compound context (cached per Lib instance)
  const ctx = getSharedContext(Lib, 'ProgressIndicator');

  return function ProgressIndicator (props) {

    const {
      current, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    const currentStep = Lib.Utils.isNumber(current) ? current : 0;
    const childArray = React.Children.toArray(children);

    // Wrap each child in a Provider with its step number and status
    const wrappedChildren = childArray.map(function (child, index) {
      const stepNumber = index + 1;
      const status = stepNumber < currentStep
        ? 'complete'
        : stepNumber === currentStep
          ? 'current'
          : 'incomplete';

      return React.createElement(
        ctx.Provider,
        {
          key: index,
          value: {
            stepNumber: stepNumber,
            status: status,
            current: currentStep
          }
        },
        child
      );
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'list',
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['p_v_sm'],
          style
        ]
      }, rest),
      wrappedChildren
    );

  };

};
