// Info: Unit tests for rnw-components-carbon.
//
// Tests the public interface: system construction, theme contract bridge,
// atom rendering and accessibility, mechanism parts, and composite components.
// Uses react-test-renderer over jsdom via the loader.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  system,
  Component,
  Style,
  theme,
  Utils,
  React,
  TestRenderer,
  Device,
  createDeviceStub,
  createTestTheme,
  createSystem,
  themeContract,
  TOKENS,
  buildFullSystem
} from './loader.js';

// Named factory import: the no-Icons case builds a one-component system
import { Icon as IconFactory } from 'rnw-components-carbon';

// Mechanism imports (ESM - resolved at module level)
const a11yPart = (await import('../parts/a11y.js')).default;
const pressKeysPart = (await import('../parts/press-keys.js')).default;
const controllableStatePart = (await import('../parts/controllable-state.js')).default;
const compoundContextPart = (await import('../parts/compound-context.js')).default;

const a11y = a11yPart({ React: React, Utils: Utils }, {}, {});
const usePressKeys = pressKeysPart({ React: React, Utils: Utils }, {}, {});
const useControllableState = controllableStatePart({ React: React, Utils: Utils, Debug: { warn: function () {} } }, {}, {});
const createCompoundContext = compoundContextPart({ React: React, Utils: Utils }, {}, {});


// ============================================================================
// 1. BUILD / REBUILD LIFECYCLE
// ============================================================================

describe('build', function () {

  it('should return a Component registry and Style object', function () {

    assert.ok(Component);
    assert.ok(Style);
    assert.ok(Style.utilities);
    assert.ok(Style.tokens);
    assert.strictEqual(Style.breakpoint, 'base');

  });


  it('should register all atom components as functions', function () {

    const atoms = [
      'View', 'Text', 'Icon', 'Image', 'ProgressBar', 'Button',
      'TextInput', 'Toggle', 'Checkbox', 'RadioButton', 'TextArea',
      'Slider', 'Link', 'Skeleton', 'Loading', 'Tag', 'AspectRatio',
      'Heading', 'BadgeIndicator', 'ShapeIndicator', 'IconIndicator',
      'InlineLink'
    ];

    for (let i = 0; i < atoms.length; i++) {
      assert.strictEqual(typeof Component[atoms[i]], 'function',
        atoms[i] + ' should be a function');
    }

  });


  it('should register the variant registry with ButtonPrimaryOutlined', function () {

    assert.ok(Component.variant);
    assert.strictEqual(typeof Component.variant.ButtonPrimaryOutlined, 'function');

  });


  it('should register the freeform registry with RawBox', function () {

    assert.ok(Component.freeform);
    assert.strictEqual(typeof Component.freeform.RawBox, 'function');

  });


  it('should register the provider registry', function () {

    assert.ok(Component.provider);
    assert.strictEqual(typeof Component.provider.Overlay, 'function');
    assert.strictEqual(typeof Component.provider.Layer, 'function');
    assert.strictEqual(typeof Component.provider.Theme, 'function');

  });

});


describe('re-theming by building a second system', function () {

  it('should return an independent registry at the requested breakpoint', function () {

    const rebuilt = buildFullSystem(theme, 'md');

    assert.ok(rebuilt.Component);
    assert.ok(rebuilt.Style);
    assert.notStrictEqual(rebuilt.Component, Component);
    assert.strictEqual(rebuilt.Style.breakpoint, 'md');

  });


  it('should leave the original system untouched', function () {

    buildFullSystem(theme, 'md');

    assert.strictEqual(Style.breakpoint, 'base');

  });

});


