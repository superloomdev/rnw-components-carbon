// Info: Badge atom [S1 presentational]. A small count or status indicator.
// Wraps a View with background and text color tokens. The count is rendered
// as a Text child.
//   count  -> number or string to display
//   color  -> font color token for the count text
//   background -> background color token for the badge
//   size   -> font size token for the count text
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the Badge atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (for Text composition)
@param {Object} Style_   - { utilities, tokens, breakpoint }

@return {Function} - The Badge component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Registry, Style_) {

  return function Badge (props) {

    // Destructure token props from pass-through props
    const { count, color, background, size, style, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    // Resolve background token
    const classes = [];
    const bgKey = 'background_' + (background || 'app_primary');
    const bgClass = Style_.utilities[bgKey];

    if (bgClass) {
      classes.push(bgClass);
    } else {
      Lib.Debug.warn('unknown badge background token, using default', { background: background });
      classes.push(Style_.utilities['background_app_primary']);
    }

    // Fixed badge shape: small pill
    classes.push({
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
      minWidth: 20,
      alignItems: 'center',
      justifyContent: 'center'
    });

    // Render the count as a Text child via the registry
    return Lib.React.createElement(
      RNView,
      Object.assign({ style: [...classes, style] }, rest),
      Lib.React.createElement(Registry.Text, {
        size: size || 'xs',
        color: color || 'text_on_primary',
        weight: 'medium'
      }, String(count))
    );

  };

};
