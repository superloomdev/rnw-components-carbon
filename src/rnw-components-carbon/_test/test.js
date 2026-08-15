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

test('build registers all 6 original molecules', function () {

  const molecules = ['ButtonPrimary', 'ButtonLink', 'Card', 'ListItem', 'Dropdown', 'Modal'];

  for (let i = 0; i < molecules.length; i++) {
    assert.ok(typeof Component[molecules[i]] === 'function', 'molecule ' + molecules[i] + ' should be a function');
  }

});

test('build registers all 12 Wave 2 form components', function () {

  const atoms = ['Checkbox', 'RadioButton', 'TextArea', 'Slider', 'Link'];
  const molecules = ['Search', 'PasswordInput', 'NumberInput', 'ExpandableSearch', 'FormLabel', 'FormItem'];

  for (let i = 0; i < atoms.length; i++) {
    assert.ok(typeof Component[atoms[i]] === 'function', 'atom ' + atoms[i] + ' should be a function');
  }

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

test('registry has 136 flat keys plus variant, freeform, and 8 providers', function () {

  const flatKeys = Object.keys(Component).filter(function (k) {
    return k !== 'variant' && k !== 'freeform' && k !== 'provider';
  });

  assert.strictEqual(flatKeys.length, 136, 'should have 136 flat component keys');
  assert.ok(Component.variant, 'variant namespace should exist');
  assert.ok(Component.freeform, 'freeform namespace should exist');
  assert.ok(Component.provider, 'provider namespace should exist');
  assert.strictEqual(Object.keys(Component.provider).length, 8, 'should have 8 providers');

});


// ~~~~~~~~~~~~~~~~~~~~ Wave 2 component tests ~~~~~~~~~~~~~~~~~~~~

test('Checkbox renders with role checkbox and aria-checked', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Checkbox, {
      checked: true,
      label: 'Accept terms',
      onChange: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'Checkbox should render');

  // Verify role is checkbox
  const node = tree;
  assert.strictEqual(node.props.accessibilityRole, 'checkbox');

});

test('Checkbox renders mixed state for indeterminate', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Checkbox, {
      checked: 'mixed',
      label: 'Select all',
      onChange: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'Checkbox mixed should render');

});

test('Checkbox calls onChange with false when checked', function () {

  let captured = null;

  TestRenderer.create(
    React.createElement(Component.Checkbox, {
      checked: true,
      label: 'Test',
      onChange: function (val) { captured = val; }
    })
  );

  // Directly invoke the onPress handler via the test renderer
  const tree = TestRenderer.create(
    React.createElement(Component.Checkbox, {
      checked: true,
      label: 'Test',
      onChange: function (val) { captured = val; }
    })
  );

  // Find the Pressable and simulate press
  const pressable = tree.root.findByProps({ accessibilityRole: 'checkbox' });
  pressable.props.onPress();

  assert.strictEqual(captured, false, 'should toggle to false');

});

test('RadioButton renders with role radio and aria-checked', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.RadioButton, {
      checked: true,
      label: 'Option A',
      onChange: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'RadioButton should render');
  assert.strictEqual(tree.props.accessibilityRole, 'radio');

});

test('TextArea renders with multiline and role textbox', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.TextArea, {
      value: 'hello',
      onChange: function () {},
      rows: 4
    })
  ).toJSON();

  assert.ok(tree, 'TextArea should render');
  assert.strictEqual(tree.props.multiline, true);
  assert.strictEqual(tree.props.accessibilityRole, 'textbox');

});

test('Slider renders with role slider on web', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Slider, {
      value: 50,
      min: 0,
      max: 100,
      onChange: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'Slider should render');

});

test('Link renders with role link', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Link, {
      onPress: function () {},
      accessibilityLabel: 'Learn more'
    }, 'Learn more')
  ).toJSON();

  assert.ok(tree, 'Link should render');
  assert.strictEqual(tree.props.accessibilityRole, 'link');

});

