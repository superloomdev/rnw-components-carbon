// Info: Pagination composite [S4 compound]. A pagination navigation container
// with role="navigation" that renders page selector and prev/next buttons.
// Uses M1 (a11y), M2 (usePressKeys). Composes PaginationNav molecule and
// Button atom.
//   page        -> number (current page, 1-based)
//   totalPage   -> number (total number of pages)
//   onChange    -> function (called with new page number)
//   pageSize    -> number (items per page, optional)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the Pagination composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Pagination component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function Pagination (props) {

    const {
      page, totalPage, onChange, pageSize, style, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style.tokens.Color;

    const currentPage = Lib.Utils.isNumber(page) ? page : 1;
    const totalPages = Lib.Utils.isNumber(totalPage) ? totalPage : 1;

    // Handle page change
    const handlePageChange = function (newPage) {
      if (Lib.Utils.isFunction(onChange)) {
        onChange(newPage);
      }
    };

    // Prev button
    const prevDisabled = currentPage <= 1;

    const prevAriaProps = Parts.A11y.state({
      disabled: prevDisabled
    });

    const prevPressKeys = Parts.PressKeys({
      role: 'button',
      onActivate: function () {
        if (!prevDisabled) {
          handlePageChange(currentPage - 1);
        }
      },
      disabled: prevDisabled
    });

    // Next button
    const nextDisabled = currentPage >= totalPages;

    const nextAriaProps = Parts.A11y.state({
      disabled: nextDisabled
    });

    const nextPressKeys = Parts.PressKeys({
      role: 'button',
      onActivate: function () {
        if (!nextDisabled) {
          handlePageChange(currentPage + 1);
        }
      },
      disabled: nextDisabled
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'navigation',
        style: [
          Style.utilities['flex_row'],
          Style.utilities['align_center'],
          style
        ]
      }, rest),
      // Previous button
      React.createElement(
        Pressable,
        Object.assign({
          onPress: prevDisabled ? null : function () {
            handlePageChange(currentPage - 1);
          },
          disabled: prevDisabled,
          accessibilityRole: 'button',
          accessibilityLabel: 'Previous page',
          style: [
            Style.utilities['br_sm'],
            Style.utilities['p_h_sm'],
            Style.utilities['p_v_sm'],
            Style.utilities['m_r_sm'],
            {
              backgroundColor: prevDisabled
                ? (colorMap.BACKGROUND_SECONDARY || '#f4f4f4')
                : 'transparent'
            }
          ]
        }, prevAriaProps, prevPressKeys),
        React.createElement(Registry.Text, {
          size: 'md',
          color: prevDisabled ? 'text_muted' : 'text_primary'
        }, '\u2039')
      ),
      // Page selector
      React.createElement(Registry.PaginationNav, {
        currentPage: currentPage,
        totalPages: totalPages,
        onChange: handlePageChange
      }),
      // Next button
      React.createElement(
        Pressable,
        Object.assign({
          onPress: nextDisabled ? null : function () {
            handlePageChange(currentPage + 1);
          },
          disabled: nextDisabled,
          accessibilityRole: 'button',
          accessibilityLabel: 'Next page',
          style: [
            Style.utilities['br_sm'],
            Style.utilities['p_h_sm'],
            Style.utilities['p_v_sm'],
            Style.utilities['m_l_sm'],
            {
              backgroundColor: nextDisabled
                ? (colorMap.BACKGROUND_SECONDARY || '#f4f4f4')
                : 'transparent'
            }
          ]
        }, nextAriaProps, nextPressKeys),
        React.createElement(Registry.Text, {
          size: 'md',
          color: nextDisabled ? 'text_muted' : 'text_primary'
        }, '\u203A')
      )
    );

  };

};
