/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
  // ──────────────────────────────────────────────────────────────
  // Bunker Fuel Maldives — Brand Palette
  // Token names preserved for codebase compatibility.
  // Hex values mapped to logo brand identity:
  //   teal  → Maldives Blue (trust, type, serious surfaces)
  //   lagoon → Lighter Marine Blue tints (accent)
  //   palm  → Forest Green (trust signals, valid status)
  //   coral → Oil & Gas Red (CTAs, energy, alerts)
  //   sand  → Warm off-white (page surfaces) — UNCHANGED, editorial
  // ──────────────────────────────────────────────────────────────

  lagoon: {
    DEFAULT: '#3777BB',
    50:  '#E6EEF6',
    100: '#CDDDEE',
    200: '#9BBBDD',
    300: '#6999CC',
    400: '#3777BB',  // softer marine blue — interactive states
    500: '#0054A6',  // primary brand blue
    600: '#004385',
    700: '#003264',
    800: '#002242',
  },

  sand: {
    DEFAULT: '#FBF7F1',
    50:  '#FEFDFB',
    100: '#FBF7F1',  // Coral-Sand White — page background (unchanged)
    200: '#F4ECDF',
    300: '#EADFCB',
  },

  teal: {
    DEFAULT: '#0054A6',
    50:  '#E6EEF6',
    100: '#CDDDEE',
    400: '#3777BB',
    500: '#0054A6',  // Maldives Blue — replaces deep ocean teal everywhere
    600: '#004385',
    700: '#003264',
    900: '#001121',
  },

  coral: {
    DEFAULT: '#ED1C24',
    400: '#F14950',
    500: '#ED1C24',  // Oil & Gas Red — CTAs, navbar flame, hot accents
    600: '#BE161D',
  },

  palm: {
    DEFAULT: '#008144',
    400: '#33A66F',
    500: '#008144',  // Forest Green — trust signals, valid status dots
    600: '#006736',
  },
},
      fontFamily: {
        // Editorial serif for boutique gravitas
        serif: ['Fraunces', 'Tiempos', 'ui-serif', 'Georgia', 'serif'],
        // Clean humanist sans for operational legibility
        sans: ['"General Sans"', 'Söhne', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Tabular numerals for IMO/registration data
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontFeatureSettings: {
        tabular: '"tnum", "lnum"',
      },
      boxShadow: {
        // Soft drop shadows like sunlight on sand — never harsh black
        'sand-sm': '0 1px 2px 0 rgba(15, 76, 92, 0.04), 0 1px 3px 0 rgba(15, 76, 92, 0.06)',
        'sand': '0 4px 6px -1px rgba(15, 76, 92, 0.06), 0 2px 4px -1px rgba(15, 76, 92, 0.04)',
        'sand-md': '0 10px 25px -5px rgba(15, 76, 92, 0.08), 0 8px 10px -6px rgba(15, 76, 92, 0.04)',
        'sand-lg': '0 25px 50px -12px rgba(15, 76, 92, 0.12)',
        'sand-xl': '0 35px 60px -15px rgba(15, 76, 92, 0.15)',
        'glass': '0 8px 32px 0 rgba(15, 76, 92, 0.08)',
        'lagoon-glow': '0 0 0 4px rgba(91, 192, 190, 0.15)',
      },
      borderRadius: {
        'card': '14px',
        'card-lg': '16px',
        'card-sm': '12px',
      },
      backdropBlur: {
        xs: '2px',
        '12': '12px',
      },
      animation: {
        'pulse-lagoon': 'pulse-lagoon 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 60s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'breathe': 'breathe 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-lagoon': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(91, 192, 190, 0.6)' },
          '50%': { opacity: '0.85', boxShadow: '0 0 0 8px rgba(91, 192, 190, 0)' },
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.015)' },
        },
      },
      letterSpacing: {
        'caps': '0.18em',
      },
    },
  },
  plugins: [],
};
