// Info: Tests for the createSystem entry point.
//
// createSystem builds the shared infrastructure without instantiating any
// component, so a consumer registers only the factories it imports and a
// bundler drops the rest. These tests cover the system surface, selective
// registration, provider registration, the render-time dependency check,
// and that the factory path still behaves identically.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  createSystem,
  View,
  Text,
  Icon,
  Button,
  Dropdown,
  Theme as ThemeProvider
} from 'rnw-components-carbon';

import {
  Utils,
  Debug,
  React,
  TestRenderer,
  Device,
  Icons,
  createTestTheme
} from './loader.js';


// ========================= SHARED FIXTURES ================================ //

const sharedLibs = {
  Utils: Utils,
  Debug: Debug,
  React: React,
  Device: Device,
  Icons: Icons
};

const testTheme = createTestTheme();


/********************************************************************
Build a fresh system for one test so registrations never leak between
cases. Each call returns an independent registry.

@return {Object} - System object from createSystem
*********************************************************************/
function buildSystem () {

  // Return an independent system instance for this test
  return createSystem(sharedLibs, {}, testTheme, 'base');

}


// ========================= TIER 1 - SYSTEM SURFACE ======================== //

describe('createSystem surface', function () {

  it('should return the documented system shape', function () {

    const system = buildSystem();

    assert.strictEqual(typeof system.make, 'function');
    assert.strictEqual(typeof system.addComponents, 'function');
    assert.strictEqual(typeof system.addProvider, 'function');
    assert.strictEqual(typeof system.checkRegistry, 'function');
    assert.strictEqual(typeof system.Component, 'object');
    assert.strictEqual(typeof system.Style, 'object');
    assert.strictEqual(typeof system.Parts, 'object');
    assert.strictEqual(typeof system.Lib, 'object');
    assert.strictEqual(typeof system.CONFIG, 'object');
    assert.strictEqual(typeof system.ERRORS, 'object');
    assert.strictEqual(system.breakpoint, 'base');

  });

  it('should start with an empty component registry', function () {

    const system = buildSystem();

    assert.deepStrictEqual(Object.keys(system.Component), []);

  });

  it('should default the breakpoint to base when omitted', function () {

    const system = createSystem(sharedLibs, {}, testTheme);

    assert.strictEqual(system.breakpoint, 'base');

  });

  it('should expose the same Style shape the factory path builds', function () {

    const system = buildSystem();

    assert.strictEqual(typeof system.Style.utilities, 'object');
    assert.strictEqual(system.Style.tokens, testTheme);
    assert.strictEqual(system.Style.breakpoint, 'base');
    assert.strictEqual(typeof system.Style.allBreakpoints, 'object');

  });

  it('should build all twelve mechanism parts', function () {

    const system = buildSystem();
    const expected = [
      'A11y', 'PressKeys', 'RovingTabIndex', 'ControllableState',
      'AnchoredPosition', 'FocusTrap', 'Overlay', 'CompoundContext',
      'Units', 'Typeface', 'Direction', 'Filter'
    ];

    assert.deepStrictEqual(Object.keys(system.Parts).sort(), expected.slice().sort());

  });

  it('should throw when the theme contract is malformed', function () {

    assert.throws(function () {
      createSystem(sharedLibs, {}, {}, 'base');
    });

  });

  it('should throw when a required injection is missing', function () {

    assert.throws(function () {
      createSystem({ Utils: Utils }, {}, testTheme, 'base');
    });

  });

});


// ========================= TIER 1 - REGISTRATION ========================== //

describe('createSystem registration', function () {

  it('should register only the components passed to addComponents', function () {

    const system = buildSystem();
    system.addComponents({ View: View, Text: Text });

    assert.deepStrictEqual(Object.keys(system.Component).sort(), ['Text', 'View']);

  });

  it('should return the shared registry from addComponents', function () {

    const system = buildSystem();
    const registry = system.addComponents({ Text: Text });

    assert.strictEqual(registry, system.Component);

  });

  it('should accumulate across multiple addComponents calls', function () {

    const system = buildSystem();
    system.addComponents({ View: View });
    system.addComponents({ Text: Text, Icon: Icon });

    assert.deepStrictEqual(Object.keys(system.Component).sort(), ['Icon', 'Text', 'View']);

  });

  it('should produce a renderable component through make', function () {

    const system = buildSystem();
    const TextComponent = system.make(Text);

    const tree = TestRenderer.create(React.createElement(TextComponent, {}, 'hello'));

    assert.ok(tree.toJSON());

    tree.unmount();

  });

  it('should throw a TypeError when addComponents receives a non-object', function () {

    const system = buildSystem();

    assert.throws(function () {
      system.addComponents(null);
    }, TypeError);

  });

  it('should throw a TypeError when a map entry is not a factory', function () {

    const system = buildSystem();

    assert.throws(function () {
      system.addComponents({ Text: 'not-a-factory' });
    }, TypeError);

  });

  it('should keep two systems independent', function () {

    const first = buildSystem();
    const second = buildSystem();

    first.addComponents({ Text: Text });

    assert.deepStrictEqual(Object.keys(second.Component), []);
    assert.notStrictEqual(first.Component, second.Component);

  });

});


