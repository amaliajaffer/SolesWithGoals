import type { APIRoute } from 'astro';
import { site as settings } from '../data/site';
import { copy } from '../data/copy';

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => (site ? new URL(path, site).href : path);
  const text = [
    `# ${settings.name}`,
    '',
    `> ${copy.essence} ${copy.mission}.`,
    '',
    copy.positioning,
    settings.confirmed.sop ? '' : 'Soles with Goals is student-led and not affiliated with Special Olympics.',
    '',
    '## Pages',
    `- [About](${url('/about/')}): vision, mission, values and Amalia’s story`,
    `- [The 5K](${url('/the-5k/')}): ${copy.fiveK.launch}`,
    `- [Our Approach](${url('/approach/')}): weekly runs and modules in Karachi`,
    `- [Impact](${url('/impact/')}): the five modules and free resources`,
    `- [Stories](${url('/stories/')}): stories of change`,
    `- [Get involved](${url('/get-involved/')}): run, volunteer, coach or partner`,
    '',
  ].join('\n');
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
