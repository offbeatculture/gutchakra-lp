import React from 'react';
import Reveal from '../components/Reveal.jsx';
import CountUp from '../components/CountUp.jsx';
import { STATS } from '../data/content.js';

export default function StatsBand() {
  return (
    <section className="relative section-y bg-teal-deep text-cream-50 overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-30">
        <div className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-teal-mist/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-gold/20 blur-3xl" />
      </div>
      <div className="max-shell container-px relative">
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center sm:text-left">
                <div className="display text-6xl sm:text-7xl font-semibold text-gold">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-cream-200/90 max-w-xs mx-auto sm:mx-0 leading-relaxed">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
