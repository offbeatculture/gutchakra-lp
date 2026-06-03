import React from 'react';
import Reveal from '../components/Reveal.jsx';
import BookButton from '../components/BookButton.jsx';
import { FINAL_CTA, WORKSHOP } from '../data/content.js';
import { useSchedule } from '../lib/useSchedule.js';

export default function FinalCTA() {
  const sched = useSchedule({ date: WORKSHOP.date, time: WORKSHOP.time });

  return (
    <section className="section-y relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-rose-soft/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-teal-mist/60 blur-3xl" />
      </div>
      <div className="max-shell container-px">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="eyebrow text-rose-saree">{FINAL_CTA.eyebrow}</p>
            <h2 className="display text-4xl sm:text-6xl mt-3 text-balance">
              <span className="pain-strong">{FINAL_CTA.title}</span>{' '}
              <span className="promise-strong">{FINAL_CTA.titleAfter}</span>
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-ink-700">{FINAL_CTA.sub}</p>

            <div className="mt-10">
              <BookButton className="btn-primary w-full sm:w-auto text-lg">
                Yes! I Want This — Only {WORKSHOP.currency}{WORKSHOP.priceFinal}
                <span className="arr" aria-hidden>→</span>
              </BookButton>
              <p className="mt-3 text-xs text-ink-500">
                {sched.date} · {sched.time}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
