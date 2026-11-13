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
  'css/utilities/display.css',
  'css/utilities/flex.css',
  'css/utilities/colors.css',
  'css/utilities/sizing.css',
  'css/utilities/borders.css',
  'css/utilities/text.css',
  'css/utilities/position.css',
  'css/utilities/visibility.css',
  'css/components/buttons.css',
  'css/components/cards.css',
  'css/components/forms.css',
  'css/components/navbar.css',
  'css/components/badges.css',
  'css/components/alerts.css',
  'css/components/dropdown.css',
  'css/components/modal.css',
  'css/components/tables.css',
  'css/components/pagination.css',
  'css/components/progress.css',
  'css/components/accordion.css',
  'css/components/tabs.css',
  'css/components/toast.css',
  'examples/foundation.html',
  'examples/components.html',
  'README.md',
  'CHANGELOG.md'
];

test('Foundation and Utilities milestone files exist', async () => {
  for (const file of required) await assert.doesNotReject(access(new URL(`../${file}`, import.meta.url)), `missing ${file}`);
});
