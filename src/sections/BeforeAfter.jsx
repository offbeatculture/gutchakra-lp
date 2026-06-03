import React from 'react';
import Reveal from '../components/Reveal.jsx';
import { BEFORE_AFTER } from '../data/content.js';

export default function BeforeAfter() {
  return (
    <section className="section-y container-px max-shell">
      <Reveal>
        <p className="eyebrow text-teal-deep">{BEFORE_AFTER.eyebrow}</p>
        <h2 className="display text-3xl sm:text-5xl mt-3 max-w-4xl text-balance">
          <span className="pain-strong">{BEFORE_AFTER.titleBefore}</span>{' '}
          <span className="promise-strong">{BEFORE_AFTER.titleAfter}</span>
        </h2>
        <p className="mt-4 text-lg text-ink-700 max-w-2xl">{BEFORE_AFTER.sub}</p>
      </Reveal>

      <div className="mt-12 card-cream overflow-hidden">
        <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] items-center bg-cream-200/50 px-8 py-4 border-b border-ink-700/10">
          <p className="eyebrow text-rose-saree">Before</p>
          <span className="w-10" />
          <p className="eyebrow text-teal-deep">After</p>
        </div>
        <ul className="divide-y divide-ink-700/10">
          {BEFORE_AFTER.rows.map((r, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <li className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-0 px-6 sm:px-8 py-6">
                <p className="text-ink-500 italic line-through decoration-rose-soft/60 decoration-2">{r.before}</p>
                <span className="hidden sm:flex w-10 h-10 mx-4 items-center justify-center rounded-full bg-cream-200 text-teal-deep" aria-hidden>→</span>
                <span className="sm:hidden eyebrow text-teal-deep mt-1">After</span>
                <p className="text-ink-900 font-medium promise-strong">{r.after}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
