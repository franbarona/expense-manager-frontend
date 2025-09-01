import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import type { Transaction } from "../types/types";
import { mockTransactions } from "../mocks/mockTransations";

// 2. Define el tipo del contexto
interface TransactionContextType {
  transactions: Transaction[];
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
}

// 3. Crea el contexto con un valor por defecto undefined (lo forzamos con as)
const TransactionsContext = createContext<TransactionContextType | undefined>(undefined);

// 5. Componente Provider
export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isInitialized, setIsInitialized] = useState(false); // 🔑

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      localStorage.setItem("transactions", JSON.stringify(mockTransactions));
      setTransactions(mockTransactions);
    }
    setIsInitialized(true); // Solo marcamos como "inicializado" después de cargar
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions, isInitialized]);

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

// 6. Hook personalizado para acceder fácilmente al contexto
export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions debe usarse dentro de TransactionsProvider");
  }
  return context;
};
