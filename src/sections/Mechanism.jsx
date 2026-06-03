import React from 'react';
import Reveal from '../components/Reveal.jsx';
import BookButton from '../components/BookButton.jsx';
import { MECHANISM, HERO } from '../data/content.js';

const TAG_STYLES = {
  Diagnose: 'bg-rose-soft/30 text-rose-deep',
  Release:  'bg-gold/25 text-gold-deep',
  Anchor:   'bg-teal-mist text-teal-deep',
};

export default function Mechanism() {
  return (
    <section className="section-y container-px max-shell">
      <Reveal>
        <p className="eyebrow text-teal-deep">{MECHANISM.eyebrow}</p>
        <h2 className="display text-3xl sm:text-5xl mt-3 max-w-3xl text-balance">
          {MECHANISM.title}
        </h2>
      </Reveal>

      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {MECHANISM.components.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.08}>
            <article className="card-cream pad h-full flex flex-col">
              <div className="flex items-center justify-between">
                <span className="font-mono text-ink-500 text-sm">{c.n}</span>
                <span className={`pill !border-0 font-mono !text-[11px] tracking-widest uppercase ${TAG_STYLES[c.tag]}`}>{c.tag}</span>
              </div>
              <h3 className="display text-2xl sm:text-[28px] mt-5 leading-tight">{c.title}</h3>
              <p className="mt-4 text-ink-700 leading-relaxed">{c.lead}</p>
              <p className="mt-3 text-ink-700 leading-relaxed">{c.body}</p>
              <p className="mt-5 text-teal-deep font-semibold">{c.kicker}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 text-center">
          <BookButton className="btn-primary">
            Reserve your seat — <span className="line-through opacity-60 mr-1 font-normal">₹999</span> ₹99
            <span className="arr" aria-hidden>→</span>
          </BookButton>
        </div>
      </Reveal>
    </section>
  );
}
