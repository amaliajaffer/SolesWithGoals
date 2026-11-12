// Checks the built site. `npm test` builds first, then runs these with node:test.
//   launch build (dist/)      : no review version, no photos or clips, no dead links,
//                               a plain "coming soon" wherever a link is still missing
//   review build (temp folder): still works for a local review, and refuses to run on Render
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = fileURLToPath(new URL('../', import.meta.url));
const dist = join(project, 'dist');
const astro = join(project, 'node_modules', 'astro', 'bin', 'astro.mjs');

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
const textFiles = (dir) => walk(dir).filter((f) => /\.(html|txt|xml)$/.test(f));
const read = (dir, file) => readFileSync(join(dir, file), 'utf8');

test('launch build: no review version and no review media', () => {
  assert.ok(existsSync(dist), 'run `npm run build` first');
  assert.ok(!existsSync(join(dist, 'with-photos')), 'dist/with-photos must not exist');
  assert.ok(!existsSync(join(dist, 'media')), 'dist/media must not exist');
  const media = walk(dist).filter((f) => /\.(webp|jpe?g|mp4|webm|mov)$/i.test(f) && !/og-image/.test(f));
  assert.deepEqual(media, [], 'no photos or clips in dist');
  for (const file of textFiles(dist)) {
    const text = readFileSync(file, 'utf8');
    assert.ok(!text.includes('with-photos'), `${file} mentions with-photos`);
    assert.ok(!text.includes('/media/'), `${file} links to /media/`);
    assert.ok(!text.includes('Review build'), `${file} shows the review bar`);
  }
});

test('launch build: indexable, robots and sitemap match', () => {
  assert.ok(!read(dist, 'index.html').includes('noindex'), 'home page must not be noindex');
  assert.match(read(dist, 'robots.txt'), /Allow: \//);
  assert.ok(!/Disallow: \/\s*$/m.test(read(dist, 'robots.txt')), 'robots must not block the whole site');
});

test('launch build: no dead links', () => {
  for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(file, 'utf8');
    for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
      const href = m[1];
      assert.ok(href && href !== '#' && !/^(null|undefined)$/.test(href), `${file}: bad link "${href}"`);
      assert.ok(!/^mailto:(null|undefined)?$/.test(href), `${file}: bad mailto "${href}"`);
    }
  }
});

test('launch build: a missing contact route shows "Coming soon", not a dead end', () => {
  const contact = read(dist, 'contact/index.html');
  const hasRoute = /mailto:|docs\.google\.com\/forms|forms\.gle/.test(contact);
  if (!hasRoute) assert.match(contact, /coming soon/i);
  const privacy = read(dist, 'privacy/index.html');
  if (!hasRoute) {
    assert.ok(!/button takes you to a Google Form/.test(privacy), 'privacy must not mention a form that does not exist');
    assert.ok(!/contact details above/.test(privacy), 'privacy must not point at contact details that do not exist');
  }
});

test('review build: opt-in only, and never on Render', () => {
  const out = mkdtempSync(join(tmpdir(), 'swg-review-'));
  try {
    const run = (extra) =>
      spawnSync(process.execPath, [astro, 'build', '--outDir', out], {
        cwd: project,
        encoding: 'utf8',
        env: { ...process.env, REVIEW_BUILD: '1', RENDER: '', ...extra },
      });
    const ok = run({});
    assert.equal(ok.status, 0, ok.stderr || ok.stdout);
    assert.ok(existsSync(join(out, 'with-photos', 'index.html')), 'review build has /with-photos/');
    assert.ok(existsSync(join(out, 'media')), 'review build has the media');
    assert.match(read(out, 'index.html'), /noindex/);
    rmSync(out, { recursive: true, force: true });
    const blocked = run({ RENDER: 'true' });
    assert.notEqual(blocked.status, 0, 'a review build must fail when RENDER is set');
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});
