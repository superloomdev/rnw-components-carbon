// Info: DefinitionTooltip molecule [S3 overlay]. A tooltip that shows a
// definition on hover/focus. Uses M1 (a11y), M5 (useAnchoredPosition).
//   term        -> string (the term being defined, shown inline)
//   definition  -> string (the definition content)
//   style       -> custom style overrides
'use strict';

const { View: RNView, Pressable, Platform } = require('react-native');


/********************************************************************
Build the DefinitionTooltip molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The DefinitionTooltip component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  const a11y = require('../a11y')(Lib);
  const useAnchoredPosition = require('../useAnchoredPosition')(Lib);

  return function DefinitionTooltip (props) {

    const {
      term, definition, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const [isVisible, setIsVisible] = React.useState(false);
    const anchorRef = React.useRef(null);

    // Anchored position
    const anchoredPos = useAnchoredPosition({
      placement: 'bottom',
      offset: 4,
      flip: true,
      anchorRef: anchorRef
    });

    React.useEffect(function () {
      if (isVisible) {
        anchoredPos.measure();
      }
    }, [isVisible]);

    // Generate stable id
    const defId = React.useRef(a11y.id('definition')).current;

    // Build aria relation props
    const ariaProps = a11y.relation({
      describedby: defId
    });

    const showDef = function () {
      setIsVisible(true);
    };
    const hideDef = function () {
      setIsVisible(false);
    };

    const triggerProps = Platform.OS === 'web'
      ? { onMouseEnter: showDef, onMouseLeave: hideDef, onFocus: showDef, onBlur: hideDef }
      : { onLongPress: showDef, onPressOut: hideDef };

    // Render definition panel
    const renderDefinition = function () {
      const pos = anchoredPos.position || { top: 0, left: 0 };
      return React.createElement(
        RNView,
        {
          id: defId,
          accessibilityRole: 'tooltip',
          style: [
            Style_.utilities['background_surface'],
            Style_.utilities['br_sm'],
            Style_.utilities['p_a_sm'],
            Style_.utilities['shadow_sm'],
            {
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              maxWidth: 300,
              zIndex: 1000
            }
          ]
        },
        React.createElement(Registry.Text, {
          size: 'xs',
          color: 'text_primary'
        }, definition)
      );
    };

    return React.createElement(
      RNView,
      Object.assign({ style: { position: 'relative', flexDirection: 'row' } }, rest),
      React.createElement(
        Pressable,
        Object.assign({
          ref: anchorRef,
          accessibilityRole: 'button',
          accessibilityLabel: term
        }, ariaProps, triggerProps),
        React.createElement(Registry.Text, {
          size: 'md',
          color: 'app_primary',
          weight: 'medium',
          style: { textDecorationLine: 'underline' }
        }, term)
      ),
      isVisible ? renderDefinition() : null
    );

  };

};
