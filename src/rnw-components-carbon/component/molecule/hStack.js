// Info: HStack molecule [S1 presentational]. A horizontal stack container.
// Uses role="group" for screen reader semantics.
//   spacing     -> string (space token, default 'md')
//   children    -> content to stack
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the HStack molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The HStack component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function HStack (props) {

    const {
      spacing, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const gapToken = spacing || 'md';

    // Map gap token to margin utility
    const gapStyle = Style.utilities['m_r_' + gapToken];

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
        accessibilityRole: 'group',
        style: [
          Style.utilities['flex_row'],
          style
        ]
      }, rest),
      spacedChildren
    );

  };

};
