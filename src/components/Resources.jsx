import { useRef } from 'react';
import { useReveal } from '../hooks.js';

const GLYPHS = ['◯', '◇', '△', '□'];

export default function Resources({ track }) {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section className="section reveal" ref={ref} id="resources">
      <p className="index">03. Where to start on campus</p>
      <h2>Three or four real places a real student would look.</h2>
      <p className="lede">
        Not a generic list. The rooms, the people, the calendars that actually move the needle in the first month.
      </p>
      <div className="resources-grid">
        {track.resources.map((r, i) => (
          <article className="resource-card" key={i}>
            <div className="icon" aria-hidden="true">{GLYPHS[i % GLYPHS.length]}</div>
            <div>
              <h3>{r.name}</h3>
              <p>{r.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
