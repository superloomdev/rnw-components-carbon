// Info: FileUploaderDropContainer molecule [S2 interactive]. A drag-drop area
// for files. Uses role="button" for screen reader semantics. Uses M1 (a11y)
// for aria-* state and M2 (usePressKeys) for keyboard activation.
//   onDrop      -> function (called with dropped files)
//   label       -> string (drop area label)
//   style       -> custom style overrides
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the FileUploaderDropContainer molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The FileUploaderDropContainer component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);

  return function FileUploaderDropContainer (props) {

    const {
      onDrop, label, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

    // Handle press (simulates drop on native where drag-drop is unavailable)
    const handlePress = function () {
      if (Lib.Utils.isFunction(onDrop)) {
        onDrop([]);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({});

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: handlePress,
      disabled: false
    });

    return React.createElement(
      Pressable,
      Object.assign({
        onPress: handlePress,
        accessibilityRole: 'button',
        accessibilityLabel: label || 'Drop files here'
      }, ariaProps, pressKeysProps, {
        style: [
          Style_.utilities['flex_col'],
          Style_.utilities['align_center'],
          Style_.utilities['justify_center'],
          Style_.utilities['p_a_lg'],
          Style_.utilities['br_md'],
          {
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: colorMap.BORDER || '#e0e0e0'
          },
          style
        ]
      }, rest),
      React.createElement(Registry.Text, {
        size: 'md',
        color: 'text_secondary'
      }, label || 'Drag and drop files here or click to browse')
    );

  };

};
