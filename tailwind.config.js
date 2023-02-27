const colors = require('tailwindcss/colors');

// TODO: replace cyan2 with cyan and move cyan to primary color

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      blue: colors.blue,
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
      yellow: colors.yellow,
      sky: colors.sky,
      cyan: '#02c5f5',
      teal: '#92fe9e',
      red: colors.red,
      cyan2: colors.cyan,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
};
