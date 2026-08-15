// Info: TreeNode molecule [S2 interactive]. A tree node with role="treeitem"
// that can expand/collapse to reveal child nodes. Uses M1 (a11y) for
// aria-expanded, aria-selected, and aria-level, and M2 (usePressKeys) for
// keyboard activation. Can optionally consume TreeView context for selection
// coordination.
//   label       -> string (node label)
//   children    -> child TreeNode elements (optional)
//   expanded    -> boolean, whether the node is expanded
//   onToggle    -> function (called when expand/collapse is pressed)
//   selected    -> boolean, whether this node is selected
//   level       -> number (depth in the tree, 1-based)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable } = require('react-native');


/********************************************************************
Build the TreeNode molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The TreeNode component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const usePressKeys = require('../usePressKeys')(Lib);
  const getSharedContext = require('../context/sharedContext');

  // Get the shared TreeView context (cached per Lib instance)
  const treeViewCtx = getSharedContext(Lib, 'TreeView');

  return function TreeNode (props) {

    const {
      label, children, expanded, onToggle, selected, level, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const colorMap = Style_.tokens.Color;

    // Read TreeView context if available
    const ctxValue = React.useContext(treeViewCtx.Context);

    const isExpanded = !!expanded;
    const isSelected = ctxValue ? (ctxValue.selectedKey === ctxValue.nodeKey) : !!selected;
    const nodeLevel = Lib.Utils.isNumber(level) ? level : 1;
    const hasChildren = React.Children.count(children) > 0;

    // Handle selection
    const handleSelect = function () {
      if (Lib.Utils.isFunction(onToggle) && hasChildren) {
        onToggle(!isExpanded);
      }
      if (ctxValue && Lib.Utils.isFunction(ctxValue.onSelect)) {
        ctxValue.onSelect(ctxValue.nodeKey);
      }
    };

    // Build aria state props through the a11y translator
    const ariaProps = a11y.state({
      expanded: hasChildren ? isExpanded : undefined,
      selected: isSelected
    });

    // Build position props for tree level
    const positionProps = a11y.position({
      level: nodeLevel
    });

    // Build keyboard activation props
    const pressKeysProps = usePressKeys({
      role: 'treeitem',
      onActivate: handleSelect,
      disabled: false
    });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'treeitem',
        style: [style]
      }, ariaProps, positionProps, pressKeysProps, rest),
      // Node row
      React.createElement(
        Pressable,
        {
          onPress: handleSelect,
          accessibilityRole: 'button',
          accessibilityLabel: label,
          style: [
            Style_.utilities['flex_row'],
            Style_.utilities['align_center'],
            Style_.utilities['p_h_sm'],
            Style_.utilities['p_v_xs'],
            {
              marginLeft: (nodeLevel - 1) * 20,
              backgroundColor: isSelected
                ? (colorMap.APP_PRIMARY_SUBTLE || '#edf5ff')
                : 'transparent'
            }
          ]
        },
        // Expand/collapse indicator (only if has children)
        hasChildren
          ? React.createElement(Registry.Text, {
            size: 'xs',
            color: 'text_secondary',
            style: Style_.utilities['m_r_xs']
          }, isExpanded ? '\u25BC' : '\u25B6')
          : React.createElement(RNView, {
            style: { width: 12, marginRight: 4 }
          }),
        // Label
        React.createElement(Registry.Text, {
          size: 'sm',
          color: isSelected ? 'app_primary' : 'text_primary',
          weight: isSelected ? 'medium' : 'regular'
        }, label)
      ),
      // Child nodes (only when expanded)
      isExpanded && hasChildren
        ? React.createElement(RNView, null, children)
        : null
    );

  };

};
