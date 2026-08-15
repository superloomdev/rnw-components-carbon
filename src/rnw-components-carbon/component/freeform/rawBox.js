// Info: RawBox (UNSTRUCTURED EXCEPTION / escape hatch). This component
// intentionally does NOT receive Style, Registry, or the theme and does NOT
// read any token. It takes a raw style and renders it. Use ONLY for surfaces
// that must abandon the design system entirely (chat bubbles, game HUDs,
// marketing heroes). It lives in the fenced `freeform/` namespace so its use
// is a conscious, reviewable decision and so a future lint rule can flag
// imports from here. It will NOT retheme at runtime.
//
// Freeform factories receive Lib (for React access) but NOT Style or Registry.
// They cannot read tokens or compose atoms.
'use strict';

const { View } = require('react-native');


/********************************************************************
Build the RawBox freeform component. No token access, no theme, no Registry.

@param {Object} Lib - { React } only; no Style, no Registry, no tokens

@return {Function} - The RawBox component
*********************************************************************/
module.exports = function (Lib) {

  return function RawBox (props) {

    return Lib.React.createElement(View, { style: props.style }, props.children);

  };

};
