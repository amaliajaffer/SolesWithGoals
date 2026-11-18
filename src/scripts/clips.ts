// Her clips (video[data-clip]): muted loops that start once they're near the
// screen, so a clip further down the page costs nothing until it's reached.
// Under reduced motion they never load or play (CSS shows the still). Without
// JavaScript the video shows its poster, the same still. The Pause button
// (PauseButton.astro) adds .is-paused to the clip's frame; a paused clip stays
// paused. While a clip plays, its frame gets data-playing so the still under it
// stays out of the duotone blend.
const clips = document.querySelectorAll<HTMLVideoElement>('video[data-clip]');
const still = window.matchMedia('(prefers-reduced-motion: reduce)');

const frameOf = (video: HTMLVideoElement) => video.parentElement;
const paused = (video: HTMLVideoElement) => Boolean(video.closest('.is-paused'));

function start(video: HTMLVideoElement) {
  if (still.matches || paused(video)) return;
  video.play().catch(() => {
    // Autoplay refused (data saver, a browser setting): the still stays.
  });
}

clips.forEach((video) => {
  video.addEventListener('playing', () => frameOf(video)?.setAttribute('data-playing', ''));
  video.addEventListener('pause', () => frameOf(video)?.removeAttribute('data-playing'));
});

if (!still.matches) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          start(entry.target as HTMLVideoElement);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '200px 0px' }
    );
    clips.forEach((video) => observer.observe(video));
  } else {
    clips.forEach(start);
  }
}

// Turning reduced motion on while a clip plays stops it.
still.addEventListener('change', () => {
  if (still.matches) clips.forEach((video) => video.pause());
});

// The Pause button toggles .is-paused on the frame; follow it here.
document.addEventListener('clip-pause', (event) => {
  const frame = (event as CustomEvent<{ target: Element | null; paused: boolean }>).detail;
  frame.target?.querySelectorAll<HTMLVideoElement>('video[data-clip]').forEach((video) => {
    if (frame.paused) video.pause();
    else start(video);
  });
});
