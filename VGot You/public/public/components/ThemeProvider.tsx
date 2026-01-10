import React, { createContext, useContext, useEffect } from "react";

type Theme = "dark";

interface ThemeProviderProps {
  children?: React.ReactNode;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProviderClean({
  children,
}: ThemeProviderProps) {
  // We force 'dark' mode and ignore any stored preferences or system settings
  const theme: Theme = "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    // Strictly ensure only 'dark' is present
    root.classList.remove("light");
    root.classList.add("dark");
    // Ensure the background color is set at the root level for mobile browsers
    root.style.backgroundColor = "black";
    root.style.colorScheme = "dark";
  }, []);

  const value = {
    theme,
    setTheme: () => {}, // No-op: theme is locked
    toggleTheme: () => {}, // No-op: theme is locked
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};