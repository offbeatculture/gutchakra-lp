import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOfferTimer, pad } from '../lib/offerTimer.js';
import BookButton from './BookButton.jsx';
import { HERO } from '../data/content.js';

// Sticky bottom bar — appears once the user scrolls past the hero.
// Shows the live 10-min offer timer + the same unlock CTA.
export default function StickyBar() {
  const [visible, setVisible] = useState(false);
  const { mm, ss, expired } = useOfferTimer();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed bottom-0 inset-x-0 z-40 px-3 sm:px-4 pb-3 sm:pb-4"
          role="region" aria-label="Offer bar"
        >
          <div className="mx-auto max-w-4xl rounded-2xl bg-ink-900 text-cream-50 shadow-2xl border border-ink-700/40 overflow-hidden">
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3">
              <div className="hidden sm:flex shrink-0 items-center gap-2 px-3 py-1.5 rounded-full bg-rose-saree/20 border border-rose-saree/40">
                <span className="h-2 w-2 rounded-full bg-rose-saree animate-pulseDot" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-rose-soft">
                  {expired ? 'Last call' : 'Offer ends in'}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-mono text-lg sm:text-xl tabular-nums leading-none flex items-baseline gap-2">
                  <span className={expired ? 'text-rose-saree' : 'text-gold'}>
                    {pad(mm)}:{pad(ss)}
                  </span>
                  <span className="hidden sm:inline text-xs text-cream-200/70 font-sans">
                    {expired ? 'final seats only' : 'before price increases'}
                  </span>
                </div>
                <div className="sm:hidden text-[11px] text-cream-200/70 mt-0.5">
                  {expired ? 'final seats only' : 'before price increases'}
                </div>
              </div>

              <BookButton className="inline-flex items-center justify-center gap-2 rounded-full bg-gold text-ink-900 px-4 sm:px-5 py-2.5 text-sm sm:text-[15px] font-semibold hover:bg-amber transition shrink-0">
                <span className="hidden sm:inline">Claim my spot — ₹{99}</span>
                <span className="sm:hidden">Claim ₹99 spot</span>
                <span aria-hidden>→</span>
              </BookButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
