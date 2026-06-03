import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// =====================================================================
// PainAnimation — six richer, more illustrated animated SVGs.
// Each one is a small *scene* (not just an icon) keyed to its pain line.
// Color-filled, multi-layer, looping, ~96×96 inside the card slot.
// =====================================================================

const C = {
  ink:      '#2A2520',
  rose:     '#C94B6D',
  roseSoft: '#F4C8D2',
  roseDeep: '#9A2F4F',
  teal:     '#0E5448',
  tealMist: '#A8D4C8',
  gold:     '#C7995A',
  cream:    '#FBF7F0',
  sand:     '#E8D9C4',
};

export default function PainAnimation({ kind }) {
  const reduce = useReducedMotion();
  const p = { reduce };
  switch (kind) {
    case 'homefood':  return <HomeFood  {...p} />;
    case 'outside':   return <Outside   {...p} />;
    case 'doctors':   return <Doctors   {...p} />;
    case 'heaviness': return <Heaviness {...p} />;
    case 'everyday':  return <EveryDay  {...p} />;
    case 'managing':  return <Managing  {...p} />;
    default:          return null;
  }
}

// ─── 01 · Home-cooked food, no improvement ──────────────────────────
function HomeFood({ reduce }) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden>
      {/* Plate */}
      <ellipse cx="60" cy="78" rx="44" ry="9" fill={C.ink} opacity="0.15" />
      <ellipse cx="60" cy="74" rx="42" ry="10" fill={C.cream} stroke={C.ink} strokeWidth="1.4" />
      <ellipse cx="60" cy="72" rx="32" ry="7"  fill="#F8E9D1" stroke={C.ink} strokeWidth="1" />
      {/* Rice mound */}
      <path d="M40 72 Q60 56 80 72 Z" fill="#FFFFFF" stroke={C.ink} strokeWidth="1" />
      <circle cx="50" cy="66" r="1.2" fill={C.ink} opacity="0.5" />
      <circle cx="58" cy="62" r="1.2" fill={C.ink} opacity="0.5" />
      <circle cx="66" cy="64" r="1.2" fill={C.ink} opacity="0.5" />
      {/* Dal bowl */}
      <circle cx="44" cy="70" r="6" fill={C.gold} stroke={C.ink} strokeWidth="0.8" />
      {/* Curry bowl */}
      <circle cx="78" cy="70" r="6" fill={C.rose} opacity="0.7" stroke={C.ink} strokeWidth="0.8" />
      {/* Heart (it was made with love) */}
      <motion.path
        d="M22 30 q-6 -10 -12 -2 q-6 8 12 18 q18 -10 12 -18 q-6 -8 -12 2 Z"
        fill={C.rose} opacity="0.8"
        animate={reduce ? undefined : { scale: [1, 1.1, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '22px 36px' }}
      />
      {/* Steam (sad / barely there) */}
      {[44, 60, 76].map((x, i) => (
        <motion.path key={i}
          d={`M${x} 50 q-3 -6 0 -10 q3 -4 0 -8`}
          stroke={C.tealMist} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7"
          animate={reduce ? undefined : { y: [0, -10, -20], opacity: [0.7, 0.3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }}
        />
      ))}
      {/* Cross — "still no improvement" */}
      <motion.g
        animate={reduce ? undefined : { opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '95px 30px' }}
      >
        <circle cx="95" cy="30" r="11" fill={C.rose} />
        <path d="M90 25 l10 10 M100 25 l-10 10" stroke={C.cream} strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

// ─── 02 · Avoiding eating outside ───────────────────────────────────
function Outside({ reduce }) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden>
      {/* Restaurant building */}
      <rect x="22" y="42" width="76" height="60" rx="2" fill={C.sand} stroke={C.ink} strokeWidth="1.4" />
      {/* Roof / sign */}
      <path d="M18 42 L60 24 L102 42 Z" fill={C.rose} stroke={C.ink} strokeWidth="1.4" opacity="0.9" />
      {/* Door */}
      <rect x="50" y="74" width="20" height="28" rx="1" fill={C.cream} stroke={C.ink} strokeWidth="1" />
      <circle cx="65" cy="88" r="1.2" fill={C.ink} />
      {/* Windows */}
      <rect x="30" y="56" width="14" height="12" fill={C.tealMist} stroke={C.ink} strokeWidth="0.9" />
      <rect x="76" y="56" width="14" height="12" fill={C.tealMist} stroke={C.ink} strokeWidth="0.9" />
      {/* Awning stripes */}
      <path d="M18 42 L102 42 L96 50 L24 50 Z" fill={C.rose} opacity="0.4" />
      {/* Big NO symbol over it */}
      <motion.g
        animate={reduce ? undefined : { opacity: [0.85, 1, 0.85], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '60px 70px' }}
      >
        <circle cx="60" cy="70" r="34" fill="none" stroke={C.rose} strokeWidth="5" opacity="0.85" />
        <line x1="36" y1="46" x2="84" y2="94" stroke={C.rose} strokeWidth="5" strokeLinecap="round" opacity="0.85" />
      </motion.g>
    </svg>
  );
}

