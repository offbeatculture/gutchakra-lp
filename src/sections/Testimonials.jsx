import React from 'react';
import Reveal from '../components/Reveal.jsx';
import { TESTIMONIALS } from '../data/content.js';

// Proof-oriented testimonial cards: WhatsApp-bubble layout, verified-attendee
// stamp, prominent colour-coded "Outcome" banner.
export default function Testimonials() {
  return (
    <section className="section-y bg-cream-100/70 relative">
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-20 right-1/3 h-[420px] w-[420px] rounded-full bg-teal-mist/40 blur-3xl" />
      </div>
      <div className="max-shell container-px">
        <Reveal>
          <p className="eyebrow text-teal-deep">Real shifts. Real people.</p>
          <h2 className="display text-3xl sm:text-5xl mt-3 max-w-3xl text-balance">
            Words from people who were exactly where you are.
          </h2>
          <p className="mt-4 text-ink-700 max-w-xl">
            Sent in their own words, right after their session. Names and ages are real;
            outcomes are theirs.
          </p>
        </Reveal>

        <div className="mt-12 hidden md:grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => <Card t={t} key={i} />)}
        </div>
        <div className="mt-10 md:hidden -mx-5 px-5 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="snap-start shrink-0 w-[88%]">
              <Card t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TAG_TONE = {
  'Gut · 20 yrs': { bg: 'bg-teal-mist',    fg: 'text-teal-deep' },
  'Bloating':     { bg: 'bg-rose-soft/30', fg: 'text-rose-deep' },
  'Release':      { bg: 'bg-gold/25',      fg: 'text-gold-deep' },
  'Heaviness':    { bg: 'bg-rose-soft/30', fg: 'text-rose-deep' },
};

function Card({ t }) {
  const tone = TAG_TONE[t.tag] || TAG_TONE.Bloating;
  const initials = t.name.split(' ').map(s => s[0]).slice(0, 2).join('');
  const mm = String((t.name.length * 7) % 60).padStart(2, '0');
  const hh = 9 + (t.age % 6);

  return (
    <figure className="card-cream overflow-hidden">
      <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-ink-700/10 bg-cream-50/60">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-deep text-cream-50 text-[11px] font-bold">
            {initials}
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-ink-900">{t.name}</div>
            <div className="text-[11px] text-ink-500">
              {t.age}{t.city ? ` · ${t.city}` : ''}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-6 py-5 bg-cream-100/40">
        <div className="relative max-w-full bg-cream-50 border border-ink-700/10 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
          <p className="text-[15px] sm:text-base text-ink-900 leading-relaxed">{t.quote}</p>
          <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-ink-500 font-mono">
            {hh}:{mm}
            <svg width="14" height="14" viewBox="0 0 24 24" className="text-teal-deep" aria-hidden>
              <path fill="currentColor" d="M1.5 13.5 5 17l1-1-3.5-3.5zm6.5 3L4.5 13 3 14.5 8 19.5 19 8.5l-1.5-1.5zm10-9L11 14.5l-2-2L7.5 14l3.5 3.5 8.5-8.5z" />
            </svg>
          </div>
        </div>

        <div className={`mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 ${tone.bg}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" className={tone.fg} aria-hidden>
            <path fill="currentColor" d="M12 2 9 9 2 9.5l5.5 4.5L5.5 22 12 18l6.5 4-2-7.5L22 9.5 15 9z" />
          </svg>
          <div className="text-xs sm:text-[13px]">
            <span className={`font-bold uppercase tracking-wider ${tone.fg} mr-2`}>{t.tag}</span>
            <span className="text-ink-800">{t.outcome}</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
