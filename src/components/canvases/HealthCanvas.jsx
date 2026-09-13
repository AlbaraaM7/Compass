import { useEffect, useRef } from 'react';
import { useLatestRef, useReducedMotion, useInViewport } from '../../hooks.js';

const TOKENS = {
  canvas: '#0F1A12',
  panel: '#162618',
  accent: '#8FBF6E',
  accentHover: '#B5D893'
};

// Health & Science: a soft cellular grid that breathes.

export default function HealthCanvas({ progress }) {
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

    let raf = 0;
    const start = performance.now();

    const draw = (t, p) => {
      const { w, h } = dimsRef.current;
      if (!w || !h) return;

      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#0A1310');
      bg.addColorStop(1, TOKENS.canvas);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const zoom = 1 + p * 1.4;
      const cellSize = 86 * zoom;
      const cols = Math.ceil(w / cellSize) + 2;
      const rows = Math.ceil(h / cellSize) + 2;
      // Freeze the offset when reduced so cells stop drifting.
      const offsetY = reduced ? 0 : (t * 6) % cellSize;

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const x = c * cellSize - (p * 60) % cellSize;
          const y = r * cellSize - offsetY + (p * 90);
          // Freeze breathing when reduced.
          const phase = reduced ? 0.5 : Math.sin(t * 0.7 + c * 0.6 + r * 0.9);
          const breathe = 0.5 + 0.5 * phase;
          const radius = (cellSize * 0.36) * (0.85 + breathe * 0.25);

          ctx.strokeStyle = `rgba(143, 191, 110, ${0.22 + breathe * 0.12})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = `rgba(143, 191, 110, ${0.04 + breathe * 0.08})`;
          ctx.beginPath();
          ctx.arc(x, y, radius * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const sx = w * 0.5;
      const sy = h * 0.85 - p * (h * 0.7);
      const subjectR = 60 + p * 40;
      const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, subjectR * 2.2);
      halo.addColorStop(0, 'rgba(181, 216, 147, 0.45)');
      halo.addColorStop(0.4, 'rgba(143, 191, 110, 0.18)');
      halo.addColorStop(1, 'rgba(143, 191, 110, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(sx, sy, subjectR * 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(181, 216, 147, 0.85)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(sx, sy, subjectR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(181, 216, 147, 0.14)';
      ctx.beginPath();
      ctx.arc(sx, sy, subjectR * 0.7, 0, Math.PI * 2);
      ctx.fill();

      const vg = ctx.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.25, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
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
