// Info: Pre-import hook for the test runner.
//
// 1. Bootstraps a jsdom DOM environment (required before any RNW import).
// 2. Registers the ESM resolve hook that redirects 'react-native' to
//    'react-native-web'.
//
// Usage: node --import ./harness/register.js --test test.js

import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Bootstrap DOM globals first (RNW needs them at import time)
import './dom.js';

// Register the ESM resolve hook (parentURL is the directory containing the hook)
register('./resolve-hook.js', import.meta.url);
