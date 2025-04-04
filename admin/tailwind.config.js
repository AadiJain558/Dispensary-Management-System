/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#0f172a',    // dark blue-black
          secondary: '#1e293b',  // slightly lighter blue-black
          accent: '#3b82f6',     // blue accent
        }
      },
      backgroundColor: {
        dark: {
          primary: '#0f172a',
          secondary: '#1e293b',
        }
      },
      textColor: {
        dark: {
          primary: '#ffffff',
          secondary: '#94a3b8',
        }
      },
      borderColor: {
        dark: {
          primary: '#334155',
        }
      }
    },
  },
  plugins: [],
}