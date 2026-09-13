import { TRACKS } from '../data/tracks.js';
import TrackGlyph from './TrackGlyph.jsx';

const SHORT = {
  engineering: 'Engineering',
  business: 'Business',
  arts: 'Arts',
  health: 'Health'
};

export default function TrackPicker({ active, onPick }) {
  return (
    <>
      <a className="wordmark" href="#top" aria-label="Compass home">
        Compass<span className="dot" aria-hidden="true" />
      </a>
      <p className="tagline">
        <strong>Pick a track.</strong>&nbsp;See what four years inside it actually feels like.
      </p>
      <nav className="track-picker" aria-label="Choose your track">
        {TRACKS.map((t) => (
          <button
            key={t.id}
            type="button"
            className="track-btn"
            aria-pressed={active === t.id}
            aria-label={`${t.name} track${active === t.id ? ', selected' : ''}`}
            onClick={() => onPick(t.id)}
          >
            <TrackGlyph trackId={t.id} className="track-btn-glyph" size={14} />
            <span>{SHORT[t.id]}</span>
          </button>
        ))}
      </nav>
      <a className="nav-link cta" href="problem.html">Problem &amp; Solution</a>
    </>
  );
}
