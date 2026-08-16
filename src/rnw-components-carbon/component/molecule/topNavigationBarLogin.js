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
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The TopNavigationBarLogin component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function TopNavigationBarLogin (props) {

    // Destructure props
    const {
      title, loginAction, style, isRtlActive, // eslint-disable-line no-unused-vars
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
          Style_.utilities['flex_row'],
          Style_.utilities['items_center'],
          Style_.utilities['justify_between'],
          style
        ]
      }, rest),
      React.createElement(Registry.Text, null, title || ''),
      loginButton
    );

  };

};
