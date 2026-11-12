// Local review only: runs `astro dev|build|preview` with REVIEW_BUILD=1, which
// turns on the review version (/with-photos/, the review bar, noindex). Works the
// same on Windows, macOS and Linux. Never use this on a public host.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const [command = 'dev', ...rest] = process.argv.slice(2);
if (!['dev', 'build', 'preview'].includes(command)) {
  console.error('Usage: node scripts/review.mjs dev|build|preview [astro args]');
  process.exit(1);
}
const astro = fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url));
const result = spawnSync(process.execPath, [astro, command, ...rest], {
  stdio: 'inherit',
  env: { ...process.env, REVIEW_BUILD: '1' },
});
process.exit(result.status ?? 1);
