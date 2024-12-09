/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 12s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(140%)' },
          '100%': { transform: 'translateX(-220%)' },
        },
      },
    },
  },
  plugins: [],
};
