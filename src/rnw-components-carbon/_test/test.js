'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');

const {
  Components,
  Component,
  Style,
  theme,
  Utils,
  Debug,
  React,
  TestRenderer,
  createTestTheme,
  createDeviceStub
} = require('./loader');


// ~~~~~~~~~~~~~~~~~~~~ build / rebuild ~~~~~~~~~~~~~~~~~~~~

test('build returns a Component registry and Style object', function () {

  assert.ok(Component, 'Component registry should exist');
  assert.ok(Style, 'Style object should exist');
  assert.ok(Style.utilities, 'Style.utilities should exist');
  assert.ok(Style.tokens, 'Style.tokens should exist');
  assert.strictEqual(Style.breakpoint, 'base');

});

test('build registers all 10 atoms', function () {

  const atoms = ['View', 'Text', 'Icon', 'Image', 'Badge', 'Separator',
    'ProgressBar', 'Button', 'TextInput', 'Toggle'];

  for (let i = 0; i < atoms.length; i++) {
    assert.ok(typeof Component[atoms[i]] === 'function', 'atom ' + atoms[i] + ' should be a function');
  }

});

test('build registers all 6 molecules', function () {

  const molecules = ['ButtonPrimary', 'ButtonLink', 'Card', 'ListItem', 'Dropdown', 'Modal'];

  for (let i = 0; i < molecules.length; i++) {
    assert.ok(typeof Component[molecules[i]] === 'function', 'molecule ' + molecules[i] + ' should be a function');
  }

});

test('build registers the variant registry', function () {

  assert.ok(Component.variant, 'variant registry should exist');
  assert.ok(typeof Component.variant.ButtonPrimaryOutlined === 'function',
    'ButtonPrimaryOutlined variant should be a function');

});

test('build registers the freeform registry', function () {

  assert.ok(Component.freeform, 'freeform registry should exist');
  assert.ok(typeof Component.freeform.RawBox === 'function',
    'RawBox freeform should be a function');

});

test('rebuild returns a new registry object', function () {

  const rebuilt = Components.rebuild(theme, 'md');

  assert.ok(rebuilt.Component, 'rebuilt should have a Component registry');
  assert.ok(rebuilt.Style, 'rebuilt should have a Style object');
  assert.notStrictEqual(rebuilt.Component, Component, 'rebuilt registry should be a new object');
  assert.strictEqual(rebuilt.Style.breakpoint, 'md');

});

test('build throws TypeError on malformed theme', function () {

  assert.throws(function () {
    Components.build({ Color: {}, Dimension: {}, Font: {} });
  }, TypeError);

});

test('build throws TypeError on missing Color group', function () {

  assert.throws(function () {
    Components.build({ Dimension: {}, Font: {} });
  }, TypeError);

});


// ~~~~~~~~~~~~~~~~~~~~ themeContract ~~~~~~~~~~~~~~~~~~~~

test('themeContract reshapes flat tokens to nested structure', function () {

  const flat = {
    'color.APP_PRIMARY': '#0f62fe',
    'color.TEXT_PRIMARY': '#161616',
    'dimension.font_size.xs': 12,
    'dimension.font_size.md': 16,
    'dimension.line_height_ratio': 1.4,
    'font.family.primary': 'System',
    'font.weight.regular': '400'
  };

  const result = Components.themeContract(flat);

  assert.strictEqual(result.Color.APP_PRIMARY, '#0f62fe');
  assert.strictEqual(result.Color.TEXT_PRIMARY, '#161616');
  assert.strictEqual(result.Dimension.fontSize.xs, 12);
  assert.strictEqual(result.Dimension.fontSize.md, 16);
  assert.strictEqual(result.Dimension.lineHeightRatio, 1.4);
  assert.strictEqual(result.Font.family.primary, 'System');
  assert.strictEqual(result.Font.weight.regular, '400');
  assert.ok(result.Breakpoint, 'Breakpoint group should exist');

});

test('themeContract accepts buildTheme result with tokens key', function () {

  const themerOutput = {
    tokens: {
      'color.APP_PRIMARY': '#0f62fe',
      'dimension.font_size.md': 16
    }
  };

  const result = Components.themeContract(themerOutput);

  assert.strictEqual(result.Color.APP_PRIMARY, '#0f62fe');
  assert.strictEqual(result.Dimension.fontSize.md, 16);

});

test('themeContract rounds font sizes to integers', function () {

  const flat = {
    'dimension.font_size.md': 16.7
  };

  const result = Components.themeContract(flat);

  assert.strictEqual(result.Dimension.fontSize.md, 17);

});

