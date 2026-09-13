import { useEffect, useRef, useState } from 'react';
import { useScrollProgress, useReducedMotion } from '../hooks.js';
import ScrollFloat from './ScrollFloat.jsx';
import EngineeringCanvas from './canvases/EngineeringCanvas.jsx';
import BusinessCanvas from './canvases/BusinessCanvas.jsx';
import ArtsCanvas from './canvases/ArtsCanvas.jsx';
import HealthCanvas from './canvases/HealthCanvas.jsx';

const CANVAS_BY_TRACK = {
  engineering: EngineeringCanvas,
  business: BusinessCanvas,
  arts: ArtsCanvas,
  health: HealthCanvas
};

// Five caption beats, each with a start (fade-in begin), plateau (full opacity),
// fadeEnd (full opacity ends), end (gone).
const BEATS = [
  { start: 0.00, plateau: 0.06, fadeEnd: 0.18, end: 0.22 }, // Track name (large)
  { start: 0.18, plateau: 0.30, fadeEnd: 0.40, end: 0.45 }, // Subhead (ScrollFloat)
  { start: 0.40, plateau: 0.52, fadeEnd: 0.62, end: 0.66 }, // Line 1
  { start: 0.60, plateau: 0.72, fadeEnd: 0.80, end: 0.85 }, // Line 2
  { start: 0.82, plateau: 0.92, fadeEnd: 0.98, end: 1.00 }  // Final + CTA
];

function beatOpacity(p, b) {
  if (p < b.start || p > b.end) return 0;
  if (p < b.plateau) {
    const t = (p - b.start) / Math.max(0.001, b.plateau - b.start);
    return Math.min(1, t);
  }
  if (p > b.fadeEnd) {
    const t = (b.end - p) / Math.max(0.001, b.end - b.fadeEnd);
    return Math.min(1, t);
  }
  return 1;
}

export default function Hero({ track, onPick }) {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const progressRef = useScrollProgress(sectionRef);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  // Pump scroll progress into React state at a sane cadence.
  useEffect(() => {
    if (reduced) {
      setProgress(0.5);
      if (railRef.current) railRef.current.style.height = '50%';
      return;
    }
    let raf = 0;
    const pump = () => {
      raf = 0;
      const p = progressRef.current;
      setProgress(p);
      if (railRef.current) railRef.current.style.height = `${(p * 100).toFixed(1)}%`;
      raf = requestAnimationFrame(pump);
    };
    raf = requestAnimationFrame(pump);
    return () => raf && cancelAnimationFrame(raf);
  }, [progressRef, reduced]);

  const Canvas = CANVAS_BY_TRACK[track.id];
  const op = reduced
    ? [1, 0, 1, 0, 0]   // show only the title + the first beat, statically
    : BEATS.map((b) => beatOpacity(progress, b));
  const opName = op[0];
  const opSub = op[1];
  const op1 = op[2];
  const op2 = op[3];
  const opFinal = op[4];

  return (
    <section
      id="hero"
      className={`hero ${reduced ? 'hero-static' : ''}`}
      ref={sectionRef}
      aria-label="Choose your track and descend into it"
    >
      <div className="hero-stage">
        <Canvas progress={reduced ? 0.5 : progress} />

        <div className="hero-overlay">
          <div className="hero-eyebrow" style={{ opacity: reduced ? 1 : 1 - Math.min(1, progress * 3.5) }}>
            <span>{track.code}</span>&nbsp;&nbsp;Track
          </div>

          <div className="hero-title" style={{ opacity: opName, transform: `translate(-50%, calc(-50% + ${progress * 18}vh))` }}>
            <h1>{track.name}</h1>
            <p className="sub">A track for the next four years.</p>
          </div>

          {!reduced && (
            <div
              className="hero-title"
              style={{
                opacity: opSub,
                transform: `translate(-50%, calc(-50% + ${progress * 26}vh))`
              }}
            >
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="top top+=80%"
                scrollEnd="bottom top-=20%"
                stagger={0.03}
              >
                {track.beats[0]}
              </ScrollFloat>
            </div>
          )}

          <div className="hero-caption" style={{ opacity: op1 }}>
            <div className="label">The question</div>
            <p className="line">{track.beats[1]}</p>
          </div>

          <div className="hero-caption" style={{ opacity: op2 }}>
            <div className="label">The answer</div>
            <p className="line">{track.beats[2]}</p>
          </div>

          <div className="hero-caption" style={{ opacity: opFinal }}>
            <div className="label">Choose your track</div>
            <p className="line">{track.final}</p>
            <button type="button" className="hero-cta" onClick={() => {
              const t = document.querySelector('.track-picker');
              if (t) t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
              t && t.focus && t.focus();
            }}>
              Pick another
              <span aria-hidden="true">↓</span>
            </button>
          </div>

          {!reduced && (
            <div className="progress-rail" aria-hidden="true">
              <div className="fill" ref={railRef} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
