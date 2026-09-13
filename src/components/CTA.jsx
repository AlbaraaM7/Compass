import { useRef } from 'react';
import { useReveal } from '../hooks.js';

export default function CTA() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section className="section cta-section reveal" ref={ref} id="next">
      <p className="index">04. One email a month</p>
      <h2>One email a month. A real look at what each track actually feels like.</h2>
      <p>
        No newsletter. No funnels. One short note, the first Sunday of the month, with the week-in-the-life for one track and a link to last month's.
      </p>
      <a className="cta-button" href="mailto:hello@compass.example?subject=Subscribe">
        Subscribe
        <span aria-hidden="true">→</span>
      </a>
      <p className="cta-foot">A design concept. The button opens a mailto stub.</p>
    </section>
  );
}
