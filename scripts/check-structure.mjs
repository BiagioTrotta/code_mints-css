import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse((await readFile(resolve(root, 'package.json'), 'utf8')).replace(/^\uFEFF/, ''));
if (packageJson.name !== 'code_mints-css') throw new Error('package name must be code_mints-css');
const files = ['css/mint.css','css/foundation/reset.css','css/foundation/variables.css','css/foundation/colors.css','css/foundation/typography.css','css/foundation/container.css','css/foundation/grid.css','css/foundation/spacing-tokens.css','css/foundation/base.css','css/utilities/spacing.css','css/utilities/display.css','css/utilities/flex.css','css/utilities/colors.css','css/utilities/sizing.css','css/utilities/borders.css','css/utilities/text.css','css/utilities/position.css','css/utilities/visibility.css','css/components/buttons.css','css/components/cards.css','css/components/forms.css','css/components/navbar.css','css/components/badges.css','css/components/alerts.css','css/components/dropdown.css','css/components/modal.css','css/components/tables.css','css/components/pagination.css','css/components/progress.css','css/components/accordion.css','css/components/tabs.css','css/components/toast.css','examples/foundation.html','examples/components.html'];
for (const file of files) await readFile(resolve(root, file));
console.log(`Struttura CSS OK (${files.length} file).`);
