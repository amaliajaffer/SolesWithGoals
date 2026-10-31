// Adds .in-view once an element is well inside the screen, so its CSS
// animation (highlighter, ring drawing, staggered lists) starts when it's seen
// rather than on page load. Each element animates once.
const targets = document.querySelectorAll<Element>('[data-inview], .ring--draw');

if (!('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('in-view'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -18% 0px', threshold: 0.2 }
  );
  targets.forEach((el) => observer.observe(el));
}
