import React from 'react';
import { motion } from 'framer-motion';
import { HERO, WORKSHOP } from '../data/content.js';
import GutBodyAnimation from '../components/GutBodyAnimation.jsx';
import BookButton from '../components/BookButton.jsx';
import { useOfferTimer, pad } from '../lib/offerTimer.js';
import { useSchedule } from '../lib/useSchedule.js';

export default function Hero() {
  const { mm, ss, expired } = useOfferTimer();
  const sched = useSchedule({ date: WORKSHOP.date, time: WORKSHOP.time });

  return (
    <section id="top" className="relative overflow-hidden pt-8 sm:pt-12 pb-16 sm:pb-24">
      {/* Atmosphere */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-24 h-[420px] w-[420px] rounded-full bg-rose-soft/30 blur-3xl" />
        <div className="absolute top-40 right-0 h-[480px] w-[480px] rounded-full bg-teal-mist/60 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-[420px] w-[420px] rounded-full bg-gold-soft/30 blur-3xl" />
      </div>

      {/* Mini brand bar */}
      <div className="max-shell container-px mb-8 flex items-center justify-between text-sm">
        <span className="display text-xl sm:text-2xl">Gut Chakra Reset</span>
        <span className="hidden sm:inline text-ink-500 font-mono text-xs tracking-wider uppercase">
          with Dr. Valarrmathi Srinivasan
        </span>
      </div>

      <div className="max-shell container-px grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT */}
        <div className="lg:col-span-7">
          {/* Eyebrow date pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-cream-100 border border-ink-700/15 px-4 py-1.5 mb-7">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-rose-saree animate-pulseDot opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-saree" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-ink-800">
              {HERO.eyebrow}
            </span>
          </div>

          {/* Headline — readable: ink for connectors, rose-deep italic for pain, teal for promise */}
          <h1 className="hero-display text-balance">
            <span className="text-ink-900">{HERO.preStack} </span>
            {HERO.painStack.map((w, i) => (
              <React.Fragment key={i}>
                <span className="pain-strong">{w}</span>{' '}
              </React.Fragment>
            ))}
            <span className="block mt-2 sm:mt-3">
              <span className="text-ink-900">{HERO.promiseLead} </span>
              <span className="promise-strong">{HERO.promise}</span>
            </span>
          </h1>

          <p className="mt-7 text-lg sm:text-xl text-ink-700 max-w-2xl leading-relaxed">
            {HERO.sub}
          </p>

          {/* PRICE — open slashed + offer price */}
          <div className="mt-9 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="eyebrow text-ink-500">Webinar price</span>
            <span className="strike-old display text-2xl sm:text-3xl">
              {WORKSHOP.currency}{WORKSHOP.priceAnchor}
            </span>
            <span className="display text-4xl sm:text-5xl text-teal-deep tabular-nums">
              {WORKSHOP.currency}{WORKSHOP.priceFinal}
            </span>
            <span className="text-sm text-rose-saree font-medium">
              offer ends soon
            </span>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-5">
            <BookButton className="btn-primary text-base sm:text-lg w-full sm:w-auto">
              Reserve your seat — {WORKSHOP.currency}{WORKSHOP.priceFinal}
              <span className="arr" aria-hidden>→</span>
            </BookButton>

            {/* Hard 10-min offer timer */}
            <div className="text-sm">
              <div className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-rose-saree">
                {expired ? 'Final seats only' : 'Offer expires in'}
              </div>
              <div className="font-mono text-2xl text-ink-900 tabular-nums">
                {pad(mm)}<span className="opacity-40">:</span>{pad(ss)}
              </div>
            </div>
          </div>

          {/* Workshop meta */}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2 text-ink-700">
              <Dot /> On Zoom · 3 hours
            </span>
            <span className="inline-flex items-center gap-2 text-ink-700">
              <Dot /> <span className="text-ink-900 font-medium">{sched.date}</span>
            </span>
            <span className="inline-flex items-center gap-2 text-ink-700">
              <Dot /> {sched.time}
            </span>
          </div>

          {/* Trust */}
          <div className="mt-7 flex items-center gap-3">
            <AvatarStack />
            <p className="text-sm text-ink-700">{HERO.socialProof}</p>
          </div>
        </div>

        {/* RIGHT — anatomical animation */}
        <div className="lg:col-span-5">
          <GutBodyAnimation />
        </div>
      </div>
    </section>
  );
}

const Dot = () => (
  <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-deep" />
);

function AvatarStack() {
  const seeds = [
    { bg: '#0E5448', fg: '#FBF7F0', t: 'VJ' },
    { bg: '#C7995A', fg: '#13110E', t: 'AN' },
    { bg: '#C94B6D', fg: '#FBF7F0', t: 'NM' },
    { bg: '#E8D9C4', fg: '#13110E', t: 'RJ' },
    { bg: '#1F1C17', fg: '#FBF7F0', t: 'SR' },
  ];
  return (
    <div className="flex -space-x-2" aria-hidden>
      {seeds.map((s, i) => (
        <span key={i}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold ring-2 ring-cream-50"
          style={{ background: s.bg, color: s.fg }}>{s.t}</span>
      ))}
    </div>
  );
}
