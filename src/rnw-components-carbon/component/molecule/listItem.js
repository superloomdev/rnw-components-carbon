// Info: ListItem molecule [S2 interactive] (CANONICAL). A selectable row with
// an optional leading icon, a title, an optional subtitle, and an optional
// trailing element. Composes View, Text, Icon, and Separator atoms.
//   title        -> primary text
//   subtitle     -> secondary text (optional)
//   icon         -> leading icon name (optional)
//   trailing     -> trailing element (optional)
//   onPress      -> press handler (optional; when absent, item is static)
//   selected     -> boolean, whether the item is selected
'use strict';

const { Pressable } = require('react-native');


/********************************************************************
Build the ListItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ListItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  // Build the a11y translator once per factory
  return function ListItem (props) {

    // Destructure props
    const {
      title, subtitle, icon, trailing, onPress, selected, disabled,
      style, isRtlActive, ...rest // eslint-disable-line no-unused-vars
    } = props;

    const React = Lib.React;
    const [pressed, setPressed] = React.useState(false);

    // Build the row content (shared between pressable and static variants)
    const rowContent = Lib.React.createElement(
      React.Fragment,
      null,
      // Leading icon
      icon
        ? Lib.React.createElement(Registry.Icon, {
          name: icon,
          size: 'md',
          color: 'TEXT_SECONDARY',
          style: Style.utilities['m_e_md']
        })
        : null,
      // Title and subtitle column
      Lib.React.createElement(
        Registry.View,
        { style: Style.utilities['flex_1'] },
        Lib.React.createElement(Registry.Text, {
          size: 'md',
          color: 'text_primary',
          weight: 'medium'
        }, title),
        subtitle
          ? Lib.React.createElement(Registry.Text, {
            size: 'sm',
            color: 'text_muted',
            style: Style.utilities['m_t_xs']
          }, subtitle)
          : null
      ),
      // Trailing element
      trailing || null
    );

    // Container styles
    const containerStyle = [
      Style.utilities['p_h_md'],
      Style.utilities['p_v_md'],
      Style.utilities['flex_row'],
      Style.utilities['align_center'],
      pressed ? Style.utilities['background_background_secondary'] : null,
      style
    ];

    // Static (non-pressable) list item
    if (!Lib.Utils.isFunction(onPress)) {
      return Lib.React.createElement(
        Registry.View,
        Object.assign({ style: containerStyle }, rest),
        rowContent
      );

    }

    // Pressable list item
    const ariaProps = Parts.A11y.state({
      disabled: !!disabled,
      selected: !!selected
    });

    return Lib.React.createElement(
      Pressable,
      Object.assign({
        onPress: disabled ? null : onPress,
        disabled: disabled,
        accessibilityRole: 'button',
        accessibilityLabel: title,
        onPressIn: function () {
          setPressed(true);
        },
        onPressOut: function () {
          setPressed(false);
        },
        style: function () {
          return containerStyle;
        }
      }, ariaProps, rest),
      rowContent
    );

  };

};
