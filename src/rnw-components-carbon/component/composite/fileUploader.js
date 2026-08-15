// Info: FileUploader composite [S2 interactive]. A file upload trigger with
// label and accept filtering. Uses M1 (a11y), M2 (usePressKeys). Role button.
//   label       -> string (button text, default 'Upload file')
//   accept      -> string (file type filter, e.g. 'image/*')
//   multiple    -> boolean (allow multiple file selection)
//   onChange    -> callback receiving the selected file(s)
//   disabled    -> boolean
'use strict';

const { View: RNView, Pressable, Platform } = require('react-native');


/********************************************************************
Build the FileUploader composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The FileUploader component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function FileUploader (props) {

    const {
      label, accept, multiple, onChange, disabled,
      style, isRtlActive, accessibilityLabel, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const isDisabled = !!disabled;
    const colorMap = Style_.tokens.Color;
    const inputRef = React.useRef(null);

    const handlePress = function () {
      if (isDisabled) {
        return;
      }
      // On web, trigger the hidden file input
      if (Platform.OS === 'web' && inputRef.current) {
        inputRef.current.click();
      }
    };

    const handleFileChange = function (e) {
      if (Lib.Utils.isFunction(onChange)) {
        const target = e.target;
        if (target && target.files) {
          onChange(multiple ? Array.prototype.slice.call(target.files) : target.files[0]);
        }
      }
    };

    // Build aria state props
    const ariaStateProps = a11y.state({
      disabled: isDisabled
    });

    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: handlePress,
      disabled: isDisabled
    });

    // Hidden file input for web
    const hiddenInput = Platform.OS === 'web'
      ? React.createElement('input', {
        ref: inputRef,
        type: 'file',
        accept: accept,
        multiple: !!multiple,
        onChange: handleFileChange,
        style: { display: 'none' }
      })
      : null;

    return React.createElement(
      RNView,
      { style: { position: 'relative' } },
      React.createElement(
        Pressable,
        Object.assign({
          onPress: handlePress,
          disabled: isDisabled,
          accessibilityRole: 'button',
          accessibilityLabel: accessibilityLabel || label || 'Upload file',
          style: [
            Style_.utilities['flex_row'],
            Style_.utilities['align_center'],
            Style_.utilities['justify_center'],
            Style_.utilities['br_md'],
            Style_.utilities['border_default'],
            Style_.utilities['p_h_md'],
            Style_.utilities['p_v_sm'],
            Style_.utilities['background_surface'],
            isDisabled
              ? { backgroundColor: colorMap.BACKGROUND_SECONDARY || '#f4f4f4' }
              : null,
            style
          ]
        }, ariaStateProps, pressKeysProps, rest),
        React.createElement(Registry.Icon, {
          name: 'upload',
          size: 'sm',
          color: isDisabled ? 'TEXT_MUTED' : 'TEXT_PRIMARY'
        }),
        React.createElement(Registry.Text, {
          size: 'md',
          color: isDisabled ? 'text_muted' : 'text_primary',
          style: [Style_.utilities['p_e_xs']]
        }, label || 'Upload file')
      ),
      hiddenInput
    );

  };

};
