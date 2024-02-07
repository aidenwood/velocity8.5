/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      white: '#ffffff',
      black: colors.black,
      primary: colors.violet,
      violet: colors.violet,
      green: colors.green,
      cyan: colors.cyan,
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    screens: {
      'xs': '412px',
      // => @media (min-width: 412px) { ... }
      
      'sm': '668px',
      // => @media (min-width: 512px) { ... }

      'md': '968px',
      // => @media (min-width: 768px) { ... }

      'lg': '1280px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1680px',
      // => @media (min-width: 1680px) { ... }

      '2xl': '1986px',
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      xs: ['0.75rem', '1rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.75rem'],
      lg: ['1.125rem', '2rem'],
      xl: ['1.25rem', '2.125rem'],
      '2xl': ['1.5rem', '2rem'],
      '3xl': ['1.875rem', '2.375rem'],
      '4xl': ['2.5rem', '3.25rem'],
      '5xl': ['3.5rem', '4.25rem'],
      '6xl': ['4.25rem', '5.25rem'],
      '7xl': ['4.75rem', '5.75rem'],
    },
  },
};
