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

// Her photos and clips ship only once photosConsent is set in data/site.ts.
const photosConsent = /^\s*photosConsent:\s*true,/m.test(readFileSync(join(project, 'src', 'data', 'site.ts'), 'utf8'));

test('launch build: no review version, and her media only with consent', () => {
  assert.ok(existsSync(dist), 'run `npm run build` first');
  assert.ok(!existsSync(join(dist, 'with-photos')), 'dist/with-photos must not exist');
  const media = walk(dist).filter((f) => /\.(webp|jpe?g|mp4|webm|mov)$/i.test(f) && !/og-image/.test(f));
  if (!photosConsent) {
    assert.ok(!existsSync(join(dist, 'media')), 'dist/media must not exist');
    assert.deepEqual(media, [], 'no photos or clips in dist');
  } else {
    // Only the files a page links to, and the clips as small MP4s (no animated WebP).
    assert.ok(media.length > 0, 'the photos version ships her media');
    for (const file of media) {
      assert.ok(!/\.webp$/i.test(file), `${file}: clips ship as MP4`);
      assert.ok(statSync(file).size <= 1024 * 1024, `${file} is over 1 MB`);
    }
  }
  for (const file of textFiles(dist)) {
    const text = readFileSync(file, 'utf8');
    assert.ok(!text.includes('with-photos'), `${file} mentions with-photos`);
    if (!photosConsent) assert.ok(!text.includes('/media/'), `${file} links to /media/`);
    assert.ok(!text.includes('Review build'), `${file} shows the review bar`);
    assert.ok(!text.includes('data-note='), `${file} shows a review marker`);
  }
});

test('launch build: no Special Olympics Pakistan claim before its written OK', () => {
  const sopConfirmed = /^\s*sop:\s*true,/m.test(readFileSync(join(project, 'src', 'data', 'site.ts'), 'utf8'));
  if (sopConfirmed) return;
  for (const file of textFiles(dist)) {
    assert.ok(!readFileSync(file, 'utf8').includes('Special Olympics Pakistan'), `${file} names Special Olympics Pakistan`);
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
