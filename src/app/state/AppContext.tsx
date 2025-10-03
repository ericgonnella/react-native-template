import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {createTheme, Theme, ColorScheme} from '../theme';
import {storage} from '../storage';

interface AppContextValue {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  resetApp: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const STORAGE_KEY_THEME = '@app/theme';

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const [theme, setTheme] = useState<Theme>(createTheme('light'));

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await storage.getItem(STORAGE_KEY_THEME);
        if (saved === 'light' || saved === 'dark') {
          setColorScheme(saved);
          setTheme(createTheme(saved));
        }
      } catch (error) {
        console.warn('Failed to load theme:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newScheme: ColorScheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newScheme);
    setTheme(createTheme(newScheme));
    await storage.setItem(STORAGE_KEY_THEME, newScheme);
  };

  const resetApp = async () => {
    try {
      await storage.removeItem(STORAGE_KEY_THEME);
      setColorScheme('light');
      setTheme(createTheme('light'));
    } catch (error) {
      console.warn('Failed to reset app:', error);
    }
  };

  return (
    <AppContext.Provider value={{theme, colorScheme, toggleTheme, resetApp}}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export default AppContext;