describe('createSystem theme validation', function () {

  it('should throw TypeError on malformed theme', function () {

    assert.throws(function () {
      buildFullSystem({ Color: {}, Dimension: {}, Font: {} }, 'base');
    }, TypeError);

  });


  it('should throw TypeError on missing Color group', function () {

    assert.throws(function () {
      buildFullSystem({ Dimension: {}, Font: {} }, 'base');
    }, TypeError);

  });


  it('should throw TypeError on unit-suffixed dimension values', function () {

    const badTheme = createTestTheme();
    badTheme.Dimension.fontSize.md = '1rem';

    assert.throws(function () {
      buildFullSystem(badTheme, 'base');
    }, TypeError);

  });

});


// ============================================================================
// 2. THEME CONTRACT BRIDGE
// ============================================================================

describe('themeContract', function () {

  it('should reshape flat tokens to nested structure', function () {

    const flat = {
      'color.APP_PRIMARY': '#0f62fe',
      'color.TEXT_PRIMARY': '#161616',
      'dimension.font_size.xs': 12,
      'dimension.font_size.md': 16,
      'dimension.line_height_ratio': 1.4,
      'font.family.primary': 'System',
      'font.weight.regular': '400'
    };

    const result = themeContract(flat);

    assert.strictEqual(result.Color.APP_PRIMARY, '#0f62fe');
    assert.strictEqual(result.Color.TEXT_PRIMARY, '#161616');
    assert.strictEqual(result.Dimension.fontSize.xs, 12);
    assert.strictEqual(result.Dimension.fontSize.md, 16);
    assert.strictEqual(result.Dimension.lineHeightRatio, 1.4);
    assert.strictEqual(result.Font.family.primary, 'System');
    assert.strictEqual(result.Font.weight.regular, '400');
    assert.ok(result.Breakpoint);

  });


  it('should accept buildTheme result with tokens key', function () {

    const themerOutput = {
      tokens: {
        'color.APP_PRIMARY': '#0f62fe',
        'dimension.font_size.md': 16
      }
    };

    const result = themeContract(themerOutput);

    assert.strictEqual(result.Color.APP_PRIMARY, '#0f62fe');
    assert.strictEqual(result.Dimension.fontSize.md, 16);

  });


  it('should round font sizes to integers', function () {

    const flat = { 'dimension.font_size.md': 16.7 };
    const result = themeContract(flat);

    assert.strictEqual(result.Dimension.fontSize.md, 17);

  });


  it('should handle null input gracefully', function () {

    const result = themeContract(null);

    assert.ok(result.Color);
    assert.ok(result.Dimension);
    assert.ok(result.Font);
    assert.ok(result.Breakpoint);

  });

});


// ============================================================================
// 3. TOKEN CONSTANTS
// ============================================================================

describe('TOKENS', function () {

  it('should export frozen token sets', function () {

    assert.ok(Array.isArray(TOKENS.fontSize));
    assert.ok(Array.isArray(TOKENS.fontColor));
    assert.ok(Array.isArray(TOKENS.fontWeight));
    assert.ok(Array.isArray(TOKENS.space));
    assert.ok(Array.isArray(TOKENS.radius));
    assert.ok(Object.isFrozen(TOKENS));

  });


  it('should freeze every token array', function () {

    assert.ok(Object.isFrozen(TOKENS.fontSize));
    assert.ok(Object.isFrozen(TOKENS.radius));

  });


  it('should include md in fontSize', function () {

    assert.ok(TOKENS.fontSize.indexOf('md') !== -1);

  });

});


// ============================================================================
// 4. COMMON STYLES GENERATION
// ============================================================================

describe('commonStyles', function () {

  it('should generate font_size utilities for all sizes', function () {

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

    for (let i = 0; i < sizes.length; i++) {
      assert.ok(Style.utilities['font_size_' + sizes[i]],
        'font_size_' + sizes[i] + ' should exist');
    }

  });


  it('should generate padding utilities for all sides and sizes', function () {

    const sides = ['a', 'h', 'v', 't', 'b', 's', 'e'];
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

    for (let i = 0; i < sides.length; i++) {
      for (let j = 0; j < sizes.length; j++) {
        const key = 'p_' + sides[i] + '_' + sizes[j];
        assert.ok(Style.utilities[key], key + ' should exist');
      }
    }

  });


  it('should generate background utilities for color tokens', function () {

    const tokens = ['app_primary', 'background_primary', 'background_secondary', 'surface'];

    for (let i = 0; i < tokens.length; i++) {
      assert.ok(Style.utilities['background_' + tokens[i]],
        'background_' + tokens[i] + ' should exist');
    }

  });

});


