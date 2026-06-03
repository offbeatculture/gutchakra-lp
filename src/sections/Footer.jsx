import React from 'react';
import { BRAND } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="border-t border-ink-700/10 py-10 container-px max-shell">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm text-ink-500">
        <p>© {new Date().getFullYear()} {BRAND.name} · Dr. Valarrmathi Srinivasan · All rights reserved.</p>
        <nav className="flex gap-5">
          <a href="/privacy" className="hover:text-ink-900">Privacy</a>
          <a href="/terms" className="hover:text-ink-900">Terms</a>
          <a href="mailto:hello@example.com" className="hover:text-ink-900">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
