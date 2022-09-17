const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      cyan: '#02c5f5',
      teal: '#92fe9e',
      red: colors.red[500],
    },
    extend: {},
  },
  plugins: [],
};
