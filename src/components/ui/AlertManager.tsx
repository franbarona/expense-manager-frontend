import { useState, useCallback } from 'react';
import Alert from './Alert';
import type { AlertType } from '../../types/types';
declare global {
  interface Window {
    __addAlert: (alert: AlertManagerProps) => void;
  }
}

export type AlertManagerProps = {
  id: number;
  type: AlertType;
  message: string;
  duration?: number;
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'bottom-right': 'bottom-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-left': 'bottom-4 left-4',
} as const;

type Position = keyof typeof positionClasses;

let idCounter = 0;
const AlertManager = ({ position = 'top-right' }: {position: Position}) => {
  const [alerts, setAlerts] = useState<AlertManagerProps[]>([]);
  const className = positionClasses[position];

  const addAlert = useCallback(({ type = 'info', message, duration = 5000 }: AlertManagerProps) => {
    const id = idCounter++;
    const newAlert = { id, type, message };
    setAlerts((prev) => [...prev, newAlert]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }, duration);
    }
  }, []);

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  window.__addAlert = addAlert;

  return (
    <div className={`fixed z-50 space-y-3 ${className || positionClasses['top-right']}`}>
      {alerts.map((alert) => (
        <Alert key={alert.id} {...alert} onClose={removeAlert} />
      ))}
    </div>
  );
};

export default AlertManager;
