// Info: L3 visual test harness entry point.
// All deps (React, RNW, components, SafeBoundary) come from bundle.js.
import lib from './bundle.js';

var React = lib.React;
var createRoot = lib.ReactDOM.createRoot;
var SafeBoundary = lib.SafeBoundary;
var HINT_PROPS = lib.HINT_PROPS;
var INTERACTIVE = lib.INTERACTIVE;

var result = lib.buildRegistry();
var C = result.C;
var ALL_NAMES = result.ALL_NAMES;

function Gallery() {
  return React.createElement('div', { id: 'gallery', style: { padding: 16 } },
    React.createElement('section', { id: 'interactive', 'data-testid': 'interactive' },
      React.createElement('h2', null, 'Interactive Components'),
      INTERACTIVE.filter(function (name) { return C[name]; }).map(function (name) {
        var Comp = C[name];
        var props = HINT_PROPS[name] || {};
        return React.createElement('div', {
          key: name,
          'data-component': name,
          style: { marginBottom: 12, padding: 8, border: '1px solid #e0e0e0', borderRadius: 4 }
        },
          React.createElement('label', { style: { fontSize: 11, color: '#525252', display: 'block', marginBottom: 4 } }, name),
          React.createElement(SafeBoundary, { name: name },
            React.createElement(Comp, props)
          )
        );
      })
    ),
    React.createElement('section', { id: 'all-components', 'data-testid': 'all-components' },
      React.createElement('h2', null, 'Registered subset (' + ALL_NAMES.length + ' components)')
    )
  );
}

var root = createRoot(document.getElementById('root'));
root.render(React.createElement(Gallery));
