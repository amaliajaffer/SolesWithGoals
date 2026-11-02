// @ts-check
import { defineConfig } from 'astro/config';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Set SITE_URL once the domain is connected (plan D7). Without it, the build
// leaves out canonical links and sitemap entries instead of inventing a domain.
// /sitemap.xml is src/pages/sitemap.xml.ts.
const site = process.env.SITE_URL || undefined;

// Amalia's photos and clips sit in /media at the project root, outside public/
// and outside the bundler, so they only reach a build that links to them: the
// version with her photos. The plain version never ships them.
const MEDIA_DIR = fileURLToPath(new URL('./media/', import.meta.url));
const TYPES = { '.jpg': 'image/jpeg', '.webp': 'image/webp' };

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return name.endsWith('.html') ? [p] : [];
  });
}

/** @returns {import('astro').AstroIntegration} */
function photosMedia() {
  return {
    name: 'photos-media',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const url = (req.url || '').split('?')[0];
          if (!url.startsWith('/media/')) return next();
          const file = join(MEDIA_DIR, url.slice('/media/'.length));
          if (!file.startsWith(MEDIA_DIR) || !existsSync(file)) return next();
          res.setHeader('Content-Type', TYPES[extname(file)] || 'application/octet-stream');
          res.end(readFileSync(file));
        });
      },
      'astro:build:done': ({ dir }) => {
        const out = fileURLToPath(dir);
        const used = new Set();
        for (const f of htmlFiles(out)) {
          for (const m of readFileSync(f, 'utf8').matchAll(/\/media\/([\w.-]+)/g)) used.add(m[1]);
        }
        if (!used.size) return;
        mkdirSync(join(out, 'media'), { recursive: true });
        for (const name of used) {
          const src = join(MEDIA_DIR, name);
          if (existsSync(src)) copyFileSync(src, join(out, 'media', name));
        }
      },
    },
  };
}

export default defineConfig({
  site,
  build: { format: 'directory' },
  trailingSlash: 'ignore',
  integrations: [photosMedia()],
});
