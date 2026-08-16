// Info: Toggletip molecule [S3 overlay]. A tooltip triggered by press (not
// hover). Uses M1 (a11y), M4 (Overlay), M5 (useAnchoredPosition).
//   content     -> string or node (toggletip content)
//   children    -> trigger element
//   placement   -> string (default 'top')
//   style       -> custom style overrides
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Toggletip molecule.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The Toggletip component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {
  return function Toggletip (props) {

    const {
      content, children, placement, style, isRtlActive // eslint-disable-line no-unused-vars
    } = props;

    const React = Lib.React;
    const [isOpen, setIsOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    // Anchored position
    const anchoredPos = Parts.AnchoredPosition({
      placement: placement || 'top',
      offset: 8,
      flip: true,
      anchorRef: anchorRef
    });

    React.useEffect(function () {
      if (isOpen) {
        anchoredPos.measure();
      }
    }, [isOpen]);

    // Generate stable id
    const tipId = React.useRef(Parts.A11y.id('toggletip')).current;

    // Build aria relation props
    const ariaProps = Parts.A11y.relation({
      describedby: tipId
    });

    // Toggle on press
    const handlePress = function () {
      setIsOpen(!isOpen);
    };

    // Render toggletip content
    const renderTip = function () {
      const pos = anchoredPos.position || { top: 0, left: 0 };
      return React.createElement(
        RNView,
        {
          id: tipId,
          style: [
            Style.utilities['background_surface'],
            Style.utilities['br_md'],
            Style.utilities['p_a_sm'],
            Style.utilities['shadow_sm'],
            {
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              maxWidth: 300,
              zIndex: 1000
            },
            style
          ]
        },
        React.createElement(Registry.Text, {
          size: 'sm',
          color: 'text_primary'
        }, content)
      );
    };

    // Clone trigger with press handler and aria props
    const trigger = React.cloneElement(children, Object.assign({
      ref: anchorRef,
      onPress: handlePress
    }, ariaProps));

    return React.createElement(
      RNView,
      { style: { position: 'relative' } },
      trigger,
      isOpen ? renderTip() : null
    );

  };

};
