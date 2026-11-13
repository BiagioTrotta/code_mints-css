import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const sources = [
  '../js/core/registry.js',
  '../js/animations/reveal.js',
  '../js/animations/counter.js',
  '../js/components/modal.js',
  '../js/components/tabs.js',
  '../js/components/toast.js',
  '../js/mint.js'
];

test('JavaScript Engine files parse without external dependencies', async () => {
  for (const source of sources) {
    const path = new URL(source, import.meta.url);
    const result = spawnSync(process.execPath, ['--check', fileURLToPath(path)], { encoding: 'utf8' });
    assert.equal(result.status, 0, `${source}: ${result.stderr}`);
  }
});

test('Mint exposes manual idempotent initialization and individual component setup', async () => {
  const document = { nodeType: 9, querySelectorAll() { return []; }, querySelector() { return null; } };
  const window = { document };
  const context = vm.createContext({ window });
  for (const source of sources) vm.runInContext(await readFile(new URL(source, import.meta.url), 'utf8'), context);
  const Mint = window.Mint;
  assert.equal(Mint.version, '0.4.0');
  assert.deepEqual(Array.from(Mint.components()).sort(), ['counter', 'modal', 'reveal', 'tabs', 'toast']);
  assert.equal(Mint.init(), Mint);
  assert.equal(Mint.init(), Mint);
  assert.equal(Mint.initComponent('tabs'), true);
  assert.equal(Mint.initComponent('missing'), false);
});

test('advanced CSS includes responsive utilities and reduced-motion fallbacks', async () => {
  const responsive = await readFile(new URL('../css/advanced/responsive.css', import.meta.url), 'utf8');
  const animations = await readFile(new URL('../css/advanced/animations.css', import.meta.url), 'utf8');
  for (const breakpoint of ['sm', 'md', 'lg', 'xl', 'xxl']) assert.ok(responsive.includes(`.d-${breakpoint}-flex`));
  for (const animation of ['fade', 'fade-up', 'fade-down', 'slide-up', 'slide-down', 'zoom', 'pulse', 'spin', 'bounce']) assert.ok(animations.includes(`.animate-${animation}`));
  assert.match(animations, /prefers-reduced-motion:\s*reduce/);
});

test('distribution contains complete reproducible CSS and JS bundles', async () => {
  const fullCss = await readFile(new URL('../dist/mint.css', import.meta.url), 'utf8');
  const minCss = await readFile(new URL('../dist/mint.min.css', import.meta.url), 'utf8');
  const fullJs = await readFile(new URL('../dist/mint.js', import.meta.url), 'utf8');
  const minJs = await readFile(new URL('../dist/mint.min.js', import.meta.url), 'utf8');
  assert.doesNotMatch(fullCss, /@import\s/);
  assert.doesNotMatch(minCss, /@import\s/);
  assert.match(fullCss, /\.btn\s*\{/);
  assert.match(fullCss, /--mint-navy:\s*#101820/);
  assert.match(fullJs, /Mint\.init/);
  assert.match(minJs, /Mint\.toast/);
  assert.ok(minCss.length < fullCss.length);
  assert.ok(minJs.length < fullJs.length);
  for (const file of ['mint.js', 'mint.min.js']) {
    const path = new URL(`../dist/${file}`, import.meta.url);
    const result = spawnSync(process.execPath, ['--check', fileURLToPath(path)], { encoding: 'utf8' });
    assert.equal(result.status, 0, `${file}: ${result.stderr}`);
  }
  const before = [fullCss, minCss, fullJs, minJs];
  const build = spawnSync(process.execPath, [fileURLToPath(new URL('../scripts/build.mjs', import.meta.url))], { encoding: 'utf8' });
  assert.equal(build.status, 0, build.stderr);
  const after = await Promise.all(['mint.css', 'mint.min.css', 'mint.js', 'mint.min.js'].map((name) => readFile(new URL(`../dist/${name}`, import.meta.url), 'utf8')));
  assert.deepEqual(after, before, 'the build must be deterministic');
});
