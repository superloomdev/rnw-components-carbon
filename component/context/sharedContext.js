// Info: Shared context cache for compound composites. Uses a WeakMap
// keyed by Lib so each loader call gets its own context pair, but
// repeated requires within the same build share the same context.

// Imports
import createCompoundContext from '../createCompoundContext.js';


const cache = new WeakMap();

export default function (Lib, displayName) {

  if (!cache.has(Lib)) {
    cache.set(Lib, {});
  }

  const libCache = cache.get(Lib);

  if (!libCache[displayName]) {
    libCache[displayName] = createCompoundContext(Lib, displayName);
  }

  return libCache[displayName];

}
