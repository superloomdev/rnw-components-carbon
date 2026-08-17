// Info: Bootstrap jsdom globals so react-native-web can render in Node.
//
// RNW's createCSSStyleSheet needs ShadowRoot; navigator must be set
// via defineProperty because it is getter-only on modern Node.

import { JSDOM } from 'jsdom';


const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true
});

const GLOBALS = [
  'window', 'document', 'HTMLElement', 'Event', 'MouseEvent',
  'KeyboardEvent', 'getComputedStyle', 'ShadowRoot', 'Node',
  'Element', 'CSSStyleSheet', 'requestAnimationFrame',
  'cancelAnimationFrame', 'MutationObserver', 'CustomEvent',
  'HTMLDivElement', 'HTMLSpanElement', 'HTMLInputElement',
  'HTMLTextAreaElement', 'HTMLButtonElement', 'HTMLAnchorElement',
  'HTMLImageElement', 'HTMLLabelElement', 'HTMLFormElement',
  'ResizeObserver', 'IntersectionObserver', 'matchMedia',
  'DOMRect', 'Range', 'Selection', 'SVGElement'
];

for (let i = 0; i < GLOBALS.length; i++) {
  const name = GLOBALS[i];
  if (dom.window[name] !== undefined && global[name] === undefined) {
    global[name] = dom.window[name];
  }
}

// navigator is getter-only on modern Node - must use defineProperty
Object.defineProperty(global, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
  writable: true
});

// Stubs for APIs jsdom does not implement but RNW may reference
if (typeof global.requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = function (cb) { return setTimeout(cb, 0); };
  global.cancelAnimationFrame = function (id) { clearTimeout(id); };
}

if (typeof global.matchMedia === 'undefined') {
  global.matchMedia = function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {}
    };
  };
}

if (typeof global.ResizeObserver === 'undefined') {
  global.ResizeObserver = function () {
    return { observe: function () {}, unobserve: function () {}, disconnect: function () {} };
  };
}

if (typeof global.IntersectionObserver === 'undefined') {
  global.IntersectionObserver = function () {
    return { observe: function () {}, unobserve: function () {}, disconnect: function () {} };
  };
}


export { dom };
export const window = dom.window;
export const document = dom.window.document;
