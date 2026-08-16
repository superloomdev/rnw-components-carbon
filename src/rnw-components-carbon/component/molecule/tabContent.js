// Info: TabContent molecule [S1 presentational]. Content panel for a tab.
// Uses role="tabpanel" for screen reader semantics.
//   children    -> tab panel content
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TabContent molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TabContent component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function TabContent (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'tabpanel',
        style: [
          Style.utilities['p_a_md'],
          style
        ]
      }, rest),
      children
    );

  };

};
