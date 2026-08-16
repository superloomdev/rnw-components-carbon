// Info: Vite config for L3 visual test harness.
// main.js imports from bundle.js (pre-built by esbuild) + react/react-dom.
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [],
  resolve: {
    extensions: ['.web.js', '.js', '.json']
  },
  server: {
    port: 5199,
    strictPort: true
  },
  preview: {
    port: 5199,
    strictPort: true
  }
});