// ============================================================================
// 5. ATOM COMPONENTS
// ============================================================================

describe('View', function () {

  it('should render with background token', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.View, { background: 'surface' }, 'test')
    ).toJSON();

    assert.ok(tree);

  });


  it('should render with radius and border tokens', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.View, { radius: 'lg', border: true }, 'test')
    ).toJSON();

    assert.ok(tree);

  });

});


describe('Text', function () {

  it('should render with default size, color, and weight', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Text, null, 'hello')
    ).toJSON();

    assert.ok(tree);

  });


  it('should apply custom size, color, and weight tokens', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Text, { size: 'xl', color: 'app_primary', weight: 'bold' }, 'hello')
    ).toJSON();

    assert.ok(tree);

  });

});


describe('Icon', function () {

  it('should render with injected Glyph component', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Icon, { name: 'check', size: 'md', color: 'TEXT_PRIMARY' })
    ).toJSON();

    assert.ok(tree);

  });


  it('should return null when Icons not injected', function () {

    const noIconsSystem = createSystem({
      Utils: Utils,
      Debug: { warn: function () {} },
      React: React,
      Device: createDeviceStub(375, 812)
    }, {}, createTestTheme(), 'base');

    noIconsSystem.addComponents({ Icon: IconFactory });

    const tree = TestRenderer.create(
      React.createElement(noIconsSystem.Component.Icon, { name: 'check' })
    ).toJSON();

    assert.strictEqual(tree, null);

  });

});


describe('Button', function () {

  it('should render with accessibilityRole button', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Button, { onPress: function () {} }, 'Click')
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'button');

  });


  it('should set aria-disabled when disabled prop is true', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Button, { disabled: true, onPress: function () {} }, 'Click')
    ).toJSON();

    assert.strictEqual(tree.props['aria-disabled'], true);

  });

});


describe('TextInput', function () {

  it('should render with accessibilityRole textbox', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.TextInput, { accessibilityLabel: 'Email' })
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'textbox');

  });


  it('should set aria-invalid when isInvalid is true', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.TextInput, { isInvalid: true })
    ).toJSON();

    assert.strictEqual(tree.props['aria-invalid'], true);

  });

});


describe('Toggle', function () {

  it('should render with accessibilityRole switch and aria-checked', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Toggle, { value: true, onValueChange: function () {} })
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'switch');
    assert.strictEqual(tree.props['aria-checked'], true);

  });

});


describe('Checkbox', function () {

  it('should render with role checkbox', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Checkbox, {
        checked: true,
        label: 'Accept',
        onChange: function () {}
      })
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'checkbox');

  });


  it('should call onChange with false when checked is true', function () {

    let captured = null;

    const inst = TestRenderer.create(
      React.createElement(Component.Checkbox, {
        checked: true,
        label: 'Test',
        onChange: function (val) { captured = val; }
      })
    );

    const pressable = inst.root.findByProps({ accessibilityRole: 'checkbox' });
    pressable.props.onPress();

    assert.strictEqual(captured, false);

  });

});


describe('RadioButton', function () {

  it('should render with role radio', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.RadioButton, {
        checked: true,
        label: 'Option A',
        onChange: function () {}
      })
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'radio');

  });

});


describe('ProgressBar', function () {

  it('should render determinate mode with aria-valuenow', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.ProgressBar, { value: 0.5 })
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'progressbar');
    assert.strictEqual(tree.props['aria-valuenow'], 0.5);
    assert.strictEqual(tree.props['aria-valuemin'], 0);
    assert.strictEqual(tree.props['aria-valuemax'], 1);

  });


  it('should clamp value above 1 to 1', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.ProgressBar, { value: 1.5 })
    ).toJSON();

    assert.ok(tree);
    assert.ok(tree.children);

  });

});


