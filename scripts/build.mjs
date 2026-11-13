import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse((await readFile(join(root, 'package.json'), 'utf8')).replace(/^\uFEFF/, ''));
const cssEntry = await readFile(join(root, 'css/mint.css'), 'utf8');
const cssImports = Array.from(cssEntry.matchAll(/^\s*@import\s+url\(["']([^"']+)["']\);\s*$/gm), (match) => match[1]);
if (!cssImports.length || cssImports.length !== (cssEntry.match(/@import\s+url\(/g) || []).length) {
  throw new Error('Ogni modulo CSS deve essere dichiarato come @import url(...) in css/mint.css.');
}
const cssModules = await Promise.all(cssImports.map((path) => readFile(resolve(root, 'css', path.replace(/^\.\//, '')), 'utf8')));
const cssHeader = `/*! code_mints-css v${pkg.version} | MIT */`;
const css = `${cssHeader}\n${cssModules.join('\n')}`;
const minCss = `${cssHeader}${css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').trim()}`;

const jsFiles = [
  'js/core/registry.js',
  'js/animations/reveal.js',
  'js/animations/counter.js',
  'js/components/modal.js',
  'js/components/tabs.js',
  'js/components/toast.js',
  'js/mint.js'
];
const jsModules = await Promise.all(jsFiles.map((path) => readFile(join(root, path), 'utf8')));
const js = `${jsModules.join('\n')}`.replaceAll('"0.4.0"', JSON.stringify(pkg.version));
function minifyJavaScript(source) {
  let output = '';
  let index = 0;
  let pendingSpace = false;
  const isWord = (char) => Boolean(char && /[\w$]/.test(char));
  while (index < source.length) {
    const char = source[index];
    if (char === '"' || char === "'" || char === '`') {
      if (pendingSpace && isWord(output.at(-1))) output += ' ';
      pendingSpace = false;
      const quote = char;
      output += char;
      index += 1;
      while (index < source.length) {
        const current = source[index++];
        output += current;
        if (current === '\\' && index < source.length) output += source[index++];
        else if (current === quote) break;
      }
      continue;
    }
    if (char === '/' && source[index + 1] === '/') {
      index += 2;
      while (index < source.length && source[index] !== '\n') index += 1;
      pendingSpace = true;
      continue;
    }
    if (char === '/' && source[index + 1] === '*') {
      index += 2;
      while (index < source.length && !(source[index] === '*' && source[index + 1] === '/')) index += 1;
      index += 2;
      pendingSpace = true;
      continue;
    }
    if (/\s/.test(char)) {
      pendingSpace = true;
      index += 1;
      continue;
    }
    const previous = output.at(-1);
    if (pendingSpace && (isWord(previous) && isWord(char) || previous === '+' && char === '+' || previous === '-' && char === '-')) output += ' ';
    pendingSpace = false;
    output += char;
    index += 1;
  }
  return output.trim();
}
const jsHeader = `/*! code_mints-css v${pkg.version} | MIT */\n`;
const dist = join(root, 'dist');
await mkdir(dist, { recursive: true });
await Promise.all([
  writeFile(join(dist, 'mint.css'), css, 'utf8'),
  writeFile(join(dist, 'mint.min.css'), `${cssHeader}${minCss}\n`, 'utf8'),
  writeFile(join(dist, 'mint.js'), `${jsHeader}${js}`, 'utf8'),
  writeFile(join(dist, 'mint.min.js'), `${jsHeader}${minifyJavaScript(js)}\n`, 'utf8')
]);
console.log(`Build ${pkg.version}: ${cssImports.length} moduli CSS, ${jsFiles.length} moduli JavaScript.`);
