// Info: Image atom [S1 presentational]. Wraps react-native Image with token
// consumption for radius and background. Source, resize mode, and other props
// pass through directly.


// Imports
import { Image as RNImage } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the Image atom.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (unused by atoms)
@param {Object} Style    - { utilities, tokens, breakpoint }

@return {Function} - The Image component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////
  // None.
  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const Image = function Image (props) {

    // Destructure token props from pass-through props
    const { radius, background, style, ...rest } = props;

    // Resolve token props to utility classes
    const classes = [];

    if (radius) {
      const brClass = Style.utilities['br_' + radius];

      if (brClass) {
        classes.push(brClass);
      } else {
        Lib.Debug.warn('unknown radius token, ignoring', { radius: radius });
      }

    }

    if (background) {
      const bgClass = Style.utilities['background_' + background];

      if (bgClass) {
        classes.push(bgClass);
      } else {
        Lib.Debug.warn('unknown background token, ignoring', { background: background });
      }

    }

    return Lib.React.createElement(
      RNImage,
      Object.assign({ style: [...classes, style] }, rest)
    );

  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _Image = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return Image;

}/////////////////////////// Component Factory END /////////////////////////////
