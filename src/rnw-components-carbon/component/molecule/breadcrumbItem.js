// Info: BreadcrumbItem molecule [S2 interactive]. A single breadcrumb link
// with role="link". Uses M1 (a11y) for aria-current when the item is the
// current page, and M2 (usePressKeys) for keyboard activation.
//   href          -> string (optional URL)
//   onPress       -> function (press handler)
//   children      -> label content
//   isCurrentPage -> boolean, whether this is the current page
//   style         -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the BreadcrumbItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The BreadcrumbItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function BreadcrumbItem (props) {

    const {
      href, onPress, children, isCurrentPage, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const isCurrent = !!isCurrentPage;

    // Handle press
    const handlePress = function () {
      if (Lib.Utils.isFunction(onPress)) {
        onPress();
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      current: isCurrent ? 'page' : undefined
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'link',
      onActivate: handlePress,
      disabled: isCurrent
    });

    // Current page is non-interactive (static text)
    if (isCurrent || !Lib.Utils.isFunction(onPress)) {
      return React.createElement(
        RNView,
        Object.assign({
          style: [
            Style_.utilities['flex_row'],
            Style_.utilities['align_center'],
            style
          ]
        }, ariaProps, rest),
        React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_primary',
          weight: 'medium'
        }, children)
      );
    }

    return React.createElement(
      RNView,
      Object.assign({
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          style
        ]
      }, rest),
      React.createElement(
        Pressable,
        Object.assign({
          onPress: handlePress,
          accessibilityRole: 'link',
          accessibilityLabel: typeof children === 'string' ? children : undefined,
          href: href,
          style: Style_.utilities['m_r_xs']
        }, ariaProps, pressKeysProps),
        React.createElement(Registry.Text, {
          size: 'sm',
          color: 'app_primary'
        }, children)
      ),
      // Separator chevron
      React.createElement(Registry.Text, {
        size: 'sm',
        color: 'text_muted',
        style: Style_.utilities['m_h_xs']
      }, '/')
    );

  };

};
