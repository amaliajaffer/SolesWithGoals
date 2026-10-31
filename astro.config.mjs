// @ts-check
import { defineConfig } from 'astro/config';

// Set SITE_URL once the domain is connected (plan D7). Without it, the build
// leaves out canonical links and sitemap entries instead of inventing a domain.
// /sitemap.xml is src/pages/sitemap.xml.ts.
const site = process.env.SITE_URL || undefined;

export default defineConfig({
  site,
  build: { format: 'directory' },
  trailingSlash: 'ignore',
});
