// Info: ScrollGradient molecule [S1]. A scrollable container with fade
// gradients on the top and bottom edges. Uses role="group" for screen
// reader semantics. The gradients appear when content overflows.
//   children    -> scrollable content
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the ScrollGradient molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The ScrollGradient component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function ScrollGradient (props) {

    const {
      children, style, isRtlActive, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const surfaceColor = Style_.tokens.Color.SURFACE || '#ffffff';

    // Track scroll position to toggle gradient visibility
    const scrollState = React.useState({ top: true, bottom: false });
    const gradients = scrollState[0];
    const setGradients = scrollState[1];

    // Handle scroll to update gradient state
    const handleScroll = function (event) {
      const nativeEvent = event && event.nativeEvent;
      if (!nativeEvent) {
        return;
      }
      const offsetY = nativeEvent.contentOffset && nativeEvent.contentOffset.y;
      const contentHeight = nativeEvent.contentSize && nativeEvent.contentSize.height;
      const layoutHeight = nativeEvent.layoutMeasurement && nativeEvent.layoutMeasurement.height;

      const atTop = offsetY <= 0;
      const atBottom = contentHeight && layoutHeight
        ? offsetY + layoutHeight >= contentHeight
        : true;

      if (atTop !== gradients.top || atBottom !== gradients.bottom) {
        setGradients({ top: atTop, bottom: atBottom });
      }
    };

    // Top gradient overlay
    const topGradient = gradients.top
      ? null
      : React.createElement(RNView, {
        pointerEvents: 'none',
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 24,
          backgroundColor: surfaceColor,
          opacity: 0.7
        }
      });

    // Bottom gradient overlay
    const bottomGradient = gradients.bottom
      ? null
      : React.createElement(RNView, {
        pointerEvents: 'none',
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 24,
          backgroundColor: surfaceColor,
          opacity: 0.7
        }
      });

    return React.createElement(
      RNView,
      Object.assign({
        accessibilityRole: 'group',
        style: [
          { position: 'relative', overflow: 'hidden' },
          style
        ]
      }, rest),
      React.createElement(
        RNView,
        {
          onScroll: handleScroll,
          scrollEventThrottle: 16,
          style: { flex: 1 }
        },
        children
      ),
      topGradient,
      bottomGradient
    );

  };

};
