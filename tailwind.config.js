/** @type {import('tailwindcss').Config} */
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
  darkMode: 'class',
  plugins: [],
}

