/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
        linuxlogo: ['LinLibertine_aS', 'sans-serif'],
        linux: ['LinLibertine_aDRS', 'sans-serif'],
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