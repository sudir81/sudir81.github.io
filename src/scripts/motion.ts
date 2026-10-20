// Fluid motion layer. Skipped entirely for reduced-motion users; pointer effects only on fine pointers.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

if (!reduce) {
  // ---- Smooth cursor glow + hero parallax (one rAF loop) ----
  const glow = document.getElementById('cursor-glow');
  const layers = [...document.querySelectorAll<HTMLElement>('[data-depth]')];
  const scrollLayers = [...document.querySelectorAll<HTMLElement>('[data-scroll]')];
  const track = document.querySelector<HTMLElement>('.marquee-track');
  const marqueeAnim = track?.getAnimations()[0];

  let mx = innerWidth / 2, my = innerHeight / 2; // target
  let gx = mx, gy = my;                          // glow position
  let nx = 0, ny = 0, cx = 0, cy = 0;            // normalized -1..1 target / current
  let lastY = scrollY, vel = 0;

  if (finePointer) {
    addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      nx = (e.clientX / innerWidth - 0.5) * 2;
      ny = (e.clientY / innerHeight - 0.5) * 2;
      if (glow) glow.style.opacity = '1';
    }, { passive: true });
    document.addEventListener('pointerleave', () => { if (glow) glow.style.opacity = '0'; });
  }

  const frame = () => {
    gx = lerp(gx, mx, 0.12); gy = lerp(gy, my, 0.12);
    cx = lerp(cx, nx, 0.06); cy = lerp(cy, ny, 0.06);
    if (glow) glow.style.transform = `translate3d(${gx - 192}px, ${gy - 192}px, 0)`;
    for (const l of layers) {
      const d = Number(l.dataset.depth);
      l.style.translate = `${cx * d}px ${cy * d}px`;
    }
    for (const l of scrollLayers) {
      const k = Number(l.dataset.scroll);
      if (scrollY < innerHeight * 1.2) l.style.translate = `0 ${scrollY * k}px`;
    }
    // Marquee speeds up with scroll velocity, eases back to normal
    vel = lerp(vel, Math.abs(scrollY - lastY), 0.1);
    lastY = scrollY;
    if (marqueeAnim) marqueeAnim.playbackRate = 1 + Math.min(vel * 0.6, 8);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  if (finePointer) {
    // ---- 3D tilt on cards ----
    document.querySelectorAll<HTMLElement>('.tilt').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', `${x * 8}deg`);
        card.style.setProperty('--rx', `${-y * 8}deg`);
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });

    // ---- Magnetic buttons ----
    document.querySelectorAll<HTMLElement>('.btn').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
        b.style.translate = `${x}px ${y}px`;
      }, { passive: true });
      b.addEventListener('pointerleave', () => { b.style.translate = ''; });
    });
  }
}

// ---- Active section in nav (also fine with reduced motion; no movement) ----
const links = [...document.querySelectorAll<HTMLAnchorElement>('a.navlink')];
const sections = ['work', 'about', 'skills', 'services', 'contact']
  .map((id) => document.getElementById(id))
  .filter((s): s is HTMLElement => !!s);
if (links.length && sections.length) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === `/#${e.target.id}`)));
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => io.observe(s));
}
