import React from 'react';
import Reveal from '../components/Reveal.jsx';
import { COACH } from '../data/content.js';

export default function Coach() {
  return (
    <section className="section-y relative overflow-hidden">
      {/* Soft rose + teal atmosphere behind the card */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[480px] w-[480px] rounded-full bg-rose-soft/25 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-teal-mist/45 blur-3xl" />
      </div>

      <div className="max-shell container-px">
        <Reveal>
          <div className="card-cream pad sm:p-12 max-w-5xl mx-auto">
            <p className="eyebrow text-teal-deep">{COACH.eyebrow}</p>

            <h2 className="display mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em]">
              <span className="block text-ink-900">{COACH.nameFirst}</span>
              <span className="block italic text-teal-deep">{COACH.nameLast}</span>
            </h2>

            <div className="mt-8 max-w-3xl space-y-4 text-ink-800 text-[17px] sm:text-lg leading-relaxed">
              <p>{COACH.bio}</p>
              <p>{COACH.bio2}</p>
            </div>

            <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl">
              {COACH.chips.map((c, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream-200 border border-ink-700/10 text-teal-deep"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4 12 10 18 20 6" />
                    </svg>
                  </span>
                  <span className="text-ink-900 text-[15px] sm:text-base">{c.v}</span>
                </li>
              ))}
            </ul>

            {COACH.pullQuote && (
              <blockquote className="mt-12 border-l-4 border-gold pl-5 sm:pl-6 max-w-3xl">
                <p className="display text-2xl sm:text-3xl leading-snug text-ink-900">
                  <span className="italic font-semibold">&ldquo;{COACH.pullQuote.split('. ')[0]}.</span>{' '}
                  <span className="text-teal-deep">{COACH.pullQuote.split('. ').slice(1).join('. ')}&rdquo;</span>
                </p>
              </blockquote>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
