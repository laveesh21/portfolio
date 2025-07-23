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
      }
    },
  },
  plugins: [],
}
