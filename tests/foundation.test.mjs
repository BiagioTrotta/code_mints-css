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
  assert.match(grid, /grid-column: auto \/ span 12/);
  assert.match(grid, /grid-template-columns: repeat\(auto-fit, minmax\(min\(100%, 15rem\), 1fr\)\)/);
  for (const cls of ['.col-12', '.col-sm-6', '.col-md-6', '.col-lg-4', '.col-xl-3', '.col-xxl-2', '.offset-md-3', '.order-md-1']) assert.ok(grid.includes(cls), `missing ${cls}`);
  assert.match(grid, /\.col \{ grid-column: auto; \}/);
});

test('spacing scale has the requested values and essential direction utilities', async () => {
  const tokens = await css('../css/foundation/spacing-tokens.css');
  const utilities = await css('../css/utilities/spacing.css');
  for (const value of ['.25rem', '.5rem', '1rem', '1.5rem', '3rem']) assert.ok(tokens.includes(value));
  for (const cls of ['.m-1', '.mt-2', '.mb-3', '.ms-4', '.me-5', '.mx-auto', '.p-1', '.px-2', '.py-3']) assert.ok(utilities.includes(cls));
});


test('utilities provide core display, flex, color, sizing, border, text and visibility classes', async () => {
  const cases = [
    ['display.css', ['.d-none', '.d-grid', '.d-flex']],
    ['flex.css', ['.flex-row', '.justify-content-between', '.align-items-center', '.gap-5']],
    ['colors.css', ['.text-body', '.text-success', '.bg-surface', '.bg-primary']],
    ['sizing.css', ['.w-100', '.h-auto', '.min-vh-100']],
    ['borders.css', ['.border', '.rounded-xl', '.shadow-sm']],
    ['text.css', ['.text-center', '.fw-semibold', '.font-monospace', '.fs-1']],
    ['position.css', ['.position-sticky', '.start-0', '.z-3']],
    ['visibility.css', ['.visually-hidden', '.invisible']]
  ];
  for (const [file, selectors] of cases) {
    const source = await css(`../css/utilities/${file}`);
    for (const selector of selectors) assert.ok(source.includes(selector), `${file} missing ${selector}`);
  }
  const entry = await css('../css/mint.css');
  for (const [file] of cases) assert.ok(entry.includes(`./utilities/${file}`), `mint.css does not load ${file}`);
});

test('UI component modules are loaded and expose documented core selectors', async () => {
  const cases = [
    ['buttons.css', ['.btn', '.btn-danger', '.btn-loading']],
    ['cards.css', ['.card', '.card-body', '.card-hover']],
    ['forms.css', ['.form-control', '.form-error', '.form-check']],
    ['navbar.css', ['.navbar', '.navbar-link']],
    ['badges.css', ['.badge', '.badge-success']],
    ['alerts.css', ['.alert', '.alert-danger']],
    ['dropdown.css', ['.dropdown[open]', '.dropdown-menu', '.dropdown-item']],
    ['modal.css', ['.modal', '.modal::backdrop']],
    ['tables.css', ['.table', '.table-responsive']],
    ['pagination.css', ['.pagination', '.page-link']],
    ['progress.css', ['progress.progress', '.progress-lg']],
    ['accordion.css', ['.accordion', '.accordion-trigger', '.accordion-panel']],
    ['tabs.css', ['.tabs-list', '.tab[aria-selected="true"]', '.tab-panel']],
    ['toast.css', ['.toast-container', '.toast', '.toast-info']]
  ];
  const entry = await css('../css/mint.css');
  for (const [file, selectors] of cases) {
    const source = await css(`../css/components/${file}`);
    assert.ok(entry.includes(`./components/${file}`), `mint.css does not load ${file}`);
    for (const selector of selectors) assert.ok(source.includes(selector), `${file} missing ${selector}`);
  }
});

test('semantic badge pairs meet 4.5:1 contrast in both themes', async () => {
  const colors = await css('../css/foundation/colors.css');
  const luminance = (hex) => {
    const [r, g, b] = hex.match(/[\da-f]{2}/gi).map((v) => parseInt(v, 16) / 255).map((v) => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
    return .2126 * r + .7152 * g + .0722 * b;
  };
  const contrast = (a, b) => { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const palettes = [
    ['#19704d', '#d8f3e3', '#8ee2b4', '#174832'],
    ['#8a5200', '#fff0cc', '#ffd080', '#51390d'],
    ['#b42318', '#fde4e1', '#ff9d91', '#4e201d'],
    ['#155e75', '#d9f0f5', '#8bd8ed', '#163c49']
  ];
  for (const [lightText, lightBg, darkText, darkBg] of palettes) {
    assert.ok(contrast(lightText, lightBg) >= 4.5);
    assert.ok(contrast(darkText, darkBg) >= 4.5);
    assert.ok(colors.toLowerCase().includes(lightBg.slice(1)));
    assert.ok(colors.toLowerCase().includes(darkBg.slice(1)));
  }
});
