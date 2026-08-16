// Info: SkipToContent molecule [S2 interactive]. A skip-to-content link for
// accessibility. Uses role="link" for screen reader semantics. Platform:
// web-primary (renders null on native).
//   href        -> string (link target, optional)
//   targetId    -> string (id of the content to skip to)
//   style       -> custom style overrides
/* global document */
'use strict';

const { Pressable, Platform } = require('react-native');


/********************************************************************
Build the SkipToContent molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The SkipToContent component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function SkipToContent (props) {

    const {
      href, targetId, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // On native, render null
    if (Platform.OS !== 'web') {
      return null;
    }

    // Resolve the link target: href takes precedence, else build from targetId
    const resolvedHref = href || (targetId ? ('#' + targetId) : '#main-content');

    // Handle activation: navigate to the target
    const handlePress = function () {
      if (typeof document !== 'undefined' && targetId) {
        const el = document.getElementById(targetId);
        if (el && Lib.Utils.isFunction(el.focus)) {
          el.focus();
        }
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({});

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'link',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: handlePress,
        accessibilityRole: 'link',
        accessibilityLabel: 'Skip to content',
        href: resolvedHref
      }, ariaProps, pressKeysProps, {
        style: [
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_sm'],
          Style_.utilities['background_surface'],
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'app_primary',
        weight: 'medium'
      }, 'Skip to content')
    );

  };

};
