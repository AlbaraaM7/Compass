import { useEffect, useRef } from 'react';
import { useLatestRef, useReducedMotion, useInViewport } from '../../hooks.js';

const TOKENS = {
  canvas: '#0F0B07',
  panel: '#1A140E',
  accent: '#E8B86B',
  accentHover: '#FFD18A',
  accentSoft: 'rgba(232, 184, 107, 0.18)'
};

// Engineering & Tech: a single light pulse descending along a vertical
// circuit trace, on top of a faint procedural circuit-board pattern.
// One subject, one continuous motion. Camera does not move; the pulse moves.

export default function EngineeringCanvas({ progress }) {
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

    let pattern = null;
    const buildPattern = (w, h) => {
      const lines = [];
      const cols = 7;
      const rows = 11;
      const cellW = w / (cols + 1);
      const cellH = h / (rows + 1);
      for (let r = 0; r <= rows + 1; r++) {
        for (let c = 0; c <= cols + 1; c++) {
          const x = c * cellW;
          const y = r * cellH;
          if (Math.sin(r * 13 + c * 7) > -0.2 && c < cols + 1) {
            lines.push({ x1: x, y1: y, x2: x + cellW * (0.4 + Math.abs(Math.sin(r + c)) * 0.6), y2: y });
          }
          if (Math.cos(r * 11 + c * 5) > -0.2 && r < rows + 1) {
            lines.push({ x1: x, y1: y, x2: x, y2: y + cellH * (0.4 + Math.abs(Math.cos(r * 3 + c)) * 0.6) });
          }
          if (Math.abs(Math.sin(r * 4.7 + c * 2.3)) > 0.85) {
            lines.push({ node: true, x, y, r: 2 });
          }
        }
      }
      return lines;
    };

    const draw = (t, p) => {
      const { w, h } = dimsRef.current;
      if (!w || !h) return;

      if (!pattern) pattern = buildPattern(w, h);

      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#08060A');
      bg.addColorStop(0.5, TOKENS.canvas);
      bg.addColorStop(1, '#06050A');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const vg = ctx.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.2, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
      vg.addColorStop(0, 'rgba(10, 16, 32, 0)');
      vg.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(232, 184, 107, 0.09)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      const drift = Math.sin(t * 0.4) * 4;
      for (const ln of pattern) {
        if (ln.node) {
          ctx.fillStyle = 'rgba(232, 184, 107, 0.10)';
          ctx.beginPath();
          ctx.arc(ln.x + drift * 0.2, ln.y, ln.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(ln.x1 + drift * 0.2, ln.y1);
          ctx.lineTo(ln.x2 + drift * 0.2, ln.y2);
          ctx.stroke();
        }
      }

      const cx = w * 0.5;
      const margin = h * 0.12;
      const top = margin;
      const bottom = h - margin;
      const headY = top + p * (bottom - top);

      const halo = ctx.createLinearGradient(cx, top, cx, bottom);
      halo.addColorStop(0, 'rgba(232, 184, 107, 0)');
      halo.addColorStop(Math.max(0.001, p * 0.8), 'rgba(232, 184, 107, 0.30)');
      halo.addColorStop(1, 'rgba(232, 184, 107, 0.06)');
      ctx.fillStyle = halo;
      ctx.fillRect(cx - 18, top, 36, bottom - top);

      ctx.strokeStyle = TOKENS.accentHover;
      ctx.lineWidth = 2;
      ctx.shadowColor = TOKENS.accent;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(cx, top);
      ctx.lineTo(cx, headY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      const pulseR = 6 + Math.sin(t * 4) * 1.2;
      const headHalo = ctx.createRadialGradient(cx, headY, 0, cx, headY, 72);
      headHalo.addColorStop(0, 'rgba(255, 209, 138, 0.95)');
      headHalo.addColorStop(0.3, 'rgba(232, 184, 107, 0.45)');
      headHalo.addColorStop(1, 'rgba(232, 184, 107, 0)');
      ctx.fillStyle = headHalo;
      ctx.beginPath();
      ctx.arc(cx, headY, 72, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFF6E2';
      ctx.beginPath();
      ctx.arc(cx, headY, pulseR, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 4; i++) {
        const yPos = top + ((i + 1) / 5) * (bottom - top);
        if (yPos > headY + 10) break;
        const side = i % 2 === 0 ? 1 : -1;
        const len = 26 + Math.sin(t * 1.2 + i) * 6;
        ctx.strokeStyle = 'rgba(232, 184, 107, 0.32)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, yPos);
        ctx.lineTo(cx + side * len, yPos);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255, 209, 138, 0.75)';
        ctx.beginPath();
        ctx.arc(cx + side * len, yPos, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (reduced) {
      // Draw one frame, no animation loop.
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
