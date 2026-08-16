// Info: TopNavigationBarLogin molecule [S1 presentational]. A login
// variant of TopNavigationBar with a title and optional login action.
// Uses role="banner" for screen reader semantics.
//   title       -> main title string
//   loginAction -> object with { text, onPress }
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TopNavigationBarLogin molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TopNavigationBarLogin component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function TopNavigationBarLogin (props) {

    // Destructure props
    const {
      title, loginAction, style,
      ...rest
    } = props;

    const React = Lib.React;

    // Render login button if action provided
    let loginButton = null;

    if (loginAction && Lib.Utils.isFunction(loginAction.onPress)) {
      loginButton = React.createElement(Registry.Button, {
        kind: 'primary',
        title: loginAction.text,
        onPress: loginAction.onPress
      });
    }

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'banner',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['items_center'],
          Style.utilities['justify_between'],
          style
        ]
      }, rest),
      React.createElement(Registry.Text, null, title || ''),
      loginButton
    );

  };

};
