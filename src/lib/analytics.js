// Thin analytics wrapper around dataLayer + fbq.
export const track = (event, payload = {}) => {
  try {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
    if (typeof window.fbq === 'function') {
      const map = { lead: 'Lead', form_submit: 'SubmitApplication', form_start: 'InitiateCheckout' };
      if (map[event]) window.fbq('track', map[event], payload);
    }
  } catch { /* analytics never breaks the page */ }
};
