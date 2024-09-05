/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
        linux: ['LinLibertine_aS', 'sans-serif'],
      },
      colors:{
        'lazy-purple': '#c6b8ff'
      },
      fontSize: {
        'xxs': '0.4rem',
      }
    },
  },
  plugins: [require('daisyui')],
}