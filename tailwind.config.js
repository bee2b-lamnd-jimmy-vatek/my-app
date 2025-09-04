/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.tsx",  // Make sure it catches your App.tsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}