// Info: Tile molecule [S1 presentational]. A clickable tile card with
// title, subtitle, and optional icon. Uses M1 (a11y).
//   title       -> string
//   subtitle    -> string
//   icon        -> string (icon name)
//   children    -> additional content
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Tile molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Tile component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function Tile (props) {

    const {
      title, subtitle, icon, children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    return React.createElement(
      RNView,
      Object.assign({
        style: [
          Style.utilities['background_surface'],
          Style.utilities['br_md'],
          Style.utilities['border_default'],
          Style.utilities['p_a_md'],
          style
        ]
      }, rest),
      icon
        ? React.createElement(Registry.Icon, {
          name: icon,
          size: 'lg',
          color: 'TEXT_PRIMARY',
          style: Style.utilities['m_b_sm']
        })
        : null,
      title
        ? React.createElement(Registry.Text, {
          size: 'lg',
          color: 'text_primary',
          weight: 'semibold',
          style: Style.utilities['m_b_xs']
        }, title)
        : null,
      subtitle
        ? React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_secondary',
          style: Style.utilities['m_b_sm']
        }, subtitle)
        : null,
      children
    );

  };

};
