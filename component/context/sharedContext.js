// Info: Shared context cache for compound composites. Uses a WeakMap
// keyed by Lib so each loader call gets its own context pair, but
// repeated requires within the same build share the same context.

// Imports
import compoundContextPart from '../../parts/compound-context.js';


const cache = new WeakMap();

export default function (Lib, displayName) {

  if (!cache.has(Lib)) {
    cache.set(Lib, { make: compoundContextPart(Lib), contexts: {} });
  }

  const entry = cache.get(Lib);

  if (!entry.contexts[displayName]) {
    entry.contexts[displayName] = entry.make(displayName);
  }

  return entry.contexts[displayName];

}