// ─── 03 · Doctors, medicines, keeps coming back ─────────────────────
function Doctors({ reduce }) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden>
      {/* Pill bottle */}
      <rect x="18" y="40" width="30" height="54" rx="4" fill={C.cream} stroke={C.ink} strokeWidth="1.4" />
      <rect x="15" y="34" width="36" height="10" rx="2" fill={C.ink} />
      <rect x="22" y="52" width="22" height="12" rx="1" fill={C.rose} opacity="0.85" />
      <text x="33" y="61" fontSize="7" fill={C.cream} textAnchor="middle" fontFamily="monospace">Rx</text>
      {/* Stethoscope-y curve (doctor) */}
      <path d="M64 30 q12 4 12 18 v18 q0 8 10 8 q10 0 10 -8 v-6"
            stroke={C.teal} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="96" cy="58" r="5" fill={C.tealMist} stroke={C.teal} strokeWidth="1.5" />
      {/* Circular arrow — keeps coming back */}
      <motion.g
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '78px 92px' }}
      >
        <path d="M62 92 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0"
              stroke={C.rose} strokeWidth="2.4" fill="none" strokeDasharray="4 4" />
        <path d="M92 88 l4 6 l-7 1 Z" fill={C.rose} />
      </motion.g>
      {/* Inner "again" label */}
      <text x="78" y="95" fontSize="8" fill={C.rose} textAnchor="middle" fontStyle="italic" fontFamily="serif">again</text>
    </svg>
  );
}

// ─── 04 · Heaviness in stomach that never goes away ─────────────────
function Heaviness({ reduce }) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden>
      {/* Body silhouette */}
      <circle cx="60" cy="24" r="10" fill={C.cream} stroke={C.ink} strokeWidth="1.3" />
      <path d="M40 38 Q60 32 80 38 L84 92 Q60 100 36 92 Z"
            fill={C.cream} stroke={C.ink} strokeWidth="1.4" />
      {/* Stomach pouch */}
      <path d="M48 62 Q60 56 72 62 Q78 72 72 82 Q60 88 48 82 Q42 72 48 62 Z"
            fill={C.roseSoft} stroke={C.ink} strokeWidth="1.2" />
      {/* Heavy weight on top of stomach */}
      <motion.g
        animate={reduce ? undefined : { y: [0, 2, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="40" y="48" width="40" height="14" rx="2" fill={C.ink} />
        <rect x="44" y="44" width="32" height="6" rx="1" fill={C.ink} />
        <text x="60" y="58" fontSize="8" fill={C.cream} textAnchor="middle" fontWeight="700" fontFamily="sans-serif">5KG</text>
      </motion.g>
      {/* Compression lines on stomach */}
      <motion.g stroke={C.rose} strokeWidth="1.4" fill="none" strokeLinecap="round"
        animate={reduce ? undefined : { opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M42 76 l-6 0" />
        <path d="M78 76 l6 0" />
        <path d="M44 84 l-5 3" />
        <path d="M76 84 l5 3" />
      </motion.g>
    </svg>
  );
}

// ─── 05 · Bloating / acidity is every day ──────────────────────────
function EveryDay({ reduce }) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden>
      {/* Calendar */}
      <rect x="18" y="26" width="84" height="78" rx="4" fill={C.cream} stroke={C.ink} strokeWidth="1.4" />
      <rect x="18" y="26" width="84" height="14" fill={C.teal} />
      <line x1="36" y1="18" x2="36" y2="34" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="84" y1="18" x2="84" y2="34" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" />
      {/* Grid */}
      {[0, 1, 2, 3].map(r =>
        [0, 1, 2, 3, 4, 5].map(c => (
          <rect key={r+'-'+c}
            x={20 + c * 13.6} y={42 + r * 15.5} width="13.6" height="15.5"
            fill="none" stroke={C.ink} strokeOpacity="0.18" strokeWidth="0.8" />
        ))
      )}
      {/* Flames on every day */}
      {Array.from({ length: 24 }).map((_, i) => {
        const r = Math.floor(i / 6), c = i % 6;
        const cx = 27 + c * 13.6, cy = 50 + r * 15.5;
        return (
          <motion.path key={'f'+i}
            d={`M${cx} ${cy+4} q-3 -3 0 -6 q1 1 0 -3 q3 3 1 5 q3 -1 1 4 q-1 3 -2 0 z`}
            fill={C.rose} stroke={C.roseDeep} strokeWidth="0.6"
            animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], scale: [0.85, 1.05, 0.85] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        );
      })}
    </svg>
  );
}

// ─── 06 · Tired of managing symptoms ───────────────────────────────
function Managing({ reduce }) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden>
      {/* Clipboard */}
      <rect x="22" y="20" width="76" height="84" rx="3" fill={C.cream} stroke={C.ink} strokeWidth="1.4" />
      <rect x="46" y="14" width="28" height="10" rx="2" fill={C.ink} />
      {/* Checklist rows */}
      {[
        { label: 'Bloating',    y: 38 },
        { label: 'Acidity',     y: 54 },
        { label: 'Heaviness',   y: 70 },
        { label: 'Gas',         y: 86 },
      ].map((row, i) => (
        <g key={i}>
          {/* checkbox */}
          <rect x="30" y={row.y - 7} width="10" height="10" rx="2" fill="none" stroke={C.ink} strokeWidth="1.2" />
          {/* check (cycles through) */}
          <motion.path d={`M32 ${row.y - 2} l3 3 l5 -6`}
            stroke={C.rose} strokeWidth="1.8" fill="none" strokeLinecap="round"
            animate={reduce ? undefined : { opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
          />
          {/* text */}
          <text x="46" y={row.y} fontSize="9" fill={C.ink} fontFamily="sans-serif">{row.label}</text>
          {/* strike-through */}
          <motion.line
            x1="44" y1={row.y - 2} x2="44" y2={row.y - 2}
            stroke={C.rose} strokeWidth="1.4" strokeLinecap="round"
            animate={reduce ? undefined : { x2: [44, 92], opacity: [0, 1, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.4 + 0.4, ease: 'easeInOut' }}
          />
        </g>
      ))}
      {/* Sighing arrow — endless cycle */}
      <motion.path d="M30 100 q30 -6 60 0"
        stroke={C.rose} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeDasharray="4 3"
        animate={reduce ? undefined : { strokeDashoffset: [0, -14] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}
