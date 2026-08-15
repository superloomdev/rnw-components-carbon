// Info: PaginationBar composite [S1/S2]. A full pagination control with
// prev/next buttons and page number buttons. Uses M1 (a11y) for aria-*
// state and M2 (usePressKeys) for keyboard activation. role="navigation".
//   page        -> current page number (1-based)
//   totalPage   -> total number of pages
//   onChange    -> function called with the new page number
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the PaginationBar composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The PaginationBar component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function PaginationBar (props) {

    const {
      page, totalPage, onChange, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

    const currentPage = Lib.Utils.isNumber(page) ? page : 1;
    const totalPages = Lib.Utils.isNumber(totalPage) ? totalPage : 1;

    // Build a page button
    const pageButton = function (pageNum, label, isCurrent, isDisabled) {

      const ariaProps = a11y.state({
        disabled: !!isDisabled,
        current: isCurrent ? 'page' : null
      });

      const pressKeysProps = usePressKeys({
        role: 'button',
        onActivate: function () {
          if (Lib.Utils.isFunction(onChange)) {
            onChange(pageNum);
          }
        },
        disabled: !!isDisabled
      });

      return React.createElement(
        Pressable,
        Object.assign({
          onPress: isDisabled ? null : function () {
            if (Lib.Utils.isFunction(onChange)) {
              onChange(pageNum);
            }
          },
          disabled: !!isDisabled,
          accessibilityRole: 'button',
          accessibilityLabel: label || ('Page ' + pageNum)
        }, ariaProps, pressKeysProps, {
          style: [
            Style_.utilities['p_h_sm'],
            Style_.utilities['p_v_xs'],
            Style_.utilities['br_sm'],
            isCurrent
              ? { backgroundColor: (colorMap.APP_PRIMARY || '#0f62fe') }
              : null,
            Style_.utilities['m_h_xs']
          ]
        }),
        React.createElement(Registry.Text, {
          size: 'sm',
          color: isCurrent ? 'text_on_primary' : 'text_primary',
          weight: 'medium'
        }, String(label || pageNum))
      );
    };

    // Build the list of page numbers to display
    const pageNumbers = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Adjust start if we're near the end
    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'navigation',
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['p_a_sm'],
          style
        ]
      }, rest),
      // Previous button
      pageButton(currentPage - 1, 'Previous', false, currentPage <= 1),
      // Page number buttons
      pageNumbers.map(function (pageNum) {
        return pageButton(pageNum, pageNum, pageNum === currentPage, false);
      }),
      // Next button
      pageButton(currentPage + 1, 'Next', false, currentPage >= totalPages)
    );

  };

};