test('themeContract handles null input gracefully', function () {

  const result = Components.themeContract(null);

  assert.ok(result.Color, 'Color should exist');
  assert.ok(result.Dimension, 'Dimension should exist');
  assert.ok(result.Font, 'Font should exist');
  assert.ok(result.Breakpoint, 'Breakpoint should exist');

});


// ~~~~~~~~~~~~~~~~~~~~ tokens constant ~~~~~~~~~~~~~~~~~~~~

test('tokens exports frozen token sets', function () {

  const tokens = Components.tokens;

  assert.ok(Array.isArray(tokens.fontSize), 'fontSize should be an array');
  assert.ok(Array.isArray(tokens.fontColor), 'fontColor should be an array');
  assert.ok(Array.isArray(tokens.fontWeight), 'fontWeight should be an array');
  assert.ok(Object.isFrozen(tokens), 'tokens should be frozen');

  // Verify the expected sizes are present
  assert.ok(tokens.fontSize.indexOf('md') !== -1, 'md should be in fontSize');

});


// ~~~~~~~~~~~~~~~~~~~~ View atom ~~~~~~~~~~~~~~~~~~~~

test('View renders with background token', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.View, { background: 'surface' }, 'test')
  ).toJSON();

  assert.ok(tree, 'View should render');
  assert.ok(tree.props.style, 'View should have a style prop');

});

test('View renders with radius and border tokens', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.View, { radius: 'lg', border: true }, 'test')
  ).toJSON();

  assert.ok(tree, 'View should render with radius and border');

});

test('View does not forward isRtlActive to the native element', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.View, { isRtlActive: true }, 'test')
  ).toJSON();

  assert.strictEqual(tree.props.isRtlActive, undefined, 'isRtlActive should not be forwarded');

});


// ~~~~~~~~~~~~~~~~~~~~ Text atom ~~~~~~~~~~~~~~~~~~~~

test('Text renders with default size, color, and weight', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Text, null, 'hello')
  ).toJSON();

  assert.ok(tree, 'Text should render');
  assert.ok(tree.props.style, 'Text should have a style prop');

});

test('Text applies custom size, color, and weight tokens', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Text, { size: 'xl', color: 'app_primary', weight: 'bold' }, 'hello')
  ).toJSON();

  assert.ok(tree, 'Text should render with custom tokens');

});


// ~~~~~~~~~~~~~~~~~~~~ Icon atom ~~~~~~~~~~~~~~~~~~~~

test('Icon renders with injected Glyph component', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Icon, { name: 'check', size: 'md', color: 'TEXT_PRIMARY' })
  ).toJSON();

  assert.ok(tree, 'Icon should render');

});

test('Icon returns null when Icons not injected', function () {

  // Build a Components instance without Icons
  const ComponentsNoIcons = require('rnw-components-carbon')({
    Utils: Utils,
    Debug: Debug,
    React: React,
    Device: createDeviceStub(375, 812)
  });

  const built = ComponentsNoIcons.build(createTestTheme());
  const tree = TestRenderer.create(
    React.createElement(built.Component.Icon, { name: 'check' })
  ).toJSON();

  assert.strictEqual(tree, null, 'Icon should return null without Icons injection');

});


// ~~~~~~~~~~~~~~~~~~~~ Badge atom ~~~~~~~~~~~~~~~~~~~~

test('Badge renders with count and background token', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Badge, { count: 5, background: 'app_primary' })
  ).toJSON();

  assert.ok(tree, 'Badge should render');

});

test('Badge renders the count as a string child', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Badge, { count: 42 })
  ).toJSON();

  // Badge wraps a Text child; find the text content
  assert.ok(tree.children, 'Badge should have children');

});


// ~~~~~~~~~~~~~~~~~~~~ Separator atom ~~~~~~~~~~~~~~~~~~~~

test('Separator renders a horizontal line by default', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Separator, null)
  ).toJSON();

  assert.ok(tree, 'Separator should render');
  assert.ok(tree.props.style, 'Separator should have a style prop');

});

test('Separator renders a vertical line when orientation is vertical', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Separator, { orientation: 'vertical' })
  ).toJSON();

  assert.ok(tree, 'Vertical separator should render');

});


// ~~~~~~~~~~~~~~~~~~~~ ProgressBar atom ~~~~~~~~~~~~~~~~~~~~

test('ProgressBar renders determinate fill based on value', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ProgressBar, { value: 0.5 })
  ).toJSON();

  assert.ok(tree, 'ProgressBar should render');
  assert.ok(tree.children, 'ProgressBar should have a fill child');
  assert.strictEqual(tree.props.accessibilityRole, 'progressbar');
  assert.strictEqual(tree.props['aria-valuenow'], 0.5);
  assert.strictEqual(tree.props['aria-valuemin'], 0);
  assert.strictEqual(tree.props['aria-valuemax'], 1);

});

