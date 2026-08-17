// Info: Custom Node.js ESM loader hook.
//
// Redirects 'react-native' imports to 'react-native-web' so the component
// source files (which import from 'react-native') resolve correctly in the
// Node.js test environment. Resolves react-native-web from _test/node_modules
// since it is a test dependency, not a production dependency.

import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const rnwEntryPath = require.resolve('react-native-web');
const rnwEntryURL = pathToFileURL(rnwEntryPath).href;


export function resolve (specifier, context, nextResolve) {

  if (specifier === 'react-native') {
    return {
      shortCircuit: true,
      url: rnwEntryURL
    };
  }

  return nextResolve(specifier, context);

}
