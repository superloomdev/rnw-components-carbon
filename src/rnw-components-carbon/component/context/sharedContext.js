// Info: Shared context cache for compound composites. Uses a WeakMap
// keyed by Lib so each loader call gets its own context pair, but
// repeated requires within the same build share the same context.
'use strict';

const cache = new WeakMap();

module.exports = function (Lib, displayName) {

  if (!cache.has(Lib)) {
    cache.set(Lib, {});
  }

  const libCache = cache.get(Lib);

  if (!libCache[displayName]) {
    const createCompoundContext = require('../createCompoundContext');
    libCache[displayName] = createCompoundContext(Lib, displayName);
  }

  return libCache[displayName];

};
