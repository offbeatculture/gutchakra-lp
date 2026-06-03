// ALL copy is VERBATIM from "BCR — Landing Page Copy (3).pdf" — the gut-specific
// Gut Chakra Reset landing page. Only structural edits made for layout.

export const BRAND = {
  name:   'Gut Chakra Reset',
  short:  'GCR',
  tagline:'A nervous-system reset for the gut.',
};

export const WORKSHOP = {
  // Hardcoded fallback — live values fetched from the Master sheet via useSchedule().
  date: '7 Jun 2026',
  day:  'Sunday',
  time: '6:30 PM to 9:30 PM IST',
  duration: '3-hour masterclass · on Zoom',

  // Pricing displayed on the LP itself never shows a number anymore
  // (CTA reads "Click to unlock today's special offer"). The numbers
  // below drive the /checkout reveal: ₹999 → ₹99.
  priceAnchor:   999,   // first thing seen on checkout
  priceFinal:     99,   // final unlocked price
  priceOriginal: 2499,  // strike-through value-anchor
  currency: '₹',

  seatsTotal: 200,
  seatsLeft:  47,
  startsAtISO: '2026-06-15T10:00:00+05:30',

  recordingPrice: 199,

  // Russell-Brunson style 10-minute hard offer expiry, per session.
  offerWindowMinutes: 10,
};

// ---------------------------------------------------------------
// HERO — verbatim from PDF
// ---------------------------------------------------------------
export const HERO = {
  eyebrow:   `${WORKSHOP.date} · ${WORKSHOP.time}`,
  // Headline (PDF): "From bloated, heavy, and unsettled gut → to a gut that digests freely"
  preStack:    'From',
  painStack:   ['bloated,', 'heavy,', 'and unsettled gut'],
  promiseLead: '→ to a gut that',
  promise:     'digests freely.',
  sub:         'Learn the Gut Chakra Reset — the 3-zone body-based protocol that addresses what no diet, probiotic, or supplement ever could: the nervous-system signal that tells your gut it is safe to digest.',
  socialProof: '10,000+ people have already reset their gut with Dr. Valarrmathi.',
  unlockCta:   'Click to unlock today’s special price',
};

// ---------------------------------------------------------------
// PAIN MIRROR — verbatim from PDF
// ---------------------------------------------------------------
export const PAIN_INTRO = {
  eyebrow: 'Identity check',
  title:   'Your gut has been trying to tell you something for years.',
  sub:     'If any of these sound familiar — this is for you.',
  closer:  'Your body has been carrying these problems for long enough. Let’s RESET it together.',
};

export const PAIN_POINTS = [
  { n: '01', anim: 'homefood',
    line: 'You eat home-cooked food. You are careful. Your digestion still does not improve.' },
  { n: '02', anim: 'outside',
    line: 'You avoid eating outside because you are never sure how your stomach will react.' },
  { n: '03', anim: 'doctors',
    line: 'You have seen the doctors. You have taken the medicines. The problem keeps coming back.' },
  { n: '04', anim: 'heaviness',
    line: 'There is a heaviness in your stomach that never fully goes away.' },
  { n: '05', anim: 'everyday',
    line: 'Bloating or acidity is not a bad day. It is every day.' },
  { n: '06', anim: 'managing',
    line: 'You are tired of managing your symptoms. You want them gone.' },
];

// ---------------------------------------------------------------
// STATS — verbatim from PDF
// ---------------------------------------------------------------
export const STATS = [
  { value: 92,    suffix: '%',   label: 'walk away with a clear protocol to reset their gut at home' },
  { value: 8,     suffix: '/10', label: 'reported reduced bloating or improved digestion after applying the protocol at home' },
  { value: 10000, suffix: '+',   label: 'people have reset their body with Dr. Valarrmathi' },
];

