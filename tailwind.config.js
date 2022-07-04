/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'sol-tan-1': '#fdf6e3',
      'sol-tan-2': '#eee8d5',
      'sol-blue-1': '#268bd2',
      'sol-cyan-1': '#2aa198',
      'sol-yellow-1': '#b58900',
      'sol-grey-4': '#586e75',
      'sol-grey-3': '#657b83',
      'sol-grey-2': '#839496',
      'sol-grey-1': '#93a1a1',
      'sol-black-1': '#073642',
      'sol-black-2': '#002b36',
      'white-1': '#ffffff',
      'card-title-red': '#c9211e',
    },
    extend: {
      animation: {
        'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        h1: {
          fontSize: '32px',
          fontWeight: '700',
          lineHeight: '40px',
          letterSpacing: '0em',
          textAlign: 'left',
          color: '#c9211e',
        },
        h2: {
          fontSize: '24px',
          fontWeight: '700',
          lineHeight: '30px',
          letterSpacing: '0px',
          textAlign: 'left',
        },
        h3: {
          fontWeight: '500',
        },
        em: {
          color: '#93a1a1',
          userSelect: 'none',
        },
      });
    },
  ],
  darkMode: 'class',
};
