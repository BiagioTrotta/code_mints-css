import { access } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const required = [
  'css/mint.css',
  'css/foundation/reset.css',
  'css/foundation/variables.css',
  'css/foundation/colors.css',
  'css/foundation/typography.css',
  'css/foundation/container.css',
  'css/foundation/grid.css',
  'css/foundation/spacing-tokens.css',
  'css/foundation/base.css',
  'css/utilities/spacing.css',
  'examples/foundation.html',
  'README.md',
  'CHANGELOG.md'
];

test('Foundation milestone files exist', async () => {
  for (const file of required) await assert.doesNotReject(access(new URL(`../${file}`, import.meta.url)), `missing ${file}`);
});
