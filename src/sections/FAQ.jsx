import React, { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { FAQS } from '../data/content.js';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-y container-px max-shell">
      <Reveal>
        <p className="eyebrow text-teal-deep">Honest answers</p>
        <h2 className="display text-3xl sm:text-5xl mt-3 max-w-3xl text-balance">
          The questions people ask before they register.
        </h2>
      </Reveal>

      <div className="mt-10 max-w-3xl">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={i * 0.04}>
              <div className="border-b border-ink-700/15">
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="text-lg sm:text-xl font-semibold text-ink-900">{f.q}</span>
                  <span aria-hidden
                    className={`shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-700/20 transition-transform duration-300
                      ${isOpen ? 'rotate-45 bg-teal-deep text-cream-50 border-teal-deep' : 'text-ink-700'}`}
                  >+</span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-300 ease-out"
                     style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-ink-700 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
