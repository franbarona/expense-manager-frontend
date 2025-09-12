// src/context/AlertContext.tsx
import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import Alert from '../components/ui/Alert';
import type { AlertType } from '../types/types';


interface AlertItem {
  id: number;
  type: AlertType;
  message: string;
}

interface AddAlertParams {
  type: AlertType;
  message: string;
  duration?: number;
}

interface AlertContextType {
  addAlert: (alert: AddAlertParams) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

let idCounter = 0;

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const addAlert = useCallback(({ type, message, duration = 5000 }: AddAlertParams) => {
    const id = idCounter++;
    const newAlert = { id, type, message };
    setAlerts((prev) => [...prev, newAlert]);

    if (duration > 0) {
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }, duration);
    }
  }, []);

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      {/* UI de alertas */}
      <div className="fixed top-4 right-4 z-50 space-y-3">
        {alerts.map((alert) => (
          <Alert key={alert.id} id={alert.id} type={alert.type} message={alert.message} onClose={removeAlert} />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert debe usarse dentro de <AlertProvider>');
  }
  return context;
};
