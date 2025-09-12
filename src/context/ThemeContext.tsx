import { createContext, useContext, useState, useEffect, type ReactNode, type Dispatch, type SetStateAction } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider ({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === 'dark' ? true : false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme () {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext debe usarse dentro de <ThemeProvider>");
  }
  return context;
}