import { useRef } from 'react';
import { useReveal } from '../hooks.js';

export default function WhatYouBuild({ track }) {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section className="section reveal" ref={ref} id="build">
      <p className="index">02. What you will build</p>
      <h2>Three things you will have made.</h2>
      <p className="lede">
        Specific, named outcomes. Not "develop skills." Not "gain experience." Things you can point at on the last day of senior year.
      </p>
      <div className="build-grid">
        {track.build.map((b, i) => (
          <article className="build-card" key={i}>
            <div className="num">0{i + 1}</div>
            <p>{b}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
