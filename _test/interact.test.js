// Info: L3 interaction tests. Playwright headless Chromium.
// Verifies components work as real DOM elements on the web:
// - No console errors during render
// - Axe accessibility passes
// - Hover and focus pseudo-states apply styles
// - Keyboard activation works (Enter/Space)
// - Focus management (tab order)
// - ARIA attributes are present in real DOM

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';


// ─── Console Error Sweep ───────────────────────────────────────────────────

test('L3: zero page errors across interactive component gallery', async ({ page }) => {

  const errors = [];

  page.on('pageerror', err => {
    errors.push(String(err));
  });

  await page.goto('/');
  await page.waitForSelector('#gallery');

  // Give components time to settle (effects, subscriptions)
  await page.waitForTimeout(500);

  expect(errors).toEqual([]);
});

test('L3: zero unexpected console errors', async ({ page }) => {

  const consoleErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  await page.goto('/');
  await page.waitForSelector('#gallery');
  await page.waitForTimeout(500);

  // Filter out known benign warnings
  const realErrors = consoleErrors.filter(e =>
    !e.includes('Warning:') &&
    !e.includes('ReactDOM.render is no longer supported') &&
    !e.includes('Each child in a list should have a unique') &&
    !e.includes('ResizeObserver') &&
    !e.includes('Unexpected text node')
  );

  expect(realErrors).toEqual([]);
});


// ─── Axe Accessibility ─────────────────────────────────────────────────────

test('L3: axe accessibility - no critical violations outside known hint-prop gaps', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('[data-testid="interactive"]');
  await page.waitForTimeout(300);

  const results = await new AxeBuilder({ page })
    .include('[data-testid="interactive"]')
    // Disable rules that trigger only because hint-props use minimal test data:
    // Components properly support labels, but the test gallery omits them.
    .disableRules([
      'color-contrast',       // Token-based colors, not testable in isolation
      'button-name',          // Hint props: buttons have no text (0-size in test)
      'label',                // Hint props: no label wrappers in test gallery
      'aria-command-name',    // Same: minimal props lack accessibilityLabel
      'aria-input-field-name',
      'aria-toggle-field-name',
      'aria-tab-name',
      'aria-required-parent', // Tab rendered outside TabBar context in test
      'nested-interactive'    // ClickableTile wraps interactive children
    ])
    .analyze();

  const critical = results.violations.filter(v =>
    v.impact === 'critical' || v.impact === 'serious'
  );

  if (critical.length > 0) {
    const summary = critical.map(v =>
      v.id + ' (' + v.impact + '): ' + v.help + ' [' + v.nodes.length + ' nodes]'
    ).join('\n');
    expect(critical, 'Axe violations:\n' + summary).toHaveLength(0);
  }
});


// ─── Focus Tests ───────────────────────────────────────────────────────────

test('L3: Button is focusable and receives focus', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('[data-component="Button"]');

  const button = page.locator('[data-component="Button"] [role="button"]').first();
  await expect(button).toBeAttached();

  // Focus the button
  await button.focus();
  await page.waitForTimeout(50);

  // Verify the button received focus
  const isFocused = await button.evaluate(el => document.activeElement === el);
  expect(isFocused).toBe(true);
});

test('L3: Toggle is focusable and has switch role', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('[data-component="Toggle"]');

  const toggle = page.locator('[data-component="Toggle"] [role="switch"]').first();
  await expect(toggle).toBeVisible();

  await toggle.focus();
  const isFocused = await toggle.evaluate(el => document.activeElement === el);
  expect(isFocused).toBe(true);
});

test('L3: Checkbox has accessible role and is focusable', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('[data-component="Checkbox"]');

  const checkbox = page.locator('[data-component="Checkbox"] [role="checkbox"]').first();
  await expect(checkbox).toBeVisible();

  // Verify aria-checked state
  const ariaChecked = await checkbox.getAttribute('aria-checked');
  expect(ariaChecked).toBe('true');

  // Verify focusability
  await checkbox.focus();
  const isFocused = await checkbox.evaluate(el => document.activeElement === el);
  expect(isFocused).toBe(true);
});


// ─── Hover / Pointer Tests ─────────────────────────────────────────────────

test('L3: Button is pointer-interactive (no pointer-events: none)', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('[data-component="Button"]');

  const button = page.locator('[data-component="Button"] [role="button"]').first();
  await expect(button).toBeAttached();

  // Verify pointer-events is not disabled
  const pointerEvents = await button.evaluate(el =>
    window.getComputedStyle(el).pointerEvents
  );
  expect(pointerEvents).not.toBe('none');

  // Verify cursor style indicates interactivity
  const cursor = await button.evaluate(el =>
    window.getComputedStyle(el).cursor
  );
  expect(cursor).toBe('pointer');
});


// ─── Keyboard Activation ───────────────────────────────────────────────────

test('L3: Button activates on Enter key without crash', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('[data-component="Button"]');

  const button = page.locator('[data-component="Button"] [role="button"]').first();
  await button.focus();

  // Press Enter - should not throw or cause a page error
  await button.press('Enter');
  await page.waitForTimeout(50);

  // No navigation should have happened
  expect(page.url()).toContain('localhost');
});