// ---------------------------------------------------------------
// BEFORE / AFTER — verbatim from PDF
// ---------------------------------------------------------------
export const BEFORE_AFTER = {
  eyebrow:     'The visual promise',
  titleBefore: 'From bloated, heavy, and unsettled →',
  titleAfter:  'to one session that releases all of them.',
  sub:         'See what changes when your body gets the one signal it’s been waiting for.',
  rows: [
    { before: 'You wake up and your stomach is already uncomfortable.',
      after:  'You wake up and your stomach is at ease.' },
    { before: 'You eat home food. Your digestion still gets affected.',
      after:  'You eat mindfully without worrying about how your body will react.' },
    { before: 'Bloating or acidity is not once in a while. It is just every day now.',
      after:  'You finish a meal and nothing happens. No bloating, no burning, no heaviness.' },
    { before: 'You cannot enjoy a meal out. You are already thinking about how your stomach will react.',
      after:  'You finish eating and you still have energy. Because digestion is working the way it should.' },
    { before: 'You are tired after every meal because your body uses all its energy just trying to digest.',
      after:  'Food gives you energy & nourishment. The way it is supposed to.' },
    { before: 'You feel like your body is working against you.',
      after:  'Your body settles and starts working with you.' },
  ],
};

// ---------------------------------------------------------------
// MECHANISM — verbatim from PDF (the 3-column table)
// ---------------------------------------------------------------
export const MECHANISM = {
  eyebrow: 'What you get inside the masterclass',
  title:   'Three components. One complete reset.',
  components: [
    {
      n: '01', tag: 'Diagnose', title: 'The Gut Signal Diagnosis',
      lead: 'You have tried fixing the bloating, the acidity, the heaviness — separately. Nothing stuck because nobody showed you where they are all actually coming from.',
      body: 'Dr. Valarrmathi walks you through a guided body scan — zone by zone, so you can feel exactly where your gut is holding the stress. Not guess. Feel.',
      kicker: 'Stop treating five symptoms. Start working on one source.',
    },
    {
      n: '02', tag: 'Release', title: 'The 3-Zone Gut Unlock',
      lead: 'Knowing where the tension is stored is not enough. Your gut has been holding this for months — sometimes years.',
      body: 'This is where the shift happens. A body-based protocol — zone by zone — that physically releases what your gut has been holding.',
      kicker: 'Participants walk away with a clear protocol they can run at home — zone by zone, no guesswork.',
    },
    {
      n: '03', tag: 'Anchor', title: 'The Safety Switch Protocol',
      lead: 'After the release, the gut defaults back. One difficult conversation, one sleepless night — and the tension returns.',
      body: 'The Safety Switch is a specific pattern that sends your body one signal: that it is safe.',
      kicker: 'Use it every day. Use it anywhere.',
    },
  ],
};

// Brunson-style "what you get / total value" stack used in FinalCTA.
export const VALUE_STACK = {
  items: [
    { label: 'The Gut Signal Diagnosis — guided zone-by-zone body scan',          value: 2499 },
    { label: 'The 3-Zone Gut Unlock — full body-based release protocol',          value: 4999 },
    { label: 'The Safety Switch Protocol — keeps the reset locked in',            value: 2999 },
    { label: 'Personal Q&A with Dr. Valarrmathi — your specific gut, answered',  value: 1999 },
  ],
  bonusItems: [
    { label: 'Bonus · 7-day post-session reset journal (PDF)',                    value: 499 },
  ],
};

// ---------------------------------------------------------------
// COACH
// ---------------------------------------------------------------
export const COACH = {
  eyebrow: 'YOUR COACH',
  name:      'Dr. Valarrmathi Srinivasan',
  nameFirst: 'Dr. Valarrmathi',
  nameLast:  'Srinivasan.',
  title:   'Nervous-System Regulation & Breathwork Coach',
  photo:   '/images/coach-valar.jpg',
  bio:     'Hi, I am Dr. Valarrmathi Srinivasan, a nervous-system regulation and breathwork coach. I have worked with over 10,000 people dealing with gut issues and unexplained physical symptoms. And in almost every case, the problem was never the food.',
  bio2:    'It was the signal. The signal your nervous system was sending your gut — every day, for years — that it was not safe to digest. The Gut Chakra Reset is the protocol I built to change that signal in a single session.',
  chips: [
    { k: '✓', v: 'Nervous-System Regulation' },
    { k: '✓', v: 'Body–Mind Connection' },
    { k: '✓', v: 'Energy Medicine & Kriya Yoga' },
    { k: '✓', v: '10,000+ people transformed' },
  ],
  pullQuote: 'Your gut has been sending the same signal for years. This is the session that releases it.',
};

// ---------------------------------------------------------------
// TESTIMONIALS — only the 4 quotes given in the PDF
// ---------------------------------------------------------------
export const TESTIMONIALS = [
  {
    name: 'Vijayaprabha', age: 57, city: 'Nambiyur',
    tag:  'Gut · 20 yrs',
    outcome: '20-year acidity completely cured',
    quote: 'My gut problem has completely cured. I was suffering from acidity for the past 20 years and emotionally disturbed. Now I am very calm and learnt to handle every situation peacefully.',
  },
  {
    name: 'Ananya', age: 40, city: '',
    tag:  'Bloating',
    outcome: 'First night not going to bed bloated',
    quote: 'So relaxed and light after the first session. For a change I am not going to bed bloated tonight!',
  },
  {
    name: 'Naimesh', age: 43, city: '',
    tag:  'Release',
    outcome: 'Years of stuck tension, physically released',
    quote: 'During the session my body just started releasing — yawning, burping, even crying. Things that had been stuck in my gut for so long were finally moving. By the end I felt completely light. Like something had been cleared out from the inside.',
  },
  {
    name: 'Rajesh', age: 52, city: '',
    tag:  'Heaviness',
    outcome: 'Years of stomach heaviness, gone',
    quote: 'I could feel my gut physically letting go. Burping, releasing… by the end the heaviness I had been carrying in my stomach was gone. I felt lighter than I had in years.',
  },
];

// ---------------------------------------------------------------
// FAQ — the 4 questions from the PDF, verbatim answers
// ---------------------------------------------------------------
export const FAQS = [
  {
    q: 'Will I actually feel something in the session itself?',
    a: 'Many people do, but the real promise is what happens after. You will leave with a clear, repeatable protocol — three zones, simple body-based steps — that you can run at home whenever your gut needs a reset. For most people that consistent practice is what finally moves the needle, not a single moment.',
  },
  {
    q: 'I’ve tried supplements and diet changes before. Nothing happened.',
    a: 'Everything you have tried has worked on the symptom. This works on the root cause — the signal your nervous system is sending your gut. This is the first time you are addressing the actual instruction your body is running on. Not its consequences.',
  },
  {
    q: 'Will one session fix everything completely?',
    a: 'One session is a reset. A real, felt shift that most people haven’t experienced before. But the body has been holding this for years. One session opens the door. The deeper, lasting change happens with continued practice.',
  },
  {
    q: 'It’s ₹99. What’s the catch?',
    a: 'No catch. The price keeps it accessible and keeps the room serious — people who pay show up. The session stands completely on its own value.',
  },
];

// ---------------------------------------------------------------
// FINAL CTA — verbatim from PDF
// ---------------------------------------------------------------
export const FINAL_CTA = {
  eyebrow:    'One last thing',
  title:      'Your body has been sending the same signal for years.',
  titleAfter: 'This is the session that changes it.',
  sub:        'Join thousands of people who came in with a gut that never settled — bloated, heavy, unsettled through every meal and every stressful day — and left feeling at ease.',
};

// ---------------------------------------------------------------
// CHECKOUT / FORM / RAZORPAY
// ---------------------------------------------------------------
export const PROFESSIONS = [
  'Working professional', 'Business owner', 'Student',
  'Homemaker', 'Retired', 'Other',
];

export const ORDER_BUMP = {
  id: 'recording',
  badge: 'Optional add-on',
  title: 'Lifetime Access to the Full Workshop Recording + Detailed Notes',
  body:  'Revisit the entire 3-hour reset any time. Most people watch it 3–4 times in the first month to lock the Safety Switch in.',
  priceWas: 599,
  priceNow: WORKSHOP.recordingPrice,
};

export const RAZORPAY = {
  pageUrl: 'https://pages.razorpay.com/gcr-fb11',
  // Value sent for the "Source" dropdown on the Razorpay page.
  // Must EXACTLY match one of the dropdown options configured on that
  // Razorpay payment page (e.g. 'fb11', 'fb12', 'ig01'...).
  sourceValue: 'fb11',
  paramMap: {
    name:       'name',
    email:      'email',
    whatsapp:   'whatsapp_number',
    profession: 'profession',
    recording:  'lifetime_access_to_the_recording_and_detailed_notes',
    amount:     'amount',
    source:     'source',
  },
  appendCheckoutPrefill: true,
};
