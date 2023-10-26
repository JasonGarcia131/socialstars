/** @type {import('tailwindcss').Config} */

import spaceBackground from './public/assets/space-background.jpg';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'space-background': `url("/assets/space-background.jpg")`,
      }
    },
  },
  plugins: [],
}

