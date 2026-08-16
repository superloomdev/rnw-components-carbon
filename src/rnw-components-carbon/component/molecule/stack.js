// Info: Stack molecule [S1 presentational]. A vertical or horizontal stack
// with consistent spacing between children. No mechanisms needed.
//   direction   -> 'vertical' | 'horizontal' (default 'vertical')
//   gap          -> string (space token, default 'md')
//   children     -> content to stack
//   style        -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Stack molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Stack component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function Stack (props) {

    const {
      direction, gap, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const dir = direction || 'vertical';
    const gapToken = gap || 'md';

    // Map gap token to margin utility
    const gapStyle = dir === 'horizontal'
      ? Style.utilities['m_r_' + gapToken]
      : Style.utilities['m_b_' + gapToken];

    // Apply gap to all children except the last
    const childArray = React.Children.toArray(children);
    const spacedChildren = childArray.map(function (child, index) {
      if (index < childArray.length - 1) {
        return React.cloneElement(child, {
          key: index,
          style: [gapStyle, child.props && child.props.style]
        });
      }
      return child;
    });

    return React.createElement(
      RNView,
      Object.assign({
        style: [
          dir === 'horizontal' ? Style.utilities['flex_row'] : null,
          style
        ]
      }, rest),
      spacedChildren
    );

  };

};
