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
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Pagination component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function Pagination (props) {

    const {
      page, totalPage, onChange, pageSize, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

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

    const prevAriaProps = a11y.state({
      disabled: prevDisabled
    });

    const prevPressKeys = usePressKeys({
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

    const nextAriaProps = a11y.state({
      disabled: nextDisabled
    });

    const nextPressKeys = usePressKeys({
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
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
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
            Style_.utilities['br_sm'],
            Style_.utilities['p_h_sm'],
            Style_.utilities['p_v_sm'],
            Style_.utilities['m_r_sm'],
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
            Style_.utilities['br_sm'],
            Style_.utilities['p_h_sm'],
            Style_.utilities['p_v_sm'],
            Style_.utilities['m_l_sm'],
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
