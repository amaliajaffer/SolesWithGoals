// Labels over lists that shrink on the live site while some items wait for a
// confirmation ("Three pillars" until SOP confirms the fourth).
const WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

export const countLabel = (count: number, noun: string) => `${WORDS[count] ?? count} ${noun}`;
