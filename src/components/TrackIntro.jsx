import { TRACKS } from '../data/tracks.js';
import TrackGlyph from './TrackGlyph.jsx';

// Short labels for the cards. The full "& X" name is in `tracks.js`.
const SHORT = {
  engineering: 'Engineering',
  business: 'Business',
  arts: 'Arts',
  health: 'Health'
};

export default function TrackIntro({ active, onPick }) {
  return (
    <section id="top" className="track-intro" aria-label="Choose a track">
      <div className="track-intro-inner">
        <div className="track-intro-head">
          <div className="brand-row">
            <span className="brand-mark">Compass</span>
            <span className="brand-dot" aria-hidden="true" />
          </div>
          <p className="eyebrow">Four paths. One page.</p>
        </div>

        <h1 className="track-intro-title">
          Pick a track.<br/>
          <span className="muted">See what four years inside it actually feels like.</span>
        </h1>

        <div className="track-grid" role="radiogroup" aria-label="Tracks">
          {TRACKS.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                className={`track-card ${isActive ? 'is-active' : ''}`}
                onClick={() => onPick(t.id)}
              >
                <div className="track-card-head">
                  <span className="track-card-glyph">
                    <TrackGlyph trackId={t.id} size={20} />
                  </span>
                  <span className="track-card-code">0{t.code}</span>
                </div>
                <h3 className="track-card-title">{t.name}</h3>
                <p className="track-card-one">{t.beats[0]}</p>
                <div className="track-card-foot">
                  <span className="track-card-short">{SHORT[t.id]}</span>
                  <span className="track-card-cta">
                    {isActive ? 'Selected' : 'Choose'}
                    <span aria-hidden="true">{isActive ? ' ✓' : ' →'}</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="scroll-hint">
          <span aria-hidden="true">↓</span>
          <span>Scroll to descend into the track</span>
        </div>
      </div>
    </section>
  );
}