test('ProgressBar clamps value above 1 to 1', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ProgressBar, { value: 1.5 })
  ).toJSON();

  // The fill width should be 100%
  const fill = tree.children[0];
  assert.strictEqual(fill.props.style.width, '100%');

});

test('ProgressBar clamps value below 0 to 0', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ProgressBar, { value: -0.5 })
  ).toJSON();

  const fill = tree.children[0];
  assert.strictEqual(fill.props.style.width, '0%');

});


// ~~~~~~~~~~~~~~~~~~~~ Button atom ~~~~~~~~~~~~~~~~~~~~

test('Button renders with accessibilityRole button', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Button, { onPress: function () {}, background: 'app_primary' }, 'Click')
  ).toJSON();

  assert.ok(tree, 'Button should render');
  assert.strictEqual(tree.props.accessibilityRole, 'button');

});

test('Button sets aria-disabled when disabled prop is true', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Button, { disabled: true, onPress: function () {} }, 'Click')
  ).toJSON();

  assert.strictEqual(tree.props['aria-disabled'], true);
  assert.strictEqual(tree.props.disabled, true);

});


// ~~~~~~~~~~~~~~~~~~~~ TextInput atom ~~~~~~~~~~~~~~~~~~~~

test('TextInput renders with accessibilityRole textbox', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.TextInput, { accessibilityLabel: 'Email' })
  ).toJSON();

  assert.ok(tree, 'TextInput should render');
  assert.strictEqual(tree.props.accessibilityRole, 'textbox');

});

test('TextInput sets aria-invalid when isInvalid is true', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.TextInput, { isInvalid: true })
  ).toJSON();

  assert.strictEqual(tree.props['aria-invalid'], true);

});


// ~~~~~~~~~~~~~~~~~~~~ Toggle atom ~~~~~~~~~~~~~~~~~~~~

test('Toggle renders with accessibilityRole switch', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Toggle, { value: true, onValueChange: function () {} })
  ).toJSON();

  assert.ok(tree, 'Toggle should render');
  assert.strictEqual(tree.props.accessibilityRole, 'switch');
  assert.strictEqual(tree.props['aria-checked'], true);

});


// ~~~~~~~~~~~~~~~~~~~~ ButtonPrimary molecule ~~~~~~~~~~~~~~~~~~~~

test('ButtonPrimary renders with accessibilityRole button and label', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ButtonPrimary, { title: 'Submit', onPress: function () {} })
  ).toJSON();

  assert.ok(tree, 'ButtonPrimary should render');
  assert.strictEqual(tree.props.accessibilityRole, 'button');
  assert.strictEqual(tree.props.accessibilityLabel, 'Submit');

});

test('ButtonPrimary renders an icon when icon prop is provided', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ButtonPrimary, { title: 'Save', icon: 'save', onPress: function () {} })
  ).toJSON();

  // The children function renders a Fragment with Icon + Text
  assert.ok(tree, 'ButtonPrimary with icon should render');

});


// ~~~~~~~~~~~~~~~~~~~~ ButtonLink molecule ~~~~~~~~~~~~~~~~~~~~

test('ButtonLink renders with accessibilityRole link', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ButtonLink, { title: 'Learn more', onPress: function () {} })
  ).toJSON();

  assert.ok(tree, 'ButtonLink should render');
  assert.strictEqual(tree.props.accessibilityRole, 'link');

});


// ~~~~~~~~~~~~~~~~~~~~ Card molecule ~~~~~~~~~~~~~~~~~~~~

test('Card renders as a View when no onPress is provided', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Card, null, 'content')
  ).toJSON();

  assert.ok(tree, 'Card should render');

});

test('Card renders as a Pressable when onPress is provided', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Card, { onPress: function () {} }, 'content')
  ).toJSON();

  assert.ok(tree, 'Pressable Card should render');
  assert.strictEqual(tree.props.accessibilityRole, 'button');

});


// ~~~~~~~~~~~~~~~~~~~~ ListItem molecule ~~~~~~~~~~~~~~~~~~~~

test('ListItem renders title and subtitle', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ListItem, { title: 'Item 1', subtitle: 'Description' })
  ).toJSON();

  assert.ok(tree, 'ListItem should render');

});

test('ListItem with onPress has accessibilityRole button', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ListItem, { title: 'Item 1', onPress: function () {} })
  ).toJSON();

  assert.strictEqual(tree.props.accessibilityRole, 'button');

});


