// Info: Playwright configuration for L3 interaction tests.
// Headless Chromium only. Starts Vite dev server on port 5199 automatically.
'use strict';

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  testDir: '.',
  testMatch: 'interact.test.js',

  timeout: 60000,

  use: {
    headless: true,
    baseURL: 'http://localhost:5199'
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    }
  ],

  webServer: {
    command: 'npx vite --port 5199 --config visual/vite.config.js',
    port: 5199,
    reuseExistingServer: true,
    timeout: 30000
  }

});