// ========================= TIER 1 - PROVIDERS ============================= //

describe('createSystem providers', function () {

  it('should register a provider under Component.provider', function () {

    const system = buildSystem();
    system.addProvider('Theme', ThemeProvider);

    assert.strictEqual(typeof system.Component.provider.Theme, 'function');

  });

  it('should return the registered provider component', function () {

    const system = buildSystem();
    const provider = system.addProvider('Theme', ThemeProvider);

    assert.strictEqual(provider, system.Component.provider.Theme);

  });

  it('should throw a TypeError on bad addProvider arguments', function () {

    const system = buildSystem();

    assert.throws(function () {
      system.addProvider('Theme', 'not-a-factory');
    }, TypeError);

    assert.throws(function () {
      system.addProvider(null, ThemeProvider);
    }, TypeError);

  });

  it('should throw when the factory does not expose the named provider', function () {

    const system = buildSystem();

    assert.throws(function () {
      system.addProvider('NotAProvider', ThemeProvider);
    }, TypeError);

  });

});


// ========================= TIER 1 - REGISTRY CHECK ======================== //

describe('createSystem checkRegistry', function () {

  it('should report complete for a component with no dependencies', function () {

    const system = buildSystem();
    system.addComponents({ Text: Text });

    const result = system.checkRegistry();

    assert.strictEqual(result.complete, true);
    assert.deepStrictEqual(result.missing, {});

  });

  it('should report the missing render-time dependencies', function () {

    const system = buildSystem();
    system.addComponents({ Dropdown: Dropdown });

    const result = system.checkRegistry();

    assert.strictEqual(result.complete, false);
    assert.deepStrictEqual(result.missing.Dropdown.slice().sort(), ['Icon', 'Text']);

  });

  it('should report complete once the dependencies are registered', function () {

    const system = buildSystem();
    system.addComponents({ Dropdown: Dropdown, Text: Text, Icon: Icon });

    const result = system.checkRegistry();

    assert.strictEqual(result.complete, true);
    assert.deepStrictEqual(result.missing, {});

  });

  it('should report complete for an empty registry', function () {

    const system = buildSystem();

    assert.strictEqual(system.checkRegistry().complete, true);

  });

});


// ========================= TIER 2 - RENDER INTEGRATION ==================== //

describe('createSystem render integration', function () {

  it('should render a component that resolves a sibling at render time', function () {

    const system = buildSystem();
    system.addComponents({ Dropdown: Dropdown, Text: Text, Icon: Icon });

    assert.strictEqual(system.checkRegistry().complete, true);

    const tree = TestRenderer.create(
      React.createElement(system.Component.Dropdown, {
        items: [{ id: 'a', label: 'Alpha' }],
        triggerLabel: 'Pick one',
        accessibilityLabel: 'Pick one'
      })
    );

    assert.ok(tree.toJSON());

    tree.unmount();

  });

  it('should resolve siblings regardless of registration order', function () {

    const system = buildSystem();

    system.addComponents({ Dropdown: Dropdown });
    system.addComponents({ Text: Text, Icon: Icon });

    const tree = TestRenderer.create(
      React.createElement(system.Component.Dropdown, {
        items: [{ id: 'a', label: 'Alpha' }],
        triggerLabel: 'Pick one',
        accessibilityLabel: 'Pick one'
      })
    );

    assert.ok(tree.toJSON());

    tree.unmount();

  });

  it('should render a button through the system registry', function () {

    const system = buildSystem();
    system.addComponents({ Button: Button, Text: Text });

    const tree = TestRenderer.create(
      React.createElement(system.Component.Button, {
        onPress: function () {},
        accessibilityLabel: 'Save'
      }, 'Save')
    );

    assert.ok(tree.toJSON());

    tree.unmount();

  });

});


// ========================= TIER 3 - PARITY WITH FACTORY =================== //

describe('createSystem parity with the factory path', function () {

  it('should produce the same utility style keys as the factory path', async function () {

    const loaderModule = await import('./loader.js');
    const system = buildSystem();

    const factoryKeys = Object.keys(loaderModule.Style.utilities).sort();
    const systemKeys = Object.keys(system.Style.utilities).sort();

    assert.deepStrictEqual(systemKeys, factoryKeys);

  });

  it('should produce the same breakpoint set as the factory path', async function () {

    const loaderModule = await import('./loader.js');
    const system = buildSystem();

    const factoryBreakpoints = Object.keys(loaderModule.Style.allBreakpoints).sort();
    const systemBreakpoints = Object.keys(system.Style.allBreakpoints).sort();

    assert.deepStrictEqual(systemBreakpoints, factoryBreakpoints);

  });

  it('should render a named export identically to its registry entry', async function () {

    const loaderModule = await import('./loader.js');
    const system = buildSystem();
    system.addComponents({ Text: Text });

    const fromSystem = TestRenderer.create(
      React.createElement(system.Component.Text, {}, 'same')
    );
    const fromFactory = TestRenderer.create(
      React.createElement(loaderModule.Component.Text, {}, 'same')
    );

    assert.deepStrictEqual(fromSystem.toJSON(), fromFactory.toJSON());

    fromSystem.unmount();
    fromFactory.unmount();

  });

});
