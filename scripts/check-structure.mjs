import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse((await readFile(resolve(root, 'package.json'), 'utf8')).replace(/^\uFEFF/, ''));
if (packageJson.name !== 'code_mints-css') throw new Error('package name must be code_mints-css');
const files = ['css/mint.css','css/foundation/reset.css','css/foundation/variables.css','css/foundation/colors.css','css/foundation/typography.css','css/foundation/container.css','css/foundation/grid.css','css/foundation/spacing-tokens.css','css/foundation/base.css','css/utilities/spacing.css','examples/foundation.html'];
for (const file of files) await readFile(resolve(root, file));
console.log(`Struttura Foundation OK (${files.length} file).`);
