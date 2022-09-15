/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./lib/tailwind/preset')],

  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('./lib/tailwind/plugins')],
};