// Info: DataTable molecule [S1]. A simple data table that renders headers
// and rows. Uses role="table" for screen reader semantics. Keep simple -
// just render headers and rows in a column layout.
//   headers     -> array of header strings
//   rows        -> array of arrays (each inner array is a row of cell values)
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the DataTable molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The DataTable component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function DataTable (props) {

    const {
      headers, rows, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Render header row
    const headerRow = React.createElement(
      RNView,
      {
        accessibilityRole: 'row',
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['background_background_secondary'],
          Style_.utilities['border_default']
        ]
      },
      (headers || []).map(function (header, index) {
        return React.createElement(
          RNView,
          {
            key: 'header-' + index,
            accessibilityRole: 'columnheader',
            style: [
              Style_.utilities['flex_1'],
              Style_.utilities['p_h_md'],
              Style_.utilities['p_v_sm']
            ]
          },
          React.createElement(Registry.Text, {
            size: 'sm',
            color: 'text_secondary',
            weight: 'medium'
          }, String(header))
        );
      })
    );

    // Render data rows
    const dataRows = (rows || []).map(function (row, rowIndex) {
      return React.createElement(
        RNView,
        {
          key: 'row-' + rowIndex,
          accessibilityRole: 'row',
          style: [
            Style_.utilities['flex_row'],
            Style_.utilities['border_default']
          ]
        },
        (row || []).map(function (cell, cellIndex) {
          return React.createElement(
            RNView,
            {
              key: 'cell-' + rowIndex + '-' + cellIndex,
              accessibilityRole: 'cell',
              style: [
                Style_.utilities['flex_1'],
                Style_.utilities['p_h_md'],
                Style_.utilities['p_v_sm']
              ]
            },
            React.createElement(Registry.Text, {
              size: 'sm',
              color: 'text_primary'
            }, String(cell))
          );
        })
      );
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'table',
        style: [
          Style_.utilities['border_default'],
          Style_.utilities['br_md'],
          { overflow: 'hidden' },
          style
        ]
      }, rest),
      headerRow,
      dataRows
    );

  };

};