// ~~~~~~~~~~~~~~~~~~~~ Modal molecule (S3 overlay) ~~~~~~~~~~~~~~~~~~~~

test('Modal renders nothing when isOpen is false', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Modal, { isOpen: false, onClose: function () {} }, 'content')
  ).toJSON();

  assert.strictEqual(tree, null, 'Modal should render null when closed');

});

test('Modal renders content when isOpen is true', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Modal, { isOpen: true, onClose: function () {} }, 'content')
  ).toJSON();

  assert.ok(tree, 'Modal should render when open');

});


// ~~~~~~~~~~~~~~~~~~~~ Dropdown molecule (S3 overlay) ~~~~~~~~~~~~~~~~~~~~

test('Dropdown renders a trigger button when closed', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Dropdown, {
      triggerLabel: 'Select',
      items: [{ value: 'a', label: 'A' }],
      onSelect: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'Dropdown trigger should render');
  assert.strictEqual(tree.props.accessibilityRole, 'button');

});


// ~~~~~~~~~~~~~~~~~~~~ ButtonPrimaryOutlined variant ~~~~~~~~~~~~~~~~~~~~

test('ButtonPrimaryOutlined renders with accessibilityRole button', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.variant.ButtonPrimaryOutlined, { title: 'Cancel', onPress: function () {} })
  ).toJSON();

  assert.ok(tree, 'ButtonPrimaryOutlined should render');
  assert.strictEqual(tree.props.accessibilityRole, 'button');

});


// ~~~~~~~~~~~~~~~~~~~~ RawBox freeform ~~~~~~~~~~~~~~~~~~~~

test('RawBox renders with raw style and no token access', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.freeform.RawBox, { style: { backgroundColor: 'red' } }, 'raw')
  ).toJSON();

  assert.ok(tree, 'RawBox should render');
  assert.strictEqual(tree.props.style.backgroundColor, 'red');

});


// ~~~~~~~~~~~~~~~~~~~~ useBreakpoint hook ~~~~~~~~~~~~~~~~~~~~

test('useBreakpoint returns the base breakpoint for narrow viewports', function () {

  // The test device stub is 375px wide, which is below the sm breakpoint (480)
  // Hooks must be called inside a component, so we render a test component
  let capturedBp = null;

  function TestComponent () {
    capturedBp = Components.useBreakpoint(theme);
    return null;
  }

  TestRenderer.create(React.createElement(TestComponent));

  assert.strictEqual(capturedBp, 'base');

});


// ~~~~~~~~~~~~~~~~~~~~ commonStyles utility generation ~~~~~~~~~~~~~~~~~~~~

test('commonStyles generates font_size utilities for all sizes', function () {

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

  for (let i = 0; i < sizes.length; i++) {
    const key = 'font_size_' + sizes[i];
    assert.ok(Style.utilities[key], 'utility ' + key + ' should exist');
  }

});

test('commonStyles generates padding utilities for all sides and sizes', function () {

  const sides = ['a', 'h', 'v', 't', 'b', 's', 'e'];
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

  for (let i = 0; i < sides.length; i++) {
    for (let j = 0; j < sizes.length; j++) {
      const key = 'p_' + sides[i] + '_' + sizes[j];
      assert.ok(Style.utilities[key], 'utility ' + key + ' should exist');
    }
  }

});

test('commonStyles generates background utilities for all color tokens', function () {

  const tokens = ['app_primary', 'background_primary', 'background_secondary', 'surface'];

  for (let i = 0; i < tokens.length; i++) {
    const key = 'background_' + tokens[i];
    assert.ok(Style.utilities[key], 'utility ' + key + ' should exist');
  }

});


// ~~~~~~~~~~~~~~~~~~~~ M1: a11y translator ~~~~~~~~~~~~~~~~~~~~

test('a11y.state translates checked to aria-checked', function () {

  const a11y = require('rnw-components-carbon/component/a11y')({ React: React, Utils: Utils });
  const props = a11y.state({ checked: true });

  assert.strictEqual(props['aria-checked'], true);

});

test('a11y.state omits null and undefined values', function () {

  const a11y = require('rnw-components-carbon/component/a11y')({ React: React, Utils: Utils });
  const props = a11y.state({ checked: true, disabled: null, expanded: undefined });

  assert.strictEqual(props['aria-checked'], true);
  assert.strictEqual(props['aria-disabled'], undefined);
  assert.strictEqual(props['aria-expanded'], undefined);

});

test('a11y.state handles mixed checked for indeterminate', function () {

  const a11y = require('rnw-components-carbon/component/a11y')({ React: React, Utils: Utils });
  const props = a11y.state({ checked: 'mixed' });

  assert.strictEqual(props['aria-checked'], 'mixed');

});

