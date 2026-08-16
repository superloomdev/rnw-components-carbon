// Info: UserAvatar molecule [S1 presentational]. A user avatar with image
// and optional fallback initials. Uses M1 (a11y) for aria-* label.
//   src         -> string (image URL)
//   initials    -> string (fallback text, e.g. 'JD')
//   size        -> 'sm' | 'md' | 'lg' (default 'md')
//   label       -> string (accessibility label)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the UserAvatar molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The UserAvatar component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function UserAvatar (props) {

    const {
      src, initials, size, label, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    // Map size token to pixels
    const sizeMap = { sm: 24, md: 40, lg: 64 };
    const px = sizeMap[size] || 40;

    // Container style
    const containerStyle = {
      width: px,
      height: px,
      borderRadius: px / 2,
      backgroundColor: colorMap.BACKGROUND_SECONDARY || '#e0e0e0',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    };

    // Render image if src is provided
    if (src) {
      return React.createElement(
        RNView,
        Object.assign({ style: [containerStyle, style] }, rest),
        React.createElement(Registry.Image, {
          source: { uri: src },
          style: { width: px, height: px },
          accessibilityLabel: label
        })
      );
    }

    // Fallback to initials
    return React.createElement(
      RNView,
      Object.assign({
        accessibilityLabel: label || 'User avatar',
        style: [containerStyle, style]
      }, rest),
      React.createElement(Registry.Text, {
        size: px <= 24 ? 'xs' : 'md',
        color: 'text_secondary',
        weight: 'medium'
      }, initials || '?')
    );

  };

};
