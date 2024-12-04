// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';

const ThemeContext = createContext(null);

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
      ...(resolvedTheme === 'dark' ? {
        primary: {
          main: '#90caf9',
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
      } : {
        primary: {
          main: '#1976d2',
        },
      }),
    },
  });

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (themeMode === 'system') {
        // Force a re-render when system theme changes and we're in system mode
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