/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:  { 50: '#FBF7F0', 100: '#F6EFE3', 200: '#EDE2CD', 300: '#D9CFBE' },
        ink:    { 900: '#13110E', 800: '#1F1C17', 700: '#3A342B', 500: '#6E6557', 300: '#8C8678' },
        teal:   { deep: '#0E5448', forest: '#0A3D34', mist: '#D7E6E1', glow: '#1A8775' },
        rose:   { saree: '#C94B6D', soft: '#E8B5C2', deep: '#A8385A' },
        gold:   { DEFAULT: '#C7995A', deep: '#9B7235', soft: '#E6CFA8' },
        sand:   { DEFAULT: '#E8D9C4' },
        amber:  { DEFAULT: '#F2B547' },
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans:    ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(19,17,14,0.18)',
        cta:  '0 14px 30px -10px rgba(14,84,72,0.45)',
        glow: '0 0 0 8px rgba(201,75,109,0.10), 0 0 0 16px rgba(201,75,109,0.05)',
      },
      keyframes: {
        breathe:  { '0%,100%': { transform: 'scale(1)', opacity: '0.95' }, '50%': { transform: 'scale(1.05)', opacity: '1' } },
        pulseDot: { '0%,100%': { transform: 'scale(1)', opacity: '1' },   '50%': { transform: 'scale(1.7)', opacity: '0.35' } },
        gutPulse: { '0%,100%': { transform: 'scale(1)', opacity: '0.85' }, '50%': { transform: 'scale(1.08)', opacity: '1' } },
        ripple:   { '0%': { transform: 'scale(0.4)', opacity: '0.7' }, '100%': { transform: 'scale(2)', opacity: '0' } },
      },
      animation: {
        breathe:  'breathe 6s ease-in-out infinite',
        pulseDot: 'pulseDot 1.6s ease-in-out infinite',
        gutPulse: 'gutPulse 1.8s ease-in-out infinite',
        ripple:   'ripple 2.2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
