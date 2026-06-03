import React, { useEffect, useState } from 'react';

function pad(n) { return n.toString().padStart(2, '0'); }

export default function Countdown({ targetISO, className = '' }) {
  const [t, setT] = useState(() => diff(targetISO));
  useEffect(() => {
    const id = setInterval(() => setT(diff(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  if (t.total <= 0) {
    return <span className={className}>Starting now</span>;
  }

  return (
    <span className={`font-mono ${className}`} aria-label="Time until start">
      {t.d > 0 && <>{t.d}d </>}
      {pad(t.h)}<span className="opacity-50">:</span>{pad(t.m)}<span className="opacity-50">:</span>{pad(t.s)}
    </span>
  );
}

function diff(iso) {
  const total = new Date(iso).getTime() - Date.now();
  if (total <= 0) return { total: 0, d: 0, h: 0, m: 0, s: 0 };
  const d = Math.floor(total / 86400000);
  const h = Math.floor((total / 3600000) % 24);
  const m = Math.floor((total / 60000) % 60);
  const s = Math.floor((total / 1000) % 60);
  return { total, d, h, m, s };
}
