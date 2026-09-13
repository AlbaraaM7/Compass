import { useRef } from 'react';
import { useReveal } from '../hooks.js';

export default function WeekInLife({ track }) {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section className="section reveal" ref={ref} id="week">
      <p className="index">01. Week in the life</p>
      <h2>What a real week actually looks like.</h2>
      <p className="lede">
        Three moments from a real week in this track. Not the brochure, not the catalog copy. The texture of being inside it.
      </p>
      <div className="week-grid">
        {track.week.map((m, i) => (
          <article className="week-card" key={i}>
            <div className="when">{m.when}</div>
            <h3>{m.title}</h3>
            <p>{m.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
