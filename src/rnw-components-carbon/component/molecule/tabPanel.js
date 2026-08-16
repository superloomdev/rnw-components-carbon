// Info: TabPanel molecule [S1 presentational]. A content panel with
// role="tabpanel" that is shown when its corresponding Tab is selected.
// Uses M1 (a11y) for aria-hidden when not selected.
//   children    -> panel content
//   selected    -> boolean, whether this panel is visible
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TabPanel molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TabPanel component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function TabPanel (props) {

    const { children, selected, style, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    const React = Lib.React;

    const ariaProps = Parts.A11y.state({
      hidden: selected === false ? true : undefined
    });

    if (selected === false) {
      return null;
    }

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'tabpanel',
        style: [
          Style.utilities['p_a_md'],
          style
        ]
      }, ariaProps, rest),
      children
    );

  };

};
