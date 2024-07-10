/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fdba74',   // orange-300
          default: '#f97316', // orange-500
          mid: '#ea580c',     // orange-600
          dark: '#ea580c',   // orange-700
        },
        slate: {
          default: '#1e293b', // slate-900
        }
      }
    },
  },
  plugins: [],
}

