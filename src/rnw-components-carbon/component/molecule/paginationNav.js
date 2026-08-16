// Info: PaginationNav molecule [S2 interactive]. A page navigation control
// with role="group" that renders page number buttons for pagination. Uses
// M1 (a11y) for aria-current on the active page, and M2 (usePressKeys) for
// keyboard activation on each page button.
//   currentPage -> number (the active page, 1-based)
//   totalPages  -> number (total number of pages)
//   onChange    -> function (called with selected page number)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the PaginationNav molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The PaginationNav component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function PaginationNav (props) {

    const {
      currentPage, totalPages, onChange, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    const current = Lib.Utils.isNumber(currentPage) ? currentPage : 1;
    const total = Lib.Utils.isNumber(totalPages) ? totalPages : 1;

    // Build the list of page numbers to display
    const pages = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }

    // Render a single page button
    const renderPageButton = function (pageNum) {

      const isActive = pageNum === current;

      const ariaProps = Parts.A11y.state({
        current: isActive ? 'page' : undefined
      });

      const pressKeysProps = Parts.PressKeys({
        role: 'button',
        onActivate: function () {
          if (Lib.Utils.isFunction(onChange)) {
            onChange(pageNum);
          }
        },
        disabled: false
      });

      return React.createElement(
        Pressable,
        Object.assign({
          key: 'page-' + pageNum,
          onPress: function () {
            if (Lib.Utils.isFunction(onChange)) {
              onChange(pageNum);
            }
          },
          accessibilityRole: 'button',
          accessibilityLabel: 'Page ' + pageNum,
          style: [
            Style.utilities['br_sm'],
            {
              minWidth: 32,
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 2,
              backgroundColor: isActive
                ? (colorMap.APP_PRIMARY || '#0f62fe')
                : 'transparent'
            }
          ]
        }, ariaProps, pressKeysProps),
        React.createElement(Registry.Text, {
          size: 'sm',
          color: isActive ? 'text_on_primary' : 'text_secondary'
        }, String(pageNum))
      );
    };

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          style
        ]
      }, rest),
      pages.map(renderPageButton)
    );

  };

};
