/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',  
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'lightgray': '#EEEEEE',
        'grayer': '#E0E0E0',
        'grayest': '#A4A4A4',
        'accent': '#FF7F50',
        'dark': "#1e293b",
        'darker': "#0f172a",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}