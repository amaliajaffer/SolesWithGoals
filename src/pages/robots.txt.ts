import type { APIRoute } from 'astro';
import { site as settings } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', settings.review ? 'Disallow: /' : 'Allow: /'];
  if (site && !settings.review) lines.push(`Sitemap: ${new URL('sitemap.xml', site).href}`);
  return new Response(`${lines.join('\n')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
