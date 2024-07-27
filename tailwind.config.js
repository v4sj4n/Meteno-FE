import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: false
  },
  theme: {
    extend: {
      colors: {
        // gunMetalDark: '#31393C',
        // gunMetalDarkLight: '#49555A',
        // lavenderTitleColor: '#EAE8FF',
        // uranianBlue: '#B0D7FF',
      },
    },
    fontFamily: {
      // sans: ['Afacad', 'sans-serif'],
    },
  },
  
  plugins: [daisyui],
}
