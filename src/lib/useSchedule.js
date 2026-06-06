import { useEffect, useState } from 'react';

// Live-fetches the workshop date/time from the published Google Sheet.
// Sheet: "Gut Chakra Leads Auto" → tab "Date Change Sheet" (A=Date, B=Time).
// The tab is Published to web as CSV (File → Share → Publish to web → CSV),
// which exposes a public, CORS-enabled endpoint the browser can read directly.
// Change A2/B2 in the sheet and every landing page updates automatically.
const SHEET_CSV =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLYJKMMbanrBDloO9mt_B7sU1jtA2WO1pMJ6ztiY03JG4r8OrDV8DzetRUXNUMbSfUQ8kUatqSccfD/pub?gid=1147422921&single=true&output=csv';

// Re-check the sheet periodically so an open tab picks up date changes
// without a manual reload.
const REFRESH_MS = 5 * 60 * 1000;

// Parse a single CSV line into fields, honouring optional double-quotes
// and escaped quotes ("").
function parseCsvLine(line) {
  const out = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      out.push(field);
      field = '';
    } else field += ch;
  }
  out.push(field);
  return out.map((c) => c.trim());
}

// Pull the first data row (row 2) of the Date/Time sheet.
function parseSchedule(csv) {
  if (!csv || /^\s*<(?:!doctype|html)/i.test(csv)) return null; // login/error HTML
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) return null;
  const row = parseCsvLine(lines[1]);
  const date = (row[0] || '').trim();
  const time = (row[1] || '').trim();
  if (!date || !time) return null;
  return { date, time };
}

export function useSchedule(fallback) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    let alive = true;

    const load = () =>
      fetch(SHEET_CSV, { cache: 'no-store' })
        .then((r) => (r.ok ? r.text() : null))
        .then((text) => {
          if (!alive || !text) return;
          const parsed = parseSchedule(text);
          if (parsed) setData(parsed);
        })
        .catch(() => {});

    load();
    const id = setInterval(load, REFRESH_MS);
    const onFocus = () => load();
    window.addEventListener('focus', onFocus);

    return () => {
      alive = false;
      clearInterval(id);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  return data;
}
