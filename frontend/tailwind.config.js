/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          green:  '#00ff88',
          blue:   '#00d4ff',
          red:    '#ff3366',
          orange: '#ff8c00',
          purple: '#8b5cf6',
        },
        bg: {
          primary:   '#030712',
          secondary: '#0a0f1e',
          card:      '#0d1424',
          border:    '#1e2d4a',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'scan-line':  'scan-line 4s linear infinite',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
        'blink':      'blink 1s step-end infinite',
        'shimmer':    'shimmer 1.5s infinite',
        'fadeIn':     'fadeIn 0.3s ease-out',
        'slideUp':    'slideUp 0.3s ease-out',
      },
      keyframes: {
        'scan-line':  { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
        'pulse-ring': { '0%': { transform: 'scale(1)', opacity: '0.6' }, '100%': { transform: 'scale(2.5)', opacity: '0' } },
        'blink':      { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        'shimmer':    { '0%': { 'background-position': '-200% 0' }, '100%': { 'background-position': '200% 0' } },
        'fadeIn':     { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slideUp':    { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      boxShadow: {
        'cyber':       '0 0 20px rgba(0,212,255,0.15), 0 0 60px rgba(0,212,255,0.05)',
        'cyber-sm':    '0 0 8px rgba(0,212,255,0.2)',
        'danger':      '0 0 20px rgba(255,51,102,0.2)',
        'safe':        '0 0 20px rgba(0,255,136,0.2)',
      },
    },
  },
  plugins: [],
}
