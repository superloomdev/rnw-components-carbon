// Info: ModalFooter molecule [S1 presentational]. Footer section of a
// ComposedModal, typically holding action buttons. Composes View atom.
//   children    -> footer content (usually buttons)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the ModalFooter molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ModalFooter component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function ModalFooter (props) {

    const { children, style, ...rest } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        style: [
          Style.utilities['p_h_lg'],
          Style.utilities['p_v_md'],
          Style.utilities['flex_row'],
          Style.utilities['justify_end'],
          Style.utilities['border_default'],
          { borderTopWidth: 1 },
          style
        ]
      }, rest),
      children
    );

  };

};
