// Info: FileUploaderItem molecule [S2 interactive]. A single uploaded file
// item with name and remove button. Uses role="listitem" for screen reader
// semantics. Uses M1 (a11y) for aria-* state and M2 (usePressKeys) for
// keyboard activation on the remove button.
//   filename    -> string (name of the uploaded file)
//   status      -> string ('uploading' | 'edit' | 'complete')
//   onRemove    -> function (called when remove is pressed)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the FileUploaderItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The FileUploaderItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function FileUploaderItem (props) {

    const {
      filename, status, onRemove, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Handle remove press
    const handleRemove = function () {
      if (Lib.Utils.isFunction(onRemove)) {
        onRemove();
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({});

    // Build keyboard activation props for the remove button
    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: handleRemove,
      disabled: false
    });

    // Map status to icon name
    const statusIcon = status === 'uploading'
      ? 'loading'
      : status === 'complete'
        ? 'checkmark'
        : 'warning';

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'listitem',
        accessibilityLabel: filename,
        style: [
          Style_.utilities['flex_row'],
          Style_.utilities['align_center'],
          Style_.utilities['p_h_md'],
          Style_.utilities['p_v_sm'],
          Style_.utilities['border_default'],
          style
        ]
      }, rest),
      React.createElement(Registry.Icon, {
        name: statusIcon,
        size: 'sm',
        color: 'TEXT_SECONDARY',
        style: Style_.utilities['m_e_sm']
      }),
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_primary',
        style: { flex: 1 }
      }, filename || ''),
      React.createElement(
        Pressable,
        Object.assign({
          onPress: handleRemove,
          accessibilityRole: 'button',
          accessibilityLabel: 'Remove ' + (filename || 'file')
        }, ariaProps, pressKeysProps, {
          style: Style_.utilities['p_a_xs']
        }),
        React.createElement(Registry.Icon, {
          name: 'close',
          size: 'sm',
          color: 'TEXT_SECONDARY'
        })
      )
    );

  };

};
