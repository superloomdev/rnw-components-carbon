// Info: AccordionItem molecule [S2 interactive]. A collapsible section with
// a button header (role="button") and a content region (role="region"). Uses
// M1 (a11y) for aria-expanded, and M2 (usePressKeys) for keyboard activation.
// Can optionally consume Accordion context for expanded state coordination.
//   title       -> string (header label)
//   children    -> expandable content
//   expanded    -> boolean, whether the item is expanded
//   onToggle    -> function (called when header is pressed)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the AccordionItem molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The AccordionItem component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);
  const getSharedContext = require('../context/sharedContext');

  // Get the shared Accordion context (cached per Lib instance)
  const accordionCtx = getSharedContext(Lib, 'Accordion');

  return function AccordionItem (props) {

    const {
      title, children, expanded, onToggle, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

    // Read Accordion context if available
    const ctxValue = React.useContext(accordionCtx.Context);

    // Determine expanded state: context overrides props
    const isExpanded = ctxValue
      ? (ctxValue.expandedKeys && ctxValue.expandedKeys.indexOf(ctxValue.itemKey) !== -1)
      : !!expanded;

    // Handle toggle
    const handleToggle = function () {
      if (Lib.Utils.isFunction(onToggle)) {
        onToggle(!isExpanded);
      }
      if (ctxValue && Lib.Utils.isFunction(ctxValue.onChange)) {
        ctxValue.onChange(ctxValue.itemKey);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      expanded: isExpanded
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'button',
      onActivate: handleToggle,
      disabled: false
    });

    return React.createElement(
      RNView,
      Object.assign({
        style: [
          Style_.utilities['border_default'],
          { borderBottomWidth: 1 },
          style
        ]
      }, rest),
      // Header button
      React.createElement(
        Pressable,
        Object.assign({
          onPress: handleToggle,
          accessibilityRole: 'button',
          accessibilityLabel: title,
          style: [
            Style_.utilities['flex_row'],
            Style_.utilities['align_center'],
            Style_.utilities['justify_between'],
            Style_.utilities['p_h_md'],
            Style_.utilities['p_v_md']
          ]
        }, ariaProps, pressKeysProps),
        React.createElement(Registry.Text, {
          size: 'md',
          color: 'text_primary',
          weight: 'medium'
        }, title),
        // Expand/collapse chevron
        React.createElement(Registry.Text, {
          size: 'md',
          color: 'text_secondary'
        }, isExpanded ? '\u25B2' : '\u25BC')
      ),
      // Content region (only when expanded)
      isExpanded
        ? React.createElement(
          RNView,
          {
            accessibilityRole: 'region',
            style: [
              Style_.utilities['p_h_md'],
              Style_.utilities['p_v_md'],
              { backgroundColor: colorMap.BACKGROUND_SECONDARY || '#f4f4f4' }
            ]
          },
          children
        )
        : null
    );

  };

};
