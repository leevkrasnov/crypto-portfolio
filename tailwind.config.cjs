/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
        quantico: ['Quantico-BoldItalic', 'sans-serif'],
      },
      colors: { 'dark-900': '#2C372E', 'dark-200': '#9FB3A2' },
    },
  },
  plugins: [],
};
