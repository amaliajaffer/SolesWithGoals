import { site, type Variant } from '../data/site';

export type { Variant };
export const PHOTOS_PREFIX = 'with-photos';

// Every page is built once per version while reviewing (/ and /with-photos/),
// and once at the root, in the chosen version, after launch.
export function variantPaths(when = true) {
  if (site.review) {
    return [
      { params: { v: undefined }, props: { variant: 'plain' as Variant } },
      { params: { v: PHOTOS_PREFIX }, props: { variant: 'photos' as Variant } },
    ];
  }
  return when ? [{ params: { v: undefined }, props: { variant: site.liveVariant } }] : [];
}

// An internal link that stays inside the current version.
export function link(variant: Variant, path: string) {
  const [bare, hash] = path.split('#');
  const clean = bare === '/' || bare === '' ? '/' : `/${bare.replace(/^\/+|\/+$/g, '')}/`;
  const prefixed = site.review && variant === 'photos' ? `/${PHOTOS_PREFIX}${clean}` : clean;
  return hash ? `${prefixed}#${hash}` : prefixed;
}

// The same page in the other version (review bar).
export function otherVersion(pathname: string) {
  const prefix = `/${PHOTOS_PREFIX}`;
  // The 404 page has no photos twin, so it points at the other version's home.
  if (/^\/404(\.html|\/)?$/.test(pathname)) return { variant: 'photos' as Variant, href: `${prefix}/` };
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    return { variant: 'plain' as Variant, href: pathname.slice(prefix.length) || '/' };
  }
  return { variant: 'photos' as Variant, href: `${prefix}${pathname === '/' ? '/' : pathname}` };
}
