// Small source check with no extra packages. Fails on leftovers that must never
// reach the site. Type and template errors are caught by `astro check`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/', import.meta.url));
const rules = [
  { re: /\bDRAFT\s*\(/, why: 'DRAFT(...) stand-in left in the source' },
  { re: /lorem ipsum/i, why: 'placeholder text' },
  { re: /\bhref=["']#["']/, why: 'dead link (href="#")' },
  { re: /\bconsole\.log\(/, why: 'console.log left in the source' },
];

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    if (name.startsWith('.')) return []; // tool folders such as src/.claude
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return files(p);
    return ['.astro', '.ts', '.css'].includes(extname(p)) ? [p] : [];
  });
}

let problems = 0;
for (const file of files(root)) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const { re, why } of rules) {
      if (re.test(line)) {
        console.error(`${file.slice(root.length - 4)}:${i + 1}: ${why}`);
        problems += 1;
      }
    }
  });
}
if (problems) process.exit(1);
console.log('lint: source check passed');
