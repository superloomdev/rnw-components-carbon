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
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The BreadcrumbItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function BreadcrumbItem (props) {

    const {
      href, onPress, children, isCurrentPage, style,
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
    const ariaProps = Parts.A11y.state({
      current: isCurrent ? 'page' : undefined
    });

    // Build keyboard activation props
    const pressKeysProps = Parts.PressKeys({
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
            Style.utilities['flex_row'],
            Style.utilities['align_center'],
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
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
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
          style: Style.utilities['m_r_xs']
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
        style: Style.utilities['m_h_xs']
      }, '/')
    );

  };

};
