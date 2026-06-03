import { useEffect, useState } from 'react';

// Live-fetches workshop date/time from the published Google Sheet.
// Sheet: https://docs.google.com/spreadsheets/d/12vTNZhtzhuSOscgPa7EZyN6FK1-X_pNBaCnqvVReApw
// Returns the hardcoded fallback immediately, then upgrades to the live value
// once the network request resolves.
const SHEET_CSV =
  'https://docs.google.com/spreadsheets/d/12vTNZhtzhuSOscgPa7EZyN6FK1-X_pNBaCnqvVReApw/gviz/tq?tqx=out:csv&sheet=Sheet1';

// Naive but safe CSV parser for our 2-column sheet.
function parseRow2(csv) {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) return null;
  const row = lines[1].split(/","/).map((c) => c.replace(/^"|"$/g, '').trim());
  return { date: row[0] || '', time: row[1] || '' };
}

export function useSchedule(fallback) {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    let alive = true;
    fetch(SHEET_CSV, { cache: 'no-store' })
      .then((r) => (r.ok ? r.text() : null))
      .then((text) => {
        if (!alive || !text) return;
        const parsed = parseRow2(text);
        if (parsed && parsed.date && parsed.time) setData(parsed);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);
  return data;
}
