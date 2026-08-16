// Info: TableExpandRow molecule [S2 interactive]. A row that can expand to
// reveal additional content. Uses role="row" for screen reader semantics,
// M1 (a11y) for aria-expanded state, and M2 (usePressKeys) for keyboard
// activation.
//   isExpanded -> boolean, whether this row is currently expanded
//   onToggle   -> function invoked when the row is pressed to toggle
//   children   -> row cell elements
//   style      -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the TableExpandRow molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableExpandRow component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function TableExpandRow (props) {

    const {
      isExpanded, onToggle, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    const ariaProps = Parts.A11y.state({
      expanded: !!isExpanded
    });

    const pressKeysProps = Parts.PressKeys({
      role: 'row',
      onActivate: onToggle,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: onToggle,
        accessibilityRole: 'row',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['border_default'],
          style
        ]
      }, ariaProps, pressKeysProps, rest),
      children
    );

  };

};
