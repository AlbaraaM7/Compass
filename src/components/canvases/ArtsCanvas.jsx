import { useEffect, useRef } from 'react';
import { useLatestRef, useReducedMotion, useInViewport } from '../../hooks.js';

const TOKENS = {
  canvas: '#1A0B1F',
  panel: '#241230',
  accent: '#E07A9E',
  accentHover: '#F09AB6'
};

// Arts & Design: ink falling through water.

export default function ArtsCanvas({ progress }) {
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

    const seed = (i) => {
      const x = Math.sin(i * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    const noise = (x, y) => {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const a = seed(xi + yi * 57);
      const b = seed(xi + 1 + yi * 57);
      const c = seed(xi + (yi + 1) * 57);
      const d = seed(xi + 1 + (yi + 1) * 57);
      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    };
    const fbm = (x, y) => {
      let v = 0, amp = 0.5, freq = 1;
      for (let i = 0; i < 4; i++) {
        v += amp * noise(x * freq, y * freq);
        amp *= 0.5;
        freq *= 2;
      }
      return v;
    };

    let raf = 0;
    const start = performance.now();

    const draw = (t, p) => {
      const { w, h } = dimsRef.current;
      if (!w || !h) return;

      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#100620');
      bg.addColorStop(1, TOKENS.canvas);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;
      const cx = w * 0.5;
      const dropY = h * (0.18 + p * 0.62);
      const dropR = 110 + p * 30;

      const step = 3;
      // When reduced, freeze the noise field at t=0 so the bloom doesn't shimmer.
      const tNoise = reduced ? 0 : t;
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const dx = x - cx;
          const dy = y - dropY;
          const d = Math.sqrt(dx * dx + dy * dy);
          const dropField = Math.max(0, 1 - d / dropR);
          const falloff = dropField * dropField * (3 - 2 * dropField);

          const n = fbm(x * 0.0035 + tNoise * 0.06, y * 0.0035 + tNoise * 0.04);
          const ambient = Math.max(0, n - 0.45) * 1.6;

          const field = Math.min(1, falloff * 1.4 + ambient * 0.35);

          const r = Math.floor(80 * field + 26 * (1 - field));
          const g = Math.floor(22 * field + 11 * (1 - field));
          const b = Math.floor(72 * field + 31 * (1 - field));

          for (let yy = 0; yy < step && y + yy < h; yy++) {
            for (let xx = 0; xx < step && x + xx < w; xx++) {
              const idx = ((y + yy) * w + (x + xx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
              data[idx + 3] = 255;
            }
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);

      const glow = ctx.createRadialGradient(cx, dropY, 0, cx, dropY, dropR * 1.2);
      glow.addColorStop(0, 'rgba(224, 122, 158, 0.24)');
      glow.addColorStop(0.6, 'rgba(224, 122, 158, 0.06)');
      glow.addColorStop(1, 'rgba(224, 122, 158, 0)');
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      const vg = ctx.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.3, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
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
