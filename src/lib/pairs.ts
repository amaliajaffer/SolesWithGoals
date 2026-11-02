// Phones show bibs two to a row. A bib with a line of text takes the whole row,
// and so does a short one that would otherwise sit beside an empty space.
export function wideOnPhone(items: { text?: string | null }[]) {
  const wide = items.map((item) => Boolean(item.text));
  let alone: number | null = null;
  wide.forEach((isWide, index) => {
    if (isWide) {
      if (alone !== null) wide[alone] = true;
      alone = null;
    } else {
      alone = alone === null ? index : null;
    }
  });
  if (alone !== null) wide[alone] = true;
  return wide;
}
