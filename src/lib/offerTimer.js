// 10-minute "hard offer expiry" timer — Russell-Brunson style.
// - Starts the moment a visitor lands (per session).
// - Persists across refresh via localStorage so users can't reset it
//   by reloading mid-decision.
// - Exposes a hook returning { mm, ss, total, expired }.
// - The CTA still works after expiry (we never block payment) — the
//   timer is for *urgency*, not for actually locking people out.
import { useEffect, useState } from 'react';
import { WORKSHOP } from '../data/content.js';

const KEY = 'gcr_offer_expires_at_v1';
const WINDOW_MS = WORKSHOP.offerWindowMinutes * 60 * 1000;

function getOrSetExpiry() {
  if (typeof window === 'undefined') return Date.now() + WINDOW_MS;
  try {
    const v = Number(localStorage.getItem(KEY));
    if (v && v > Date.now() - 24 * 60 * 60 * 1000) return v;
    const next = Date.now() + WINDOW_MS;
    localStorage.setItem(KEY, String(next));
    return next;
  } catch {
    return Date.now() + WINDOW_MS;
  }
}

function compute(expiresAt) {
  const total = Math.max(0, expiresAt - Date.now());
  const mm = Math.floor(total / 60000);
  const ss = Math.floor((total % 60000) / 1000);
  return { total, mm, ss, expired: total <= 0 };
}

export function useOfferTimer() {
  const [expiresAt] = useState(getOrSetExpiry);
  const [state, setState] = useState(() => compute(expiresAt));
  useEffect(() => {
    const id = setInterval(() => setState(compute(expiresAt)), 1000);
    return () => clearInterval(id);
  }, [expiresAt]);
  return state;
}

export function pad(n) { return String(n).padStart(2, '0'); }
