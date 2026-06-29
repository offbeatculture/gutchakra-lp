import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_URL = 'https://join.askvalarrmathi.com/gcr-wap';

export default function ThankYou() {
  useEffect(() => {
    document.title = 'You\u2019re In · Gut Chakra Reset';
    try {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'Purchase-99Gut', { value: 99, currency: 'INR' });
      }
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({ event: 'purchase', value: 99, currency: 'INR', product: 'GCR-99' });
      }
    } catch {}
  }, []);

  return (
    <main className="min-h-screen bg-cream-50 text-ink-900 flex flex-col items-center justify-center px-5 py-20 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-[480px] w-[480px] rounded-full bg-teal-mist/50 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-[420px] w-[420px] rounded-full bg-gold-soft/30 blur-3xl" />
      </div>

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className="h-24 w-24 rounded-full border-2 border-teal-deep/60 flex items-center justify-center"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-12 w-12 text-teal-deep" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 12 10 18 20 6" />
        </svg>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="eyebrow text-teal-deep mt-7"
      >
        PAYMENT CONFIRMED
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="display text-4xl sm:text-6xl mt-4 text-center text-balance"
      >
        Congrats on <span className="italic text-teal-deep">Joining!</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 max-w-xl text-center text-lg text-ink-700"
      >
        Your spot for the <strong className="text-ink-900">Gut Chakra Reset</strong> is confirmed.
        We can&rsquo;t wait to see you there!
      </motion.p>

      <motion.a
        href={WHATSAPP_URL}
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 220, damping: 20 }}
        className="btn-primary mt-10 text-lg"
      >
        👉 Click here to join WhatsApp Group
      </motion.a>

      <p className="mt-4 max-w-md text-center text-sm text-ink-500">
        Important details and the Zoom link will be shared in the group.
      </p>

      <div className="mt-16 inline-flex items-center gap-2.5 text-ink-700">
        <span className="h-7 w-7 rounded-full bg-teal-deep border-2 border-gold/70" aria-hidden />
        <span className="display text-lg">Gut Chakra <span className="italic text-teal-deep">Reset</span></span>
      </div>
    </main>
  );
}
