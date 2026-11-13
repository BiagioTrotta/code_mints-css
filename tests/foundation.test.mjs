import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const css = async (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('brand and semantic design tokens are defined with separate light/dark themes', async () => {
  const vars = await css('../css/foundation/variables.css');
  const colors = await css('../css/foundation/colors.css');
  for (const token of ['--mint-navy', '--mint-slate', '--mint-green', '--mint-ivory', '--mint-gray', '--mint-coral']) assert.match(vars, new RegExp(token));
  assert.match(colors, /\[data-theme="light"\]/);
  assert.match(colors, /\[data-theme="dark"\]/);
  assert.match(colors, /--mint-bg:\s*var\(--mint-navy\)/);
  assert.match(vars, /--mint-green:\s*#70e1c1/i);
});

test('reset, typography and keyboard focus foundation are present', async () => {
  assert.match(await css('../css/foundation/reset.css'), /box-sizing:\s*border-box/);
  const type = await css('../css/foundation/typography.css');
  for (const size of ['2.5rem', '2rem', '1.75rem', '1.5rem', '1.25rem', '.875rem']) assert.ok(type.includes(size));
  assert.match(await css('../css/foundation/base.css'), /:focus-visible/);
});

test('container widths and mobile-first breakpoint grid cover all sizes', async () => {
  const container = await css('../css/foundation/container.css');
  const grid = await css('../css/foundation/grid.css');
  for (const bp of ['576px', '768px', '992px', '1200px', '1400px']) {
    assert.ok(container.includes(bp));
    assert.ok(grid.includes(bp));
  }
  assert.match(container, /--mint-container-xxl/);
  assert.match(grid, /grid-template-columns:\s*repeat\(12, minmax\(0, 1fr\)\)/);
  for (const cls of ['.col-12', '.col-sm-6', '.col-md-6', '.col-lg-4', '.col-xl-3', '.col-xxl-2', '.offset-md-3', '.order-md-1']) assert.ok(grid.includes(cls), `missing ${cls}`);
  assert.match(grid, /\.col \{ grid-column: auto; \}/);
});

test('spacing scale has the requested values and essential direction utilities', async () => {
  const tokens = await css('../css/foundation/spacing-tokens.css');
  const utilities = await css('../css/utilities/spacing.css');
  for (const value of ['.25rem', '.5rem', '1rem', '1.5rem', '3rem']) assert.ok(tokens.includes(value));
  for (const cls of ['.m-1', '.mt-2', '.mb-3', '.ms-4', '.me-5', '.mx-auto', '.p-1', '.px-2', '.py-3']) assert.ok(utilities.includes(cls));
});