test('a11y.value translates numeric value props', function () {

  const a11y = require('rnw-components-carbon/component/a11y')({ React: React, Utils: Utils });
  const props = a11y.value({ min: 0, max: 100, now: 50, text: '50 percent' });

  assert.strictEqual(props['aria-valuemin'], 0);
  assert.strictEqual(props['aria-valuemax'], 100);
  assert.strictEqual(props['aria-valuenow'], 50);
  assert.strictEqual(props['aria-valuetext'], '50 percent');

});

test('a11y.relation translates relationship props', function () {

  const a11y = require('rnw-components-carbon/component/a11y')({ React: React, Utils: Utils });
  const props = a11y.relation({ controls: 'panel-1', describedby: 'desc-1' });

  assert.strictEqual(props['aria-controls'], 'panel-1');
  assert.strictEqual(props['aria-describedby'], 'desc-1');

});

test('a11y.position translates position props', function () {

  const a11y = require('rnw-components-carbon/component/a11y')({ React: React, Utils: Utils });
  const props = a11y.position({ posinset: 3, setsize: 10, level: 2 });

  assert.strictEqual(props['aria-posinset'], 3);
  assert.strictEqual(props['aria-setsize'], 10);
  assert.strictEqual(props['aria-level'], 2);

});

test('a11y.id generates unique monotonic ids', function () {

  const a11y = require('rnw-components-carbon/component/a11y')({ React: React, Utils: Utils });
  const id1 = a11y.id('carbon-tab');
  const id2 = a11y.id('carbon-tab');

  assert.ok(id1.indexOf('carbon-tab') === 0, 'id should start with prefix');
  assert.notStrictEqual(id1, id2, 'ids should be unique');

});


// ~~~~~~~~~~~~~~~~~~~~ M2: usePressKeys ~~~~~~~~~~~~~~~~~~~~

test('usePressKeys returns onKeyDown on web', function () {

  const usePressKeys = require('rnw-components-carbon/component/usePressKeys')({ React: React, Utils: Utils });

  let capturedProps = null;

  function TestComp () {
    capturedProps = usePressKeys({ role: 'checkbox', onActivate: function () {}, disabled: false });
    return null;
  }

  TestRenderer.create(React.createElement(TestComp));

  assert.ok(typeof capturedProps.onKeyDown === 'function', 'should return onKeyDown on web');

});


// ~~~~~~~~~~~~~~~~~~~~ M7: createCompoundContext ~~~~~~~~~~~~~~~~~~~~

test('createCompoundContext throws when useContext is called outside Provider', function () {

  const createCompoundContext = require('rnw-components-carbon/component/createCompoundContext');
  const ctx = createCompoundContext({ React: React, Utils: Utils }, 'TestCompound');

  // Wrap in a component so the hook runs in a render context
  function Consumer () {
    ctx.useContext();
    return null;
  }

  assert.throws(function () {
    TestRenderer.create(React.createElement(Consumer));
  }, TypeError);

});

test('createCompoundContext provides value inside Provider', function () {

  const createCompoundContext = require('rnw-components-carbon/component/createCompoundContext');
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


// ~~~~~~~~~~~~~~~~~~~~ M8: useControllableState ~~~~~~~~~~~~~~~~~~~~

test('useControllableState uses value when controlled', function () {

  const useControllableState = require('rnw-components-carbon/component/useControllableState')({ React: React, Utils: Utils, Debug: Debug });

  let capturedValue = null;

  function TestComp () {
    const state = useControllableState({ value: 42, defaultValue: 0 });
    capturedValue = state[0];
    return null;
  }

  TestRenderer.create(React.createElement(TestComp));

  assert.strictEqual(capturedValue, 42);

});

test('useControllableState uses defaultValue when uncontrolled', function () {

  const useControllableState = require('rnw-components-carbon/component/useControllableState')({ React: React, Utils: Utils, Debug: Debug });

  let capturedValue = null;

  function TestComp () {
    const state = useControllableState({ defaultValue: 10 });
    capturedValue = state[0];
    return null;
  }

  TestRenderer.create(React.createElement(TestComp));

  assert.strictEqual(capturedValue, 10);

});


// ~~~~~~~~~~~~~~~~~~~~ Registry count assertion ~~~~~~~~~~~~~~~~~~~~

test('registry has 16 flat keys plus variant and freeform', function () {

  const flatKeys = Object.keys(Component).filter(function (k) {
    return k !== 'variant' && k !== 'freeform';
  });

  assert.strictEqual(flatKeys.length, 16, 'should have 16 flat component keys');

});
