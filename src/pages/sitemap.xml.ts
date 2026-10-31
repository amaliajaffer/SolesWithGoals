import type { APIRoute } from 'astro';
import { site as settings } from '../data/site';

// Lists exactly what the build makes: each page's own getStaticPaths decides
// whether it exists (Fundraising waits for D2/D3). Empty in the review build,
// and until SITE_URL is set.
type Paths = () => { params: { v?: string } }[];
// The brackets in the folder name are escaped so the glob reads them literally.
const pages = import.meta.glob<Paths>('./\\[...v\\]/*.astro', { eager: true, import: 'getStaticPaths' });

export const GET: APIRoute = ({ site }) => {
  const urls =
    settings.review || !site
      ? []
      : Object.entries(pages)
          .filter(([, getPaths]) => typeof getPaths === 'function')
          .flatMap(([file, getPaths]) => {
            const name = file.slice(file.lastIndexOf('/') + 1, -'.astro'.length);
            return getPaths().map(({ params }) => {
              const prefix = params.v ? `/${params.v}` : '';
              return new URL(`${prefix}/${name === 'index' ? '' : `${name}/`}`, site).href;
            });
          })
          .sort();
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${url}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
