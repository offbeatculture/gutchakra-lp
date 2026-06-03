import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// =====================================================================
// GutBodyAnimation — richer hero centrepiece.
// Now a fully-rendered torso with stomach + small intestine + colon, plus:
//  - distress mode: red inflammation, heat ripples, jagged "gas" bursts,
//    irregular contractions, nerve fire from brain to gut
//  - reset mode:   smooth peristaltic wave through the digestive tract,
//    cool teal glow, gentle breath ring, calm aura
// Loops on its own 4.5s + 4.5s. Respects prefers-reduced-motion.
// =====================================================================

const COL = {
  inkLine:   '#2A2520',
  bodyFill:  '#FBF7F0',
  bodyShade: '#EDE2CD',
  rose:      '#C94B6D',
  roseDeep:  '#9A2F4F',
  roseSoft:  '#F4C8D2',
  teal:      '#0E5448',
  tealGlow:  '#1A8775',
  tealMist:  '#A8D4C8',
  gold:      '#C7995A',
};

export default function GutBodyAnimation() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState('distress');

  useEffect(() => {
    if (reduce) { setPhase('reset'); return; }
    let alive = true;
    const loop = () => {
      if (!alive) return;
      setPhase('distress');
      setTimeout(() => alive && setPhase('reset'),  4600);
      setTimeout(() => alive && loop(), 9200);
    };
    loop();
    return () => { alive = false; };
  }, [reduce]);

  const isDistress = phase === 'distress';
  const accent = isDistress ? COL.rose : COL.teal;
  const accentSoft = isDistress ? COL.roseSoft : COL.tealMist;

  return (
    <div className="relative aspect-square w-full max-w-[560px] mx-auto">
      {/* Backdrop blobs */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-[40px]">
        <motion.div
          className="absolute -top-10 -left-10 h-72 w-72 rounded-full blur-3xl"
          style={{ background: isDistress ? 'rgba(201,75,109,0.32)' : 'rgba(168,212,200,0.55)' }}
          animate={reduce ? undefined : { scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl"
          style={{ background: isDistress ? 'rgba(199,153,90,0.25)' : 'rgba(14,84,72,0.18)' }}
          animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Phase pill (top-right) */}
      <motion.div
        key={phase}
        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-3 right-3 z-10 inline-flex items-center gap-2 rounded-full bg-cream-50/95 border border-ink-700/15 px-3.5 py-1.5 shadow-soft backdrop-blur"
      >
        <span className={`h-2 w-2 rounded-full ${isDistress ? 'bg-rose-saree animate-pulseDot' : 'bg-teal-deep'}`} />
        <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: accent }}>
          {isDistress ? 'Gut in distress' : 'Gut resetting'}
        </span>
      </motion.div>

      <svg viewBox="0 0 380 420" className="relative h-full w-full" role="img"
           aria-label="Anatomical illustration: digestive system showing distress, then resetting">
        <defs>
          {/* gradients */}
          <radialGradient id="gutAura" cx="50%" cy="55%" r="55%">
            <stop offset="0%"  stopColor={accent}     stopOpacity="0.55" />
            <stop offset="60%" stopColor={accent}     stopOpacity="0.10" />
            <stop offset="100%" stopColor={accent}    stopOpacity="0"    />
          </radialGradient>
          <linearGradient id="torso" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stopColor={COL.bodyFill} />
            <stop offset="100%" stopColor={COL.bodyShade} />
          </linearGradient>
          <linearGradient id="stomach" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stopColor={isDistress ? '#F2B0BF' : '#BFE0D6'} />
            <stop offset="100%" stopColor={isDistress ? COL.roseDeep : COL.teal} />
          </linearGradient>
          <linearGradient id="intest" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"  stopColor={isDistress ? COL.roseSoft : COL.tealMist} />
            <stop offset="100%" stopColor={isDistress ? COL.rose : COL.tealGlow} />
          </linearGradient>
          {/* Peristaltic wave clip path */}
          <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.7" fill={COL.inkLine} opacity="0.18" />
          </pattern>
        </defs>

        {/* AURA under the gut */}
        <motion.ellipse
          cx="190" cy="245" rx="120" ry="100" fill="url(#gutAura)"
          animate={reduce ? undefined : { scale: isDistress ? [1, 1.15, 1] : [1, 1.05, 1] }}
          transition={{ duration: isDistress ? 1.5 : 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '190px 245px' }}
        />

        {/* HEAD */}
        <g>
          <circle cx="190" cy="55" r="34" fill="url(#torso)" stroke={COL.inkLine} strokeWidth="1.5" />
          {/* Hair shading */}
          <path d="M158 50 Q170 22 190 22 Q215 22 224 52 Q210 36 190 36 Q170 36 158 50 Z"
                fill={COL.inkLine} opacity="0.85" />
          {/* Eyes — shut & strained in distress, calm in reset */}
          {isDistress ? (
            <>
              <path d="M174 58 q5 -4 10 0" stroke={COL.inkLine} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M196 58 q5 -4 10 0" stroke={COL.inkLine} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              {/* Furrowed brows */}
              <path d="M170 50 l10 -2" stroke={COL.inkLine} strokeWidth="1.4" strokeLinecap="round" />
              <path d="M200 48 l10 2" stroke={COL.inkLine} strokeWidth="1.4" strokeLinecap="round" />
              {/* Mouth — tight */}
              <path d="M182 72 q8 -3 16 0" stroke={COL.inkLine} strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M174 60 q5 3 10 0" stroke={COL.inkLine} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M196 60 q5 3 10 0" stroke={COL.inkLine} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M182 72 q8 4 16 0" stroke={COL.inkLine} strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </>
          )}
        </g>

        {/* Neck + shoulders */}
        <path d="M176 86 L176 102 Q190 100 204 102 L204 86 Z" fill="url(#torso)" stroke={COL.inkLine} strokeWidth="1.3" />

        {/* TORSO */}
        <path d="M110 116 Q190 100 270 116 L280 320 Q190 348 100 320 Z"
              fill="url(#torso)" stroke={COL.inkLine} strokeWidth="1.5" />
        <path d="M110 116 Q190 100 270 116 L280 320 Q190 348 100 320 Z"
              fill="url(#dots)" />

        {/* Arms */}
        <path d="M110 122 Q72 192 86 308" fill="none" stroke={COL.inkLine} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M270 122 Q308 192 294 308" fill="none" stroke={COL.inkLine} strokeWidth="1.5" strokeLinecap="round" />

        {/* === DIGESTIVE SYSTEM === */}
        {/* Esophagus */}
        <path d="M190 110 L190 165" stroke={COL.inkLine} strokeWidth="2" strokeLinecap="round" />

        {/* Stomach (J-shaped) */}
        <motion.path
          d="M168 168
             Q150 172 145 195
             Q142 222 165 232
             Q190 240 215 230
             Q232 220 230 195
             Q228 175 210 170
             Q198 165 190 168 Z"
          fill="url(#stomach)" stroke={COL.inkLine} strokeWidth="1.5"
          animate={reduce ? undefined : isDistress
            ? { scale: [1, 1.05, 0.97, 1.04, 1] }
            : { scale: [1, 1.025, 1] }
          }
          transition={{ duration: isDistress ? 1.6 : 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '188px 200px' }}
        />
        {/* Stomach rugae (texture lines) */}
        <g stroke={COL.inkLine} strokeWidth="0.8" fill="none" opacity="0.35">
          <path d="M160 196 q15 -4 30 0 q15 4 30 0" />
          <path d="M160 208 q15 -4 30 0 q15 4 30 0" />
          <path d="M160 220 q15 -4 30 0 q15 4 30 0" />
        </g>

        {/* Small intestine — coiled tube */}
        <motion.g
          stroke={COL.inkLine} strokeWidth="1.4" fill="none" strokeLinecap="round"
          animate={reduce ? undefined : { opacity: isDistress ? [0.85, 1, 0.85] : [1, 1, 1] }}
          transition={{ duration: isDistress ? 1.2 : 5, repeat: Infinity }}
        >
          <path d="M155 240 Q140 252 152 264 Q176 270 175 282 Q170 295 152 296 Q138 296 145 312
                   Q160 320 184 316 Q210 312 222 320 Q240 326 232 308 Q220 296 208 296
                   Q192 296 200 282 Q212 268 232 264 Q244 252 230 240"
                fill="url(#intest)" fillOpacity="0.55" />
        </motion.g>

        {/* Peristaltic wave dots (only in reset) */}
        {!isDistress && !reduce && (
          <motion.g fill={COL.teal}>
            {[0, 0.25, 0.5, 0.75].map((delay, i) => (
              <motion.circle
                key={i} r="3"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [155, 232, 152, 230, 155],
                  cy: [240, 240, 296, 296, 240],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: delay * 4, ease: 'linear' }}
              />
            ))}
          </motion.g>
        )}

        {/* === DISTRESS EFFECTS === */}
        {isDistress && !reduce && (
          <>
            {/* Inflammation hot-spots */}
            {[
              { cx: 175, cy: 200, r: 8 },
              { cx: 215, cy: 215, r: 10 },
              { cx: 190, cy: 280, r: 7 },
              { cx: 165, cy: 270, r: 6 },
            ].map((s, i) => (
              <motion.circle
                key={'i'+i} cx={s.cx} cy={s.cy} r={s.r} fill={COL.rose}
                animate={{ opacity: [0.25, 0.7, 0.25], scale: [0.85, 1.15, 0.85] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
              />
            ))}

            {/* Heat / acid waves rising from stomach */}
            {[0, 0.4, 0.8, 1.2].map((d, i) => (
              <motion.path
                key={'h'+i}
                d={`M${175 + i*8} 175 q4 -8 -2 -16 q-6 -10 0 -20`}
                stroke={COL.rose} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 0.8, 0], y: [0, -14, -28] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: d, ease: 'easeOut' }}
              />
            ))}

            {/* Distress shock-waves emanating from gut */}
            {[0, 0.7, 1.4].map((d, i) => (
              <motion.circle
                key={'w'+i} cx="190" cy="245" r="60" fill="none"
                stroke={COL.rose} strokeWidth="1.5" strokeOpacity="0.8"
                initial={{ scale: 0.4, opacity: 0.7 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 2.4, repeat: Infinity, delay: d, ease: 'easeOut' }}
                style={{ transformOrigin: '190px 245px' }}
              />
            ))}

            {/* Nerve signals firing head → gut */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.circle
                key={'n'+i} r="2.6" fill={COL.rose}
                initial={{ cx: 190, cy: 88, opacity: 0 }}
                animate={{ cy: [88, 245], cx: [190, 188, 192, 190], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.32, ease: 'easeIn' }}
              />
            ))}
          </>
        )}

        {/* === RESET EFFECTS === */}
        {!isDistress && !reduce && (
          <>
            {/* Calm breath ring */}
            <motion.circle
              cx="190" cy="245" r="55" fill="none" stroke={COL.teal} strokeWidth="2" strokeOpacity="0.6"
              animate={{ scale: [1, 1.5, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '190px 245px' }}
            />
            {/* Soft sparkles around the gut */}
            {[
              { x: 140, y: 200 }, { x: 245, y: 215 },
              { x: 155, y: 290 }, { x: 230, y: 295 },
            ].map((s, i) => (
              <motion.g key={'s'+i}
                animate={{ opacity: [0, 1, 0], scale: [0.6, 1.1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                style={{ transformOrigin: `${s.x}px ${s.y}px` }}
              >
                <path d={`M${s.x} ${s.y - 6} L${s.x + 2} ${s.y - 2} L${s.x + 6} ${s.y}
                          L${s.x + 2} ${s.y + 2} L${s.x} ${s.y + 6} L${s.x - 2} ${s.y + 2}
                          L${s.x - 6} ${s.y} L${s.x - 2} ${s.y - 2} Z`}
                      fill={COL.tealGlow} opacity="0.85" />
              </motion.g>
            ))}
          </>
        )}

        {/* Legs */}
        <path d="M150 332 Q146 380 152 410" fill="none" stroke={COL.inkLine} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M230 332 Q234 380 228 410" fill="none" stroke={COL.inkLine} strokeWidth="1.5" strokeLinecap="round" />

        {/* Caption pin to gut */}
        <g>
          <line x1="248" y1="230" x2="296" y2="206" stroke={COL.inkLine} strokeWidth="1" />
          <circle cx="248" cy="230" r="2.5" fill={COL.inkLine} />
        </g>
      </svg>

      {/* Caption box */}
      <motion.div
        key={'cap-'+phase}
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-[32%] right-2 max-w-[180px] text-right"
      >
        <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: accent }}>
          The gut zone
        </div>
        <p className="text-sm text-ink-800 mt-1.5 leading-snug">
          {isDistress
            ? 'Under chronic stress, the gut clamps. Digestion stalls.'
            : 'One signal of safety — and the gut comes back online.'}
        </p>
      </motion.div>
    </div>
  );
}
