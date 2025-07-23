// Global Theme Configuration
// Change these values to update the entire portfolio theme

export const THEME_CONFIG = {
  // Primary theme colors
  colors: {
    primary: '#3B82F6',    // Blue-500 - Main theme color
    accent: '#60A5FA',     // Blue-400 - Accent/highlight color
    secondary: '#1D4ED8',  // Blue-700 - Darker theme color
    
    // Full color palette
    palette: {
      50: '#EFF6FF',   // blue-50
      100: '#DBEAFE',  // blue-100
      200: '#BFDBFE',  // blue-200
      300: '#93C5FD',  // blue-300
      400: '#60A5FA',  // blue-400 - Main accent
      500: '#3B82F6',  // blue-500 - Primary
      600: '#2563EB',  // blue-600
      700: '#1D4ED8',  // blue-700 - Secondary
      800: '#1E40AF',  // blue-800
      900: '#1E3A8A'   // blue-900
    }
  },
  
  // Alternative theme presets
  presets: {
    blue: {
      primary: '#3B82F6',
      accent: '#60A5FA',
      secondary: '#1D4ED8'
    },
    purple: {
      primary: '#8B5CF6',
      accent: '#A78BFA',
      secondary: '#7C3AED'
    },
    green: {
      primary: '#10B981',
      accent: '#34D399',
      secondary: '#059669'
    },
    orange: {
      primary: '#F59E0B',
      accent: '#FBBF24',
      secondary: '#D97706'
    },
    red: {
      primary: '#EF4444',
      accent: '#F87171',
      secondary: '#DC2626'
    },
    yellow: {
      primary: '#EEFF00',
      accent: '#F4FF4A',
      secondary: '#CCDD00'
    }
  }
};

// Current active theme - Change this to switch themes instantly
export const ACTIVE_THEME = THEME_CONFIG.presets.blue;

// CSS custom properties for dynamic theming
export const generateThemeCSS = (theme = ACTIVE_THEME) => `
  :root {
    --theme-primary: ${theme.primary};
    --theme-accent: ${theme.accent};
    --theme-secondary: ${theme.secondary};
  }
`;

// Utility function to get theme colors
export const getThemeColor = (colorName: keyof typeof ACTIVE_THEME) => {
  return ACTIVE_THEME[colorName];
};

export default THEME_CONFIG;
