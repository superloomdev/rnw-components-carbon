// Info: View atom [S1 presentational]. The base layout box. Convenience props
// map to generated utility classes (background / radius / border); anything
// else falls through `style`. `isRtlActive` is destructured out so it is
// never forwarded to the DOM on web.
'use strict';

const { View: RNView } = require('react-native');


/********************************************************************
Build the View atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The View component
*********************************************************************/
module.exports = function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  return function View (props) {

    // Destructure token props from pass-through props
    const { background, radius, border, style, children, isRtlActive, ...rest } = props; // eslint-disable-line no-unused-vars

    // Resolve token props to utility classes
    const classes = [];

    if (background) {
      const bgClass = Style.utilities['background_' + background];

      if (bgClass) {
        classes.push(bgClass);
      } else {
        Lib.Debug.warn('unknown background token, ignoring', { background: background });
      }

    }

    if (radius) {
      const brClass = Style.utilities['br_' + radius];

      if (brClass) {
        classes.push(brClass);
      } else {
        Lib.Debug.warn('unknown radius token, ignoring', { radius: radius });
      }

    }

    if (border) {
      const borderKey = border === true ? 'default' : border;
      const borderClass = Style.utilities['border_' + borderKey];

      if (borderClass) {
        classes.push(borderClass);
      } else {
        Lib.Debug.warn('unknown border token, ignoring', { border: border });
      }

    }

    return Lib.React.createElement(
      RNView,
      Object.assign({ style: [...classes, style] }, rest),
      children
    );

  };

};
