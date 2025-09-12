import { useState, useCallback } from 'react';
import Alert from './Alert';

let idCounter = 0;

const AlertManager = ({ position = 'top-right' }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback(({ type = 'info', message, duration = 5000 }) => {
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

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  // Expose addAlert globally (careful with this in production)
  window.__addAlert = addAlert;

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <div className={`fixed z-50 space-y-3 ${positionClasses[position] || positionClasses['top-right']}`}>
      {alerts.map((alert) => (
        <Alert key={alert.id} {...alert} onClose={removeAlert} />
      ))}
    </div>
  );
};

export default AlertManager;
