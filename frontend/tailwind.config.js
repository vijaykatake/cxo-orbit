/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'royal-blue':  '#0B2C4D',
        'soft-gold':   '#D4AF37',
        'ivory-white': '#F8F6F2',
        'charcoal':    '#2E2E2E',
        'teal-accent': '#1FA6A0',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
