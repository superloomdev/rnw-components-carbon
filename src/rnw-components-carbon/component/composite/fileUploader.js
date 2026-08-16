// Info: FileUploader composite [S3 overlay]. A file upload container with
// drag-drop on web and document picker on native. Uses role="group" for
// screen reader semantics. Platform: split (web uses input type=file,
// native uses document picker).
//   label       -> string (uploader label)
//   accept      -> string | array (accepted file types)
//   multiple    -> boolean (allow multiple files)
//   onChange    -> function (called with selected files)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the FileUploader composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The FileUploader component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function FileUploader (props) {

    const {
      label, accept, multiple, onChange, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    // Handle file selection (platform split is P6; contract established here)
    const handlePress = function () {
      if (Lib.Utils.isFunction(onChange)) {
        onChange([]);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = Parts.A11y.state({});

    // Build keyboard activation props for the drop area
    const pressKeysProps = Parts.PressKeys({
      role: 'button',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        accessibilityLabel: label,
        style: [
          Style.utilities['flex_col'],
          Style.utilities['border_default'],
          Style.utilities['br_md'],
          Style.utilities['p_a_md'],
          style
        ]
      }, rest),
      label
        ? React.createElement(Registry.Text, {
          size: 'md',
          color: 'text_primary',
          weight: 'medium',
          style: Style.utilities['m_b_sm']
        }, label)
        : null,
      React.createElement(
        Pressable,
        Object.assign({
          onPress: handlePress,
          accessibilityRole: 'button',
          accessibilityLabel: label || 'Upload files'
        }, ariaProps, pressKeysProps, {
          style: [
            Style.utilities['flex_col'],
            Style.utilities['align_center'],
            Style.utilities['p_a_md'],
            Style.utilities['br_md'],
            Style.utilities['background_background_secondary']
          ]
        }),
        React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_secondary'
        }, multiple ? 'Drag and drop files or click to select' : 'Drag and drop a file or click to select')
      )
    );

  };

};
