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
        spotify: {
          green: '#1DB954',
          'green-light': '#1ed760',
          'green-glow': '#10b981',
          black: '#121212',
          dark: '#181818',
          card: '#242424',
          hover: '#2a2a2a',
          subtext: '#b3b3b3'
        },
        obsidian: {
          DEFAULT: '#0a0b0e',
          surface: '#11131a',
          card: '#161922',
          border: '#232733',
          highlight: '#2f3547'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 35px -5px rgba(29, 185, 84, 0.45)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.45)',
        'card-glow': '0 10px 40px -10px rgba(0,0,0,0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
