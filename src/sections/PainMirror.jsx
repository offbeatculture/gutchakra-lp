import React from 'react';
import Reveal from '../components/Reveal.jsx';
import PainAnimation from '../components/PainAnimation.jsx';
import BookButton from '../components/BookButton.jsx';
import { PAIN_INTRO, PAIN_POINTS, HERO } from '../data/content.js';

export default function PainMirror() {
  return (
    <section className="section-y container-px max-shell">
      <Reveal>
        <p className="eyebrow text-rose-saree">{PAIN_INTRO.eyebrow}</p>
        <h2 className="display text-3xl sm:text-5xl mt-3 max-w-3xl text-balance">
          {PAIN_INTRO.title}
        </h2>
        <p className="mt-4 text-lg text-ink-700 max-w-2xl">{PAIN_INTRO.sub}</p>
      </Reveal>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PAIN_POINTS.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.05}>
            <article className="card-cream pad h-full flex gap-5">
              <div className="shrink-0 h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-cream-50 border border-ink-700/10 flex items-center justify-center p-2">
                <PainAnimation kind={p.anim} />
              </div>
              <div className="flex-1">
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-rose-saree">No. {p.n}</span>
                <p className="mt-2 text-[16px] sm:text-[17px] text-ink-900 leading-snug font-medium">{p.line}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-col sm:flex-row sm:items-center gap-6 p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-cream-100 to-cream-200/70 border border-ink-700/10">
          <p className="display text-2xl sm:text-3xl max-w-2xl text-balance flex-1">
            {PAIN_INTRO.closer.split('RESET').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <span className="promise-strong italic">RESET</span>}
              </React.Fragment>
            ))}
          </p>
          <BookButton className="btn-primary shrink-0">
            Reserve your seat — <span className="line-through opacity-60 mr-1 font-normal">₹999</span> ₹99
            <span className="arr" aria-hidden>→</span>
          </BookButton>
        </div>
      </Reveal>
    </section>
  );
}