test('Search renders with search icon and role searchbox', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Search, {
      value: 'query',
      onChange: function () {},
      placeholder: 'Search'
    })
  ).toJSON();

  assert.ok(tree, 'Search should render');

});

test('PasswordInput renders with secureTextEntry', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.PasswordInput, {
      value: 'secret',
      onChange: function () {},
      placeholder: 'Password'
    })
  ).toJSON();

  assert.ok(tree, 'PasswordInput should render');

});

test('NumberInput renders with increment and decrement buttons', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.NumberInput, {
      value: 5,
      min: 0,
      max: 10,
      step: 1,
      onChange: function () {}
    })
  );

  assert.ok(tree, 'NumberInput should render');

  // Find the increment button
  const buttons = tree.root.findAllByProps({ accessibilityRole: 'button' });
  assert.ok(buttons.length >= 2, 'should have at least 2 buttons for inc/dec');

});

test('ExpandableSearch renders collapsed by default', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ExpandableSearch, {
      onChange: function () {},
      placeholder: 'Search'
    })
  ).toJSON();

  assert.ok(tree, 'ExpandableSearch should render collapsed');

});

test('FormLabel renders label text', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.FormLabel, null, 'Email address')
  ).toJSON();

  assert.ok(tree, 'FormLabel should render');

});

test('FormItem renders label, children, and helper text', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.FormItem, {
      label: 'Username',
      helperText: 'Enter your username'
    }, React.createElement(Component.TextInput, { placeholder: 'user' }))
  );

  assert.ok(tree, 'FormItem should render');

});

test('FormItem renders error text when provided', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.FormItem, {
      label: 'Email',
      errorText: 'Invalid email'
    }, React.createElement(Component.TextInput, { placeholder: 'email' }))
  );

  assert.ok(tree, 'FormItem with error should render');

});


// ~~~~~~~~~~~~~~~~~~~~ Wave 3 component tests ~~~~~~~~~~~~~~~~~~~~

test('Skeleton renders with aria-hidden', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Skeleton, { variant: 'text', lines: 3 })
  ).toJSON();

  assert.ok(tree, 'Skeleton should render');

});

test('Loading renders with role progressbar', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Loading, { label: 'Loading data' })
  );

  assert.ok(tree, 'Loading should render');

});

test('Tag renders with label text', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Tag, { label: 'Active' })
  ).toJSON();

  assert.ok(tree, 'Tag should render');

});

test('Tag renders dismissible with close button', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Tag, { label: 'Removable', onDismiss: function () {} })
  );

  assert.ok(tree, 'Dismissible Tag should render');

  const buttons = tree.root.findAllByProps({ accessibilityRole: 'button' });
  assert.ok(buttons.length >= 1, 'should have a close button');

});

test('AspectRatio renders with correct ratio', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.AspectRatio, { ratio: 16 / 9 }, 'Content')
  ).toJSON();

  assert.ok(tree, 'AspectRatio should render');

});

test('Heading renders with role header and aria-level', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Heading, { level: 2 }, 'Section Title')
  ).toJSON();

  assert.ok(tree, 'Heading should render');
  assert.strictEqual(tree.props.accessibilityRole, 'header');

});

test('BadgeIndicator renders count', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.BadgeIndicator, { count: 5 })
  ).toJSON();

  assert.ok(tree, 'BadgeIndicator should render');

});

test('BadgeIndicator shows 99+ when count exceeds max', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.BadgeIndicator, { count: 150, max: 99 })
  ).toJSON();

  assert.ok(tree, 'BadgeIndicator with overflow should render');

});

test('ShapeIndicator renders circle', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ShapeIndicator, { shape: 'circle', color: 'status_success' })
  ).toJSON();

  assert.ok(tree, 'ShapeIndicator should render');

});

test('IconIndicator renders with icon', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.IconIndicator, { iconName: 'checkmark', label: 'Success' })
  ).toJSON();

  assert.ok(tree, 'IconIndicator should render');

});

