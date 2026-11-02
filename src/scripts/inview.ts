// Adds .in-view once an element is well inside the screen, so its CSS
// animation (highlighter, ring drawing, staggered lists) starts when it's seen
// rather than on page load. Each element animates once. Anything already
// scrolled past (a jump to the end, a fast fling) is revealed too, and so is
// everything before printing, so no content can stay hidden.
const targets = document.querySelectorAll<Element>('[data-inview], .ring--draw');
const pending = new Set<Element>(targets);

const reveal = (el: Element) => {
  el.classList.add('in-view');
  pending.delete(el);
};
const revealAll = () => pending.forEach(reveal);

if (!('IntersectionObserver' in window)) {
  revealAll();
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -18% 0px', threshold: 0.2 }
  );
  targets.forEach((el) => observer.observe(el));

  // Reveal anything whose top has reached the reveal line or gone above it.
  let queued = false;
  const sweep = () => {
    queued = false;
    const line = window.innerHeight * 0.82;
    pending.forEach((el) => {
      if (el.getBoundingClientRect().top < line) {
        reveal(el);
        observer.unobserve(el);
      }
    });
    if (!pending.size) window.removeEventListener('scroll', onScroll);
  };
  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(sweep);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  sweep();
}

window.addEventListener('beforeprint', revealAll);