describe('Heading', function () {

  it('should render with role heading and aria-level', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Heading, { level: 2 }, 'Title')
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'heading');
    assert.strictEqual(tree.props['aria-level'], 2);

  });

});


describe('Link', function () {

  it('should render with role link', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Link, {
        onPress: function () {},
        accessibilityLabel: 'More'
      }, 'More')
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'link');

  });

});


// ============================================================================
// 6. MECHANISM PARTS (A11y, PressKeys, ControllableState)
// ============================================================================

describe('A11y translator', function () {

  it('should translate checked to aria-checked', function () {

    const props = a11y.state({ checked: true });
    assert.strictEqual(props['aria-checked'], true);

  });


  it('should omit null and undefined values', function () {

    const props = a11y.state({ checked: true, disabled: null, expanded: undefined });

    assert.strictEqual(props['aria-checked'], true);
    assert.strictEqual(props['aria-disabled'], undefined);
    assert.strictEqual(props['aria-expanded'], undefined);

  });


  it('should handle mixed checked for indeterminate', function () {

    const props = a11y.state({ checked: 'mixed' });
    assert.strictEqual(props['aria-checked'], 'mixed');

  });


  it('should translate numeric value props', function () {

    const props = a11y.value({ min: 0, max: 100, now: 50, text: '50 percent' });

    assert.strictEqual(props['aria-valuemin'], 0);
    assert.strictEqual(props['aria-valuemax'], 100);
    assert.strictEqual(props['aria-valuenow'], 50);
    assert.strictEqual(props['aria-valuetext'], '50 percent');

  });


  it('should translate relationship props', function () {

    const props = a11y.relation({ controls: 'panel-1', describedby: 'desc-1' });

    assert.strictEqual(props['aria-controls'], 'panel-1');
    assert.strictEqual(props['aria-describedby'], 'desc-1');

  });


  it('should translate position props', function () {

    const props = a11y.position({ posinset: 3, setsize: 10, level: 2 });

    assert.strictEqual(props['aria-posinset'], 3);
    assert.strictEqual(props['aria-setsize'], 10);
    assert.strictEqual(props['aria-level'], 2);

  });


  it('should generate unique monotonic ids', function () {

    const id1 = a11y.id('carbon-tab');
    const id2 = a11y.id('carbon-tab');

    assert.ok(id1.startsWith('carbon-tab'));
    assert.notStrictEqual(id1, id2);

  });

});


describe('usePressKeys', function () {

  it('should return onKeyDown on web', function () {

    let capturedProps = null;

    function TestComp () {
      capturedProps = usePressKeys({ role: 'checkbox', onActivate: function () {}, disabled: false });
      return null;
    }

    TestRenderer.create(React.createElement(TestComp));

    assert.strictEqual(typeof capturedProps.onKeyDown, 'function');

  });

});


describe('useControllableState', function () {

  it('should use value when controlled', function () {

    let capturedValue = null;

    function TestComp () {
      const state = useControllableState({ value: 42, defaultValue: 0 });
      capturedValue = state[0];
      return null;
    }

    TestRenderer.create(React.createElement(TestComp));

    assert.strictEqual(capturedValue, 42);

  });


  it('should use defaultValue when uncontrolled', function () {

    let capturedValue = null;

    function TestComp () {
      const state = useControllableState({ defaultValue: 10 });
      capturedValue = state[0];
      return null;
    }

    TestRenderer.create(React.createElement(TestComp));

    assert.strictEqual(capturedValue, 10);

  });

});


