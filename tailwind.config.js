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
        // Theme colors - Change these to update the entire portfolio theme
        primary: "#3B82F6", // Blue-500 - Main theme color
        accent: "#60A5FA", // Blue-400 - Accent/highlight color  
        secondary: "#1D4ED8", // Blue-700 - Darker theme color
        theme: {
          50: "#EFF6FF",   // blue-50
          100: "#DBEAFE",  // blue-100
          200: "#BFDBFE",  // blue-200
          300: "#93C5FD",  // blue-300
          400: "#60A5FA",  // blue-400 - Main accent
          500: "#3B82F6",  // blue-500 - Primary
          600: "#2563EB",  // blue-600
          700: "#1D4ED8",  // blue-700 - Secondary
          800: "#1E40AF",  // blue-800
          900: "#1E3A8A"   // blue-900
        },
        dark: {
          DEFAULT: "#121212", // Main background
          lighter: "#1E1E1E", // Lighter background for cards, etc.
          lightest: "#2A2A2A" // Even lighter background for hover states
        },
        light: {
          DEFAULT: "#E0E0E0", // Main text color
          darker: "#BBBBBB" // Secondary text color
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      backgroundColor: {
        dark: "#121212",
        card: "#1E1E1E"
      },
      textColor: {
        dark: "#E0E0E0"
      },
      animation: {
        'on-hover': 'on-hover 8s ease-in-out infinite',
        'border': 'border 4s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 1s ease-out forwards',
        'fadeInScale': 'fadeInScale 1s ease-out forwards',
        'float': 'float 8s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'text-glow': 'text-glow 3s ease-in-out infinite',
        'particle-float': 'particle-float 15s ease-in infinite',
        'pulse-ring': 'pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-flow': 'gradient-flow 4s linear infinite',
        'gradient-flow-slow': 'gradient-flow-slow 8s linear infinite',
        'shimmer-slide': 'shimmer-slide 3s infinite',
      },
      keyframes: {
        'on-hover': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.02) rotate(0.5deg)' },
          '75%': { transform: 'scale(1.01) rotate(-0.5deg)' },
        },
        'border': {
          '0%, 100%': { borderColor: 'rgba(255, 255, 255, 0.1)' },
          '50%': { borderColor: 'rgba(255, 255, 255, 0.2)' },
        },
        'fadeInUp': {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fadeInScale': {
          'from': { opacity: '0', transform: 'scale(0.8)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.2), inset 0 0 15px rgba(59, 130, 246, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.2)',
          },
        },
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 10px rgba(59, 130, 246, 0.3)' },
          '50%': { textShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
        },
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.3' },
          '90%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-100vh) translateX(10px)', opacity: '0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '50%': { transform: 'scale(1.2)', opacity: '0.4' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'gradient-flow': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'gradient-flow-slow': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'shimmer-slide': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      }
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.btn-primary': {
          '@apply relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-300': {},
          '@apply bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700': {},
          '@apply shadow-lg hover:shadow-xl hover:scale-105': {},
          '@apply border border-white/10 hover:border-white/20': {},
        },
      })
    }
  ],
}
