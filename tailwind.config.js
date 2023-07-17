/** @type {import('tailwindcss').Config} */
export default {
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
        'accent': '#FF6DA2',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}