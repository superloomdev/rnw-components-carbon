// Info: Tooltip molecule [S3 overlay]. A floating tooltip with content
// accessible via aria-describedby. Triggers on hover and focus on web,
// long-press on native. Uses M1 (a11y), M4 (Overlay), M5 (useAnchoredPosition).
//   content     -> string or node (tooltip content)
//   children    -> trigger element
//   placement   -> string (default 'top')
//   style       -> custom style overrides
'use strict';

const { View: RNView, Platform } = require('react-native');


/********************************************************************
Build the Tooltip molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Tooltip component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function Tooltip (props) {

    const {
      content, children, placement, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const [isVisible, setIsVisible] = React.useState(false);
    const anchorRef = React.useRef(null);

    // Anchored position calculation
    const anchoredPos = Parts.AnchoredPosition({
      placement: placement || 'top',
      offset: 8,
      flip: true,
      anchorRef: anchorRef
    });

    // Measure on show
    React.useEffect(function () {
      if (isVisible) {
        anchoredPos.measure();
      }
    }, [isVisible]);

    // Generate stable id for aria-describedby
    const tooltipId = React.useRef(Parts.A11y.id('tooltip')).current;

    // Build aria relation props
    const ariaProps = Parts.A11y.relation({
      describedby: tooltipId
    });

    // Show/hide handlers
    const showTooltip = function () {
      setIsVisible(true);
    };
    const hideTooltip = function () {
      setIsVisible(false);
    };

    // Web: hover + focus; Native: long-press
    const triggerProps = Platform.OS === 'web'
      ? {
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
        onFocus: showTooltip,
        onBlur: hideTooltip
      }
      : {
        onLongPress: showTooltip,
        onPressOut: hideTooltip
      };

    // Render tooltip content
    const renderTooltip = function () {
      const pos = anchoredPos.position || { top: 0, left: 0 };
      return React.createElement(
        RNView,
        Object.assign({
          id: tooltipId,
          accessibilityRole: 'tooltip',
          style: [
            Style.utilities['background_surface'],
            Style.utilities['br_sm'],
            Style.utilities['p_h_sm'],
            Style.utilities['p_v_xs'],
            Style.utilities['shadow_sm'],
            {
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              zIndex: 1000
            },
            style
          ]
        }, rest),
        React.createElement(Registry.Text, {
          size: 'xs',
          color: 'text_primary'
        }, content)
      );
    };

    // Clone trigger with aria + event props
    const trigger = React.cloneElement(children, Object.assign({
      ref: anchorRef
    }, ariaProps, triggerProps));

    return React.createElement(
      RNView,
      { style: { position: 'relative' } },
      trigger,
      isVisible ? renderTooltip() : null
    );

  };

};
