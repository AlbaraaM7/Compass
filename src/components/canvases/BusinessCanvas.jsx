import { useEffect, useRef } from 'react';
import { useLatestRef, useReducedMotion, useInViewport } from '../../hooks.js';

const TOKENS = {
  canvas: '#0F1410',
  panel: '#1A2018',
  accent: '#C8A862',
  accentHover: '#E0C284'
};

// Business & Entrepreneurship: a starfield warp tunnel.

export default function BusinessCanvas({ progress }) {
  const canvasRef = useRef(null);
  const progressRef = useLatestRef(progress);
  const dimsRef = useRef({ w: 0, h: 0, dpr: 1 });
  const reduced = useReducedMotion();
  const inView = useInViewport(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimsRef.current = { w, h, dpr };
    };

    resize();
    window.addEventListener('resize', resize);

    const STAR_COUNT = 240;
    const stars = [];

    const makeStar = () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
      angle: Math.random() * Math.PI * 2,
      size: 0.6 + Math.random() * 1.8,
      hue: 42 + Math.random() * 10
    });

    for (let i = 0; i < STAR_COUNT; i++) stars.push(makeStar());

    let raf = 0;
    const start = performance.now();

    const draw = (t, p) => {
      const { w, h } = dimsRef.current;
      if (!w || !h) return;
      const warp = 0.0015 + p * 0.022;

      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#0A0E0A');
      bg.addColorStop(0.5, TOKENS.canvas);
      bg.addColorStop(1, '#070A07');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const halo = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.min(w, h) * 0.35);
      halo.addColorStop(0, 'rgba(200, 168, 98, 0.28)');
      halo.addColorStop(0.5, 'rgba(140, 110, 50, 0.10)');
      halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        // For reduced motion, do not advance the stars.
        if (!reduced) s.z -= warp;
        if (s.z <= 0.001) {
          stars[i] = makeStar();
          stars[i].z = 1;
          continue;
        }

        const k = 220 / s.z;
        const sx = cx + s.x * w * 0.45 * k;
        const sy = cy + s.y * h * 0.45 * k;
        const r = Math.max(0.3, s.size * k * 0.6);

        const px = cx + s.x * w * 0.45 * (220 / (s.z + warp * 8));
        const py = cy + s.y * h * 0.45 * (220 / (s.z + warp * 8));

        ctx.strokeStyle = `hsla(${s.hue}, 78%, 72%, ${Math.min(1, 0.18 + p * 0.5)})`;
        ctx.lineWidth = Math.max(0.4, r * 0.4);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        ctx.fillStyle = `hsla(${s.hue}, 90%, ${68 + p * 12}%, ${Math.min(1, 0.4 + p * 0.6)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const vg = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.3, cx, cy, Math.max(w, h) * 0.75);
      vg.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vg.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);
    };

    if (reduced) {
      draw(0, 0.5);
      return () => window.removeEventListener('resize', resize);
    }

    const render = () => {
      raf = requestAnimationFrame(render);
      if (!inView) return;
      const t = (performance.now() - start) / 1000;
      draw(t, progressRef.current);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced, inView]);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
