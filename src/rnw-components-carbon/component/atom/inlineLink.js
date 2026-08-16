// Info: InlineLink atom [S2 interactive]. A text link styled differently
// from Link, for inline placement within text content. Uses role="link".
//   onPress     -> callback
//   title       -> link text content
//   disabled    -> boolean
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the InlineLink atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The InlineLink component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) { // eslint-disable-line no-unused-vars

  const a11y = require('../a11y')(Lib);

  return function InlineLink (props) {

    const {
      onPress, title, disabled, style, isRtlActive, // eslint-disable-line no-unused-vars
      accessibilityLabel, ...rest
    } = props;

    const React = Lib.React;

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      disabled: !!disabled
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: disabled ? null : onPress,
        disabled: !!disabled,
        accessibilityRole: 'link',
        accessibilityLabel: accessibilityLabel || title,
        style: [style]
      }, ariaProps, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: disabled ? 'text_muted' : 'app_primary',
        weight: 'regular'
      }, title)
    );

  };

};