describe('createCompoundContext', function () {

  it('should throw when useContext is called outside Provider', function () {

    const ctx = createCompoundContext({ React: React, Utils: Utils }, 'TestCompound');

    function Consumer () {
      ctx.useContext();
      return null;
    }

    assert.throws(function () {
      TestRenderer.create(React.createElement(Consumer));
    }, TypeError);

  });


  it('should provide value inside Provider', function () {

    const ctx = createCompoundContext({ React: React, Utils: Utils }, 'TestCompound2');

    let captured = null;

    function Consumer () {
      captured = ctx.useContext();
      return null;
    }

    TestRenderer.create(
      React.createElement(ctx.Provider, { value: { activeIndex: 0 } },
        React.createElement(Consumer)
      )
    );

    assert.strictEqual(captured.activeIndex, 0);

  });

});


// ============================================================================
// 7. MOLECULE COMPONENTS
// ============================================================================

describe('ListItem', function () {

  it('should render with title', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.ListItem, { title: 'Item 1', subtitle: 'Desc' })
    ).toJSON();

    assert.ok(tree);

  });


  it('should have role button when onPress is provided', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.ListItem, { title: 'Item', onPress: function () {} })
    ).toJSON();

    assert.strictEqual(tree.props.role, 'button');

  });

});


describe('Modal', function () {

  it('should render nothing when isOpen is false', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Modal, { isOpen: false, onClose: function () {} }, 'content')
    ).toJSON();

    assert.strictEqual(tree, null);

  });


  it('should render content when isOpen is true', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Modal, { isOpen: true, onClose: function () {} }, 'content')
    ).toJSON();

    assert.ok(tree);

  });

});


describe('Dropdown', function () {

  it('should render trigger with role button when closed', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Dropdown, {
        triggerLabel: 'Select',
        items: [{ value: 'a', label: 'A' }],
        onSelect: function () {}
      })
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'button');

  });

});


// ============================================================================
// 8. COMPOSITE COMPONENTS
// ============================================================================

describe('Accordion', function () {

  it('should render with children', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Accordion, {
        allowMultiple: false,
        expandedKeys: [],
        onChange: function () {}
      },
        React.createElement(Component.AccordionItem, {
          title: 'Section 1',
          expanded: false,
          onToggle: function () {}
        }, 'Content 1')
      )
    ).toJSON();

    assert.ok(tree);

  });

});


describe('Tabs', function () {

  it('should render Tab with role tab', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.Tab, {
        label: 'Overview',
        selected: true,
        onPress: function () {}
      })
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'tab');

  });


  it('should render TabList with role tablist', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.TabList, null, 'tabs')
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'tablist');

  });


  it('should render TabPanel with role tabpanel when selected', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.TabPanel, { selected: true }, 'content')
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'tabpanel');

  });


  it('should render TabPanel as null when not selected', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.TabPanel, { selected: false }, 'content')
    ).toJSON();

    assert.strictEqual(tree, null);

  });

});


// ============================================================================
// 9. HOOK: useBreakpoint
// ============================================================================

describe('useBreakpoint', function () {

  it('should return base for a 375px viewport', function () {

    let capturedBp = null;

    function TestComp () {
      capturedBp = system.useBreakpoint(theme);
      return null;
    }

    TestRenderer.create(React.createElement(TestComp));

    assert.strictEqual(capturedBp, 'base');

  });

});


// ============================================================================
// 10. VARIANT AND FREEFORM
// ============================================================================

describe('ButtonPrimaryOutlined', function () {

  it('should render with role button', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.variant.ButtonPrimaryOutlined, {
        title: 'Cancel',
        onPress: function () {}
      })
    ).toJSON();

    assert.ok(tree);
    assert.strictEqual(tree.props.role, 'button');

  });

});


describe('RawBox', function () {

  it('should render with raw style', function () {

    const tree = TestRenderer.create(
      React.createElement(Component.freeform.RawBox, {
        style: { backgroundColor: 'red' }
      }, 'raw')
    ).toJSON();

    assert.ok(tree);

  });

});
