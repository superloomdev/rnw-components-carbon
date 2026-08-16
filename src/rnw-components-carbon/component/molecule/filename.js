// Info: Filename molecule [S1 presentational]. Displays a filename with
// optional status icon. Uses role="text" for screen reader semantics.
//   name        -> string (the filename to display)
//   status      -> string ('uploading' | 'edit' | 'complete')
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Filename molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Filename component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function Filename (props) {

    const {
      name, status, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Map status to icon name
    const statusIcon = status === 'uploading'
      ? 'loading'
      : status === 'complete'
        ? 'checkmark'
        : status === 'edit'
          ? 'warning'
          : null;

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'text',
        accessibilityLabel: name,
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          style
        ]
      }, rest),
      statusIcon
        ? React.createElement(Registry.Icon, {
          name: statusIcon,
          size: 'sm',
          color: 'TEXT_SECONDARY',
          style: Style_.utilities['m_e_xs']
        })
        : null,
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_primary'
      }, name || '')
    );

  };

};