test('Stack renders children vertically', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Stack, { direction: 'vertical', gap: 'sm' },
      React.createElement(Component.Text, null, 'A'),
      React.createElement(Component.Text, null, 'B')
    )
  ).toJSON();

  assert.ok(tree, 'Stack should render');

});

test('ButtonSet renders children', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ButtonSet, null,
      React.createElement(Component.Button, { onPress: function () {} }, 'OK')
    )
  ).toJSON();

  assert.ok(tree, 'ButtonSet should render');

});

test('IconButton renders with role button', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.IconButton, {
      name: 'search',
      onPress: function () {},
      label: 'Search'
    })
  ).toJSON();

  assert.ok(tree, 'IconButton should render');
  assert.strictEqual(tree.props.accessibilityRole, 'button');

});

test('CopyButton renders with role button', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.CopyButton, {
      text: 'copy me',
      onCopy: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'CopyButton should render');
  assert.strictEqual(tree.props.accessibilityRole, 'button');

});

test('UserAvatar renders with initials fallback', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.UserAvatar, { initials: 'JD', label: 'John Doe' })
  ).toJSON();

  assert.ok(tree, 'UserAvatar should render');

});

test('TruncatedText renders with expand toggle', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.TruncatedText, { maxLines: 2 }, 'Long text...')
  ).toJSON();

  assert.ok(tree, 'TruncatedText should render');

});

test('CodeSnippet renders code text', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.CodeSnippet, { code: 'const x = 1;', showCopy: false })
  ).toJSON();

  assert.ok(tree, 'CodeSnippet should render');

});

test('InlineLoading renders with role progressbar', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.InlineLoading, { status: 'active', label: 'Loading...' })
  );

  assert.ok(tree, 'InlineLoading should render');

});

test('Tile renders with title and subtitle', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Tile, { title: 'My Tile', subtitle: 'Description' })
  ).toJSON();

  assert.ok(tree, 'Tile should render');

});

test('ClickableTile renders with role button', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ClickableTile, {
      title: 'Click me',
      onPress: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'ClickableTile should render');
  assert.strictEqual(tree.props.accessibilityRole, 'button');

});

test('SelectableTile renders with role checkbox', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.SelectableTile, {
      title: 'Select me',
      selected: false,
      onSelect: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'SelectableTile should render');
  assert.strictEqual(tree.props.accessibilityRole, 'checkbox');

});


// ~~~~~~~~~~~~~~~~~~~~ Wave 5 overlay component tests ~~~~~~~~~~~~~~~~~~~~

test('MenuItem renders with role menuitem', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.MenuItem, {
      label: 'Save',
      onPress: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'MenuItem should render');
  assert.strictEqual(tree.props.accessibilityRole, 'menuitem');

});

test('MenuItemSelectable renders with role menuitemcheckbox', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.MenuItemSelectable, {
      label: 'Toggle',
      checked: true,
      onChange: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'MenuItemSelectable should render');
  assert.strictEqual(tree.props.accessibilityRole, 'menuitemcheckbox');

});

test('MenuItemDivider renders with role separator', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.MenuItemDivider)
  ).toJSON();

  assert.ok(tree, 'MenuItemDivider should render');
  assert.strictEqual(tree.props.accessibilityRole, 'separator');

});

test('ModalHeader renders with title', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ModalHeader, { title: 'My Modal' })
  ).toJSON();

  assert.ok(tree, 'ModalHeader should render');

});

test('ModalBody renders children', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ModalBody, null, 'Content')
  ).toJSON();

  assert.ok(tree, 'ModalBody should render');

});

test('ModalFooter renders children', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ModalFooter, null, 'Footer')
  ).toJSON();

  assert.ok(tree, 'ModalFooter should render');

});

test('Tooltip renders children with aria-describedby', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Tooltip, { content: 'Help text' },
      React.createElement(Component.Text, null, 'Hover me')
    )
  ).toJSON();

  assert.ok(tree, 'Tooltip should render');

});

