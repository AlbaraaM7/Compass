import { useEffect, useState } from 'react';
import { TRACKS, DEFAULT_TRACK } from './data/tracks.js';
import TrackPicker from './components/TrackPicker.jsx';
import TrackIntro from './components/TrackIntro.jsx';
import Hero from './components/Hero.jsx';
import WeekInLife from './components/WeekInLife.jsx';
import WhatYouBuild from './components/WhatYouBuild.jsx';
import Resources from './components/Resources.jsx';
import CTA from './components/CTA.jsx';

export default function App() {
  const [trackId, setTrackId] = useState(DEFAULT_TRACK.id);
  const track = TRACKS.find((t) => t.id === trackId) || DEFAULT_TRACK;

  // Reflect the active track on the root element so CSS variables swap.
  useEffect(() => {
    document.documentElement.setAttribute('data-track', trackId);
  }, [trackId]);

  // Reset scroll progress when switching tracks so the hero starts fresh.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [trackId]);

  return (
    <div className="app" data-track={trackId}>
      <a className="skip-link" href="#hero">Skip to hero</a>

      <header className="header">
        <TrackPicker active={trackId} onPick={setTrackId} />
      </header>

      <main>
        <TrackIntro active={trackId} onPick={setTrackId} />
        <Hero track={track} onPick={setTrackId} />

        <WeekInLife track={track} />
        <WhatYouBuild track={track} />
        <Resources track={track} />
        <CTA />
      </main>

      <footer className="footer">
        <span>Compass · a design concept · 2026</span>
        <span>
          <a href="problem.html">Problem &amp; Solution</a>
          <a href="#top">Back to top</a>
        </span>
      </footer>
    </div>
  );
}
