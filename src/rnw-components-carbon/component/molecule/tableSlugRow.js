// Info: TableSlugRow molecule [S1 presentational]. A row with a slug (short
// label). Uses role="row" for screen reader semantics. Renders the slug as a
// secondary text label followed by the row children in a horizontal layout.
//   slug        -> string (short label rendered at the row start)
//   children    -> row cell elements
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TableSlugRow molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TableSlugRow component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function TableSlugRow (props) {

    const {
      slug, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'row',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          Style.utilities['border_default'],
          style
        ]
      }, rest),
      React.createElement(
        RNView,
        {
          style: [
            Style.utilities['p_h_md'],
            Style.utilities['p_v_sm']
          ]
        },
        React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_secondary',
          weight: 'medium'
        }, slug == null ? '' : String(slug))
      ),
      children
    );

  };

};