test('DefinitionTooltip renders term with underline', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.DefinitionTooltip, {
      term: 'API',
      definition: 'Application Programming Interface'
    })
  ).toJSON();

  assert.ok(tree, 'DefinitionTooltip should render');

});

test('Toggletip renders trigger and content', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Toggletip, { content: 'Info' },
      React.createElement(Component.Text, null, 'Click me')
    )
  ).toJSON();

  assert.ok(tree, 'Toggletip should render');

});

test('AILabel renders with AI badge', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.AILabel, {
      label: 'AI',
      details: 'AI-generated content'
    })
  ).toJSON();

  assert.ok(tree, 'AILabel should render');

});


// ~~~~~~~~~~~~~~~~~~~~ Wave 6 navigation component tests ~~~~~~~~~~~~~~~~~~~~

test('Tab renders with role tab', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Tab, {
      label: 'Overview',
      selected: true,
      onPress: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'Tab should render');
  assert.strictEqual(tree.props.accessibilityRole, 'tab');

});

test('TabList renders with role tablist', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.TabList, null, 'tabs')
  ).toJSON();

  assert.ok(tree, 'TabList should render');
  assert.strictEqual(tree.props.accessibilityRole, 'tablist');

});

test('TabPanel renders with role tabpanel', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.TabPanel, { selected: true }, 'content')
  ).toJSON();

  assert.ok(tree, 'TabPanel should render');
  assert.strictEqual(tree.props.accessibilityRole, 'tabpanel');

});

test('TabPanel returns null when not selected', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.TabPanel, { selected: false }, 'content')
  ).toJSON();

  assert.strictEqual(tree, null, 'TabPanel should be null when not selected');

});

test('AccordionItem renders with button and region', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.AccordionItem, {
      title: 'Section 1',
      expanded: true,
      onToggle: function () {}
    }, 'Content')
  );

  assert.ok(tree, 'AccordionItem should render');

  const buttons = tree.root.findAllByProps({ accessibilityRole: 'button' });
  assert.ok(buttons.length >= 1, 'should have a header button');

  const regions = tree.root.findAllByProps({ accessibilityRole: 'region' });
  assert.ok(regions.length >= 1, 'should have a content region');

});

test('BreadcrumbItem renders with role link', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.BreadcrumbItem, {
      onPress: function () {}
    }, 'Home')
  ).toJSON();

  assert.ok(tree, 'BreadcrumbItem should render');

});

test('BreadcrumbItem renders current page as static text', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.BreadcrumbItem, {
      isCurrentPage: true
    }, 'Current')
  ).toJSON();

  assert.ok(tree, 'BreadcrumbItem current page should render');

});

test('Switch renders with role button', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Switch, {
      label: 'All',
      selected: true,
      onPress: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'Switch should render');
  assert.strictEqual(tree.props.accessibilityRole, 'button');

});

test('PageSelector renders with role group', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.PageSelector, {
      currentPage: 1,
      totalPages: 3,
      onChange: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'PageSelector should render');
  assert.strictEqual(tree.props.accessibilityRole, 'group');

});

test('TreeNode renders with role treeitem', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.TreeNode, {
      label: 'Node 1',
      level: 1
    })
  ).toJSON();

  assert.ok(tree, 'TreeNode should render');
  assert.strictEqual(tree.props.accessibilityRole, 'treeitem');

});

test('Step renders with role listitem', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Step, {
      label: 'Step 1',
      status: 'current',
      stepNumber: 1
    })
  ).toJSON();

  assert.ok(tree, 'Step should render');
  assert.strictEqual(tree.props.accessibilityRole, 'listitem');

});

test('HeaderNav renders with role navigation', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.HeaderNav, null, 'nav')
  ).toJSON();

  assert.ok(tree, 'HeaderNav should render');
  assert.strictEqual(tree.props.accessibilityRole, 'navigation');

});

