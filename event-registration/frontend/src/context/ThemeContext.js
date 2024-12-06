import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, alpha } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';

const ThemeContext = createContext(null);

// Color palette constants
const palette = {
  warmOrange: '#FF7D3C',
  coral: '#FF5F5F',
  peach: '#FFAA8C',
  sand: '#F7E2D0',
  cream: '#FFF8E7',
  charcoal: '#2A2826',
  slate: '#3F3D3A',
  warmGray: '#625D58'
};

// Helper to get system preference
const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Storage helper functions
const storage = {
  get: (key) => {
    try {
      return window?.localStorage.getItem(key);
    } catch (e) {
      console.error('Local storage access failed:', e);
      return null;
    }
  },
  set: (key, value) => {
    try {
      window?.localStorage.setItem(key, value);
    } catch (e) {
      console.error('Local storage set failed:', e);
    }
  },
  remove: (key) => {
    try {
      window?.localStorage.removeItem(key);
    } catch (e) {
      console.error('Local storage remove failed:', e);
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const { user } = useSelector(state => state.auth);
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = storage.get('themeMode');
    return savedTheme || 'system';
  });

  // Get the actual theme based on theme mode selection
  const resolvedTheme = themeMode === 'system' ? getSystemTheme() : themeMode;

  // Create theme object
  const theme = createTheme({
    palette: {
      mode: resolvedTheme,
      primary: {
        main: resolvedTheme === 'light' ? palette.warmOrange : palette.peach,
        light: resolvedTheme === 'light' ? palette.peach : palette.warmOrange,
        dark: palette.coral,
        contrastText: resolvedTheme === 'light' ? '#fff' : palette.charcoal,
      },
      secondary: {
        main: resolvedTheme === 'light' ? palette.coral : palette.sand,
        light: palette.sand,
        dark: palette.coral,
        contrastText: resolvedTheme === 'light' ? '#fff' : palette.charcoal,
      },
      background: {
        default: resolvedTheme === 'light' ? palette.cream : palette.charcoal,
        paper: resolvedTheme === 'light' ? '#fff' : palette.slate,
      },
      text: {
        primary: resolvedTheme === 'light' ? palette.charcoal : palette.cream,
        secondary: resolvedTheme === 'light' ? palette.warmGray : palette.sand,
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
        color: resolvedTheme === 'light' ? palette.charcoal : palette.cream,
      },
      h2: {
        fontWeight: 600,
        color: resolvedTheme === 'light' ? palette.charcoal : palette.cream,
      },
      h3: {
        fontWeight: 600,
        color: resolvedTheme === 'light' ? palette.charcoal : palette.cream,
      },
      h4: {
        fontWeight: 600,
        color: resolvedTheme === 'light' ? palette.charcoal : palette.cream,
      },
      h5: {
        fontWeight: 600,
        color: resolvedTheme === 'light' ? palette.charcoal : palette.cream,
      },
      h6: {
        fontWeight: 600,
        color: resolvedTheme === 'light' ? palette.charcoal : palette.cream,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: resolvedTheme === 'light' ? palette.warmOrange : palette.slate,
            color: resolvedTheme === 'light' ? '#fff' : palette.cream,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: resolvedTheme === 'light' 
              ? '0 2px 8px rgba(0,0,0,0.08)'
              : '0 2px 8px rgba(0,0,0,0.2)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            margin: '2px 8px',
            '&.Mui-selected': {
              backgroundColor: alpha(
                resolvedTheme === 'light' ? palette.warmOrange : palette.peach,
                0.12
              ),
              '&:hover': {
                backgroundColor: alpha(
                  resolvedTheme === 'light' ? palette.warmOrange : palette.peach,
                  0.18
                ),
              },
            },
          },
        },
      },
    },
  });

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (themeMode === 'system') {
        setThemeMode('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  // Sync with user preferences when logged in
  useEffect(() => {
    const syncUserPreferences = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(`/api/users/${user.id}/preferences/`);
          if (response.data.theme_mode) {
            setThemeMode(response.data.theme_mode);
            storage.set('themeMode', response.data.theme_mode);
          }
        } catch (error) {
          console.error('Failed to fetch user theme preferences:', error);
        }
      }
    };

    syncUserPreferences();
  }, [user]);

  const setTheme = async (newMode) => {
    setThemeMode(newMode);
    storage.set('themeMode', newMode);

    if (user?.id) {
      try {
        await axios.patch(`/api/users/${user.id}/preferences/`, {
          theme_mode: newMode
        });
      } catch (error) {
        console.error('Failed to update user theme preferences:', error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      themeMode,
      resolvedTheme, 
      setTheme 
    }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};