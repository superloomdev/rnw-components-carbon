// Info: ModalBody molecule [S1 presentational]. Body section of a
// ComposedModal. Composes View atom.
//   children    -> modal body content
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the ModalBody molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ModalBody component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function ModalBody (props) {

    const { children, style, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        style: [Style_.utilities['p_h_lg'], Style_.utilities['p_v_md'], style]
      }, rest),
      children
    );

  };

};
