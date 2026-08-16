// Info: TreeView composite [S4 compound]. A tree navigation container with
// role="tree" that renders TreeNode elements from a data prop. Uses M1
// (a11y), M7 (createCompoundContext). Provides selection and expansion
// state to TreeNode descendants through context.
//   data          -> array of { key, label, children, expanded, selected }
//   onSelect      -> function (called with selected node key)
//   expandedKeys  -> array (keys of expanded nodes)
//   style         -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the TreeView composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The TreeView component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) { // eslint-disable-line no-unused-vars

  const getSharedContext = require('../context/sharedContext');

  // Get the shared compound context (cached per Lib instance)
  const ctx = getSharedContext(Lib, 'TreeView');

  // Recursively render tree nodes from data
  const renderNodes = function (React, nodes, level, expandedKeys, selectedKey, onSelect) {

    if (!Array.isArray(nodes)) {
      return null;
    }

    return nodes.map(function (node) {
      const isExpanded = expandedKeys
        ? expandedKeys.indexOf(node.key) !== -1
        : !!node.expanded;
      const isSelected = node.key === selectedKey;

      const childNodes = (node.children && isExpanded)
        ? renderNodes(React, node.children, level + 1, expandedKeys, selectedKey, onSelect)
        : null;

      return React.createElement(
        ctx.Provider,
        {
          key: node.key,
          value: {
            nodeKey: node.key,
            selectedKey: selectedKey,
            onSelect: onSelect
          }
        },
        React.createElement(Registry.TreeNode, {
          label: node.label,
          expanded: isExpanded,
          selected: isSelected,
          level: level
        }, childNodes)
      );
    });
  };

  return function TreeView (props) {

    const {
      data, onSelect, expandedKeys, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;

    const keys = Array.isArray(expandedKeys) ? expandedKeys : [];
    const nodes = Array.isArray(data) ? data : [];

    // Determine the selected key from data (first match)
    const findSelectedKey = function (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].selected) {
          return items[i].key;
        }
        if (items[i].children) {
          const childKey = findSelectedKey(items[i].children);
          if (childKey !== null) {
            return childKey;
          }
        }
      }
      return null;
    };

    const selectedKey = findSelectedKey(nodes);

    const renderedNodes = renderNodes(
      React, nodes, 1, keys, selectedKey, onSelect
    );

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'tree',
        style: [style]
      }, rest),
      renderedNodes
    );

  };

};