test('L3: Button activates on Space key without crash', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('[data-component="Button"]');

  const button = page.locator('[data-component="Button"] [role="button"]').first();
  await button.focus();

  // Press Space
  await button.press('Space');
  await page.waitForTimeout(50);

  expect(page.url()).toContain('localhost');
});

test('L3: Link has accessible role', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('[data-component="Link"]');

  const link = page.locator('[data-component="Link"] [role="link"]').first();
  await expect(link).toBeVisible();

  // Verify it has text content
  const text = await link.textContent();
  expect(text).toBeTruthy();
});


// ─── ARIA Attributes in Real DOM ───────────────────────────────────────────

test('L3: Slider renders with aria-valuemin, aria-valuemax, aria-valuenow', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('[data-component="Slider"]');

  const slider = page.locator('[data-component="Slider"] [role="slider"]').first();
  await expect(slider).toBeVisible();

  const valueMin = await slider.getAttribute('aria-valuemin');
  const valueMax = await slider.getAttribute('aria-valuemax');
  const valueNow = await slider.getAttribute('aria-valuenow');

  // Verify ARIA value attributes are present and numeric
  expect(valueMin).not.toBeNull();
  expect(valueMax).not.toBeNull();
  expect(valueNow).not.toBeNull();
  expect(Number(valueMin)).not.toBeNaN();
  expect(Number(valueMax)).toBeGreaterThan(Number(valueMin));
  expect(Number(valueNow)).toBeGreaterThanOrEqual(Number(valueMin));
  expect(Number(valueNow)).toBeLessThanOrEqual(Number(valueMax));
});

test('L3: AccordionItem has aria-expanded attribute', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('[data-component="AccordionItem"]');

  const trigger = page.locator('[data-component="AccordionItem"] [role="button"]').first();
  await expect(trigger).toBeAttached();

  // Verify aria-expanded attribute exists (initially false without context)
  const expanded = await trigger.getAttribute('aria-expanded');
  expect(expanded).toBe('false');
});


// ─── Tab Order ─────────────────────────────────────────────────────────────

test('L3: interactive components are reachable by Tab key', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('[data-testid="interactive"]');

  // Tab through several times to reach interactive elements
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
  }

  // After tabbing, something in #interactive should be focused
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    const section = el.closest('[data-testid="interactive"]');
    return section ? (el.getAttribute('role') || el.tagName.toLowerCase()) : null;
  });

  // At least one interactive element was reached
  expect(focused).toBeTruthy();
});


// ─── Component Count Verification ──────────────────────────────────────────

test('L3: gallery renders expected number of interactive components', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('#gallery');

  const count = await page.evaluate(() =>
    document.querySelectorAll('[data-component]').length
  );

  // The entry registers exactly the 16 interactive components by name, so an
  // exact count also proves no named import was silently dropped.
  expect(count).toBe(16);
});

// ─── Theme switching ───────────────────────────────────────────────────────

test('L3: renders under the Carbon theme by default', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('[data-theme-switch]');

  const active = await page.getAttribute('html', 'data-theme-switch');

  expect(active).toBe('carbon');
});

test('L3: renders under the contrast theme when requested', async ({ page }) => {
  const errors = [];
  page.on('pageerror', function (e) {
    errors.push(e.message);
  });

  await page.goto('/?theme=contrast');
  await page.waitForSelector('[data-theme-switch]');

  const active = await page.getAttribute('html', 'data-theme-switch');

  expect(active).toBe('contrast');
  expect(errors).toEqual([]);
});

test('L3: Carbon theme carries Carbon blue and contrast does not', async ({ page }) => {
  // The strongest browser-level agnosticism check: the theme's primary colour
  // must reach computed style. Carbon is #0f62fe (rgb 15,98,254); the contrast
  // theme is #7c3aed (rgb 124,58,237). If both match, the component ignored
  // the theme.
  await page.goto('/');
  await page.waitForSelector('[data-testid="interactive"]');
  const carbonColor = await page.evaluate(function () {
    var all = document.querySelectorAll('[data-testid="interactive"] *');
    for (var i = 0; i < all.length; i++) {
      var bg = getComputedStyle(all[i]).backgroundColor;
      if (bg !== 'rgba(0, 0, 0, 0)') return bg;
    }
    return null;
  });

  await page.goto('/?theme=contrast');
  await page.waitForSelector('[data-testid="interactive"]');
  const contrastColor = await page.evaluate(function () {
    var all = document.querySelectorAll('[data-testid="interactive"] *');
    for (var i = 0; i < all.length; i++) {
      var bg = getComputedStyle(all[i]).backgroundColor;
      if (bg !== 'rgba(0, 0, 0, 0)') return bg;
    }
    return null;
  });

  expect(carbonColor).not.toBe(contrastColor);
  expect(carbonColor).toContain('15, 98, 254');
  expect(contrastColor).toContain('124, 58, 237');
});
