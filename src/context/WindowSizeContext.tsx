import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type WindowSizeContextType = {
  width: number;
};

const WindowSizeContext = createContext<WindowSizeContextType | undefined>(undefined);

export function WindowSizeProvider({ children }: { children: ReactNode }) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowSizeContext.Provider value={{ width }}>
      {children}
    </WindowSizeContext.Provider>
  );
}

export function useWindowSize() {
  const context = useContext(WindowSizeContext);
  if (!context) {
    throw new Error("useWindowSize debe usarse dentro de <WindowSizeProvider>");
  }
  return context;
}