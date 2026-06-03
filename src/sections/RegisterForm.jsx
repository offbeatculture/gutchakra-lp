import React, { useEffect, useState } from 'react';
import { WORKSHOP, PROFESSIONS, RAZORPAY } from '../data/content.js';
import { track } from '../lib/analytics.js';
import { useSchedule } from '../lib/useSchedule.js';

const WEBHOOK_URL = '';        // paste n8n webhook here when ready
const FALLBACK_SHEET_URL = ''; // paste Apps Script /exec URL here

function buildRazorpayUrl({ name, email, whatsapp, profession }) {
  const m = RAZORPAY.paramMap;
  const url = new URL(RAZORPAY.pageUrl);
  url.searchParams.set(m.name,       name);
  url.searchParams.set(m.email,      email);
  url.searchParams.set(m.whatsapp,   whatsapp);
  url.searchParams.set(m.profession, profession);
  url.searchParams.set(m.amount,     String(WORKSHOP.priceFinal));
  url.searchParams.set(m.source,     RAZORPAY.sourceValue);
  if (RAZORPAY.appendCheckoutPrefill) {
    url.searchParams.set('prefill[name]',    name);
    url.searchParams.set('prefill[email]',   email);
    url.searchParams.set('prefill[contact]', whatsapp);
  }
  return url.toString();
}

function Field({ id, label, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink-800 mb-1.5">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
      {error && <p role="alert" className="mt-1 text-xs text-rose-saree">{error}</p>}
    </div>
  );
}

export default function RegisterForm() {
  const sched = useSchedule({ date: WORKSHOP.date, time: WORKSHOP.time });
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', profession: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [startedTracked, setStartedTracked] = useState(false);

  useEffect(() => { track('form_view', { page: 'lp_inline' }); }, []);

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (!startedTracked) { track('form_start'); setStartedTracked(true); }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email.';
    const w = form.whatsapp.replace(/\D/g, '');
    if (w.length < 10) e.whatsapp = 'Enter a valid WhatsApp number with country code.';
    if (!form.profession) e.profession = 'Please pick one.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true); setSubmitError('');

    const payload = {
      ...form,
      whatsapp: form.whatsapp.replace(/\s+/g, ''),
      total: WORKSHOP.priceFinal,
      currency: WORKSHOP.currency,
      source: RAZORPAY.sourceValue,
      ts: new Date().toISOString(),
    };
    track('form_submit', { total: WORKSHOP.priceFinal });

    const send = (url) => fetch(url, {
      method: 'POST', keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => null);

    try {
      if (WEBHOOK_URL)        send(WEBHOOK_URL);
      if (FALLBACK_SHEET_URL) send(FALLBACK_SHEET_URL);
      track('lead', { value: WORKSHOP.priceFinal });

      const url = buildRazorpayUrl(payload);
      setTimeout(() => window.location.assign(url), 80);
    } catch {
      setSubmitError('Something went wrong. Try once more — your payment is safe.');
      setSubmitting(false);
    }
  };

  return (
    <section id="register" className="relative section-y scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-[360px] w-[640px] rounded-full bg-teal-mist/50 blur-3xl" />
      </div>

      <div className="max-shell container-px">
        <div className="mx-auto max-w-2xl card-cream pad">
          {/* Price banner */}
          <div className="text-center">
            <p className="eyebrow text-rose-saree">Reserve your seat</p>
            <div className="mt-3 flex items-baseline justify-center gap-3">
              <span className="strike-old display text-2xl sm:text-3xl">
                {WORKSHOP.currency}{WORKSHOP.priceAnchor}
              </span>
              <span className="display text-5xl sm:text-6xl text-teal-deep tabular-nums">
                {WORKSHOP.currency}{WORKSHOP.priceFinal}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-500">
              {sched.date} · {sched.time} · on Zoom
            </p>
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
            <Field id="name" label="Full name" error={errors.name}>
              <input id="name" type="text" autoComplete="name" required
                className="input" placeholder="e.g. Priya Sharma"
                value={form.name} onChange={update('name')} />
            </Field>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="email" label="Email" error={errors.email}>
                <input id="email" type="email" autoComplete="email" required
                  className="input" placeholder="you@email.com"
                  value={form.email} onChange={update('email')} />
              </Field>
              <Field id="whatsapp" label="WhatsApp number" error={errors.whatsapp}>
                <input id="whatsapp" type="tel" autoComplete="tel" required
                  className="input" placeholder="98XXXXXXXX"
                  value={form.whatsapp} onChange={update('whatsapp')} />
              </Field>
            </div>

            <Field id="profession" label="What do you do?" error={errors.profession}>
              <select id="profession" required
                className="input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22><path fill=%22%233A342B%22 d=%22M6 8 0 0h12z%22/></svg>')] bg-no-repeat bg-[right_1rem_center]"
                value={form.profession} onChange={update('profession')}>
                <option value="">Select one…</option>
                {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>

            {submitError && (
              <div role="alert" className="rounded-xl bg-rose-soft/30 border border-rose-saree/40 text-rose-saree text-sm px-4 py-3">
                {submitError}
              </div>
            )}

            <button type="submit" disabled={submitting}
              className="btn-primary w-full text-lg">
              {submitting
                ? 'Securing your seat…'
                : <>Yes! I Want This — Pay {WORKSHOP.currency}{WORKSHOP.priceFinal} <span className="arr" aria-hidden>→</span></>}
            </button>

            <ul className="pt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-ink-500">
              <li>✓ Secure payment via Razorpay</li>
              <li>✓ Joining link on WhatsApp + email</li>
            </ul>
          </form>
        </div>
      </div>
    </section>
  );
}