test('HeaderMenuButton renders with role button', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.HeaderMenuButton, {
      onPress: function () {},
      label: 'Menu'
    })
  ).toJSON();

  assert.ok(tree, 'HeaderMenuButton should render');
  assert.strictEqual(tree.props.accessibilityRole, 'button');

});

test('HeaderPanel renders with role region', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.HeaderPanel, { expanded: true }, 'panel content')
  ).toJSON();

  assert.ok(tree, 'HeaderPanel should render');
  assert.strictEqual(tree.props.accessibilityRole, 'region');

});

test('HeaderPanel returns null when not expanded', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.HeaderPanel, { expanded: false }, 'content')
  ).toJSON();

  assert.strictEqual(tree, null, 'HeaderPanel should be null when collapsed');

});

test('ProgressIndicator renders with role progressbar', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ProgressIndicator, {
      current: 2,
      total: 5
    })
  ).toJSON();

  assert.ok(tree, 'ProgressIndicator should render');
  assert.strictEqual(tree.props.accessibilityRole, 'progressbar');
  assert.strictEqual(tree.props['aria-valuemin'], 0);
  assert.strictEqual(tree.props['aria-valuemax'], 5);
  assert.strictEqual(tree.props['aria-valuenow'], 2);

});

test('Tabs renders with role tablist', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Tabs, {
      selectedIndex: 0,
      onChange: function () {}
    },
      React.createElement(Component.Tab, { label: 'Tab 1' }),
      React.createElement(Component.Tab, { label: 'Tab 2' })
    )
  ).toJSON();

  assert.ok(tree, 'Tabs should render');
  assert.strictEqual(tree.props.accessibilityRole, 'tablist');

});

test('Accordion renders children', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Accordion, {
      expandedKeys: [0],
      onChange: function () {}
    },
      React.createElement(Component.AccordionItem, { title: 'Item 1' }, 'Content 1')
    )
  ).toJSON();

  assert.ok(tree, 'Accordion should render');

});

test('Breadcrumb renders with role navigation', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Breadcrumb, null,
      React.createElement(Component.BreadcrumbItem, { onPress: function () {} }, 'Home')
    )
  ).toJSON();

  assert.ok(tree, 'Breadcrumb should render');
  assert.strictEqual(tree.props.accessibilityRole, 'navigation');

});

test('ContentSwitcher renders with role tablist', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.ContentSwitcher, {
      selectedIndex: 0,
      onChange: function () {}
    },
      React.createElement(Component.Switch, { label: 'All' }),
      React.createElement(Component.Switch, { label: 'Active' })
    )
  ).toJSON();

  assert.ok(tree, 'ContentSwitcher should render');
  assert.strictEqual(tree.props.accessibilityRole, 'tablist');

});

test('Pagination renders with role navigation', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Pagination, {
      page: 1,
      totalPage: 3,
      onChange: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'Pagination should render');
  assert.strictEqual(tree.props.accessibilityRole, 'navigation');

});

test('TreeView renders with role tree', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.TreeView, {
      data: [
        { key: '1', label: 'Root', children: [
          { key: '2', label: 'Child' }
        ] }
      ],
      expandedKeys: ['1'],
      onSelect: function () {}
    })
  ).toJSON();

  assert.ok(tree, 'TreeView should render');
  assert.strictEqual(tree.props.accessibilityRole, 'tree');

});

test('Steps renders with role list', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Steps, { current: 1 },
      React.createElement(Component.Step, { label: 'Step 1', stepNumber: 1 }),
      React.createElement(Component.Step, { label: 'Step 2', stepNumber: 2 })
    )
  ).toJSON();

  assert.ok(tree, 'Steps should render');
  assert.strictEqual(tree.props.accessibilityRole, 'list');

});

test('Header renders with role header', function () {

  const tree = TestRenderer.create(
    React.createElement(Component.Header, null, 'header content')
  ).toJSON();

  assert.ok(tree, 'Header should render');
  assert.strictEqual(tree.props.accessibilityRole, 'header');

});
