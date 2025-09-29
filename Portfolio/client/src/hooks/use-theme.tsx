import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  // Always use dark theme
  const getSavedTheme = (): Theme => {
    return 'dark';
  };
  
  const [theme, setTheme] = useState<Theme>('dark');
  
  // Initialize theme on mount
  useEffect(() => {
    // Always set dark mode
    document.documentElement.classList.add('dark');
  }, []);
  
  // Toggle function does nothing now - we're always in dark mode
  const toggleTheme = () => {
    // No-op function since we always stay in dark mode
    return;
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};