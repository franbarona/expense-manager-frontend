import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import type { Category } from "../types/types";
import { mockCategories } from "../mocks/mockCategories";
// import { getCategories } from "../services/api";

// 2. Define el tipo del contexto
interface CategoriesContextType {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
}

// 3. Crea el contexto con un valor por defecto undefined (lo forzamos con as)
const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

// 5. Componente Provider
export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isInitialized, setIsInitialized] = useState(false); // 🔑

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // const fetchCategories = async () => {
  //   // setLoading(true);
  //   try {
  //     const data = await getCategories(); //Get from bbdd
  //     setCategories(data);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };


  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      localStorage.setItem("categories", JSON.stringify(mockCategories));
      setCategories(mockCategories);
    }
    setIsInitialized(true); // Solo marcamos como "inicializado" después de cargar
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories, isInitialized]);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

// 6. Hook personalizado para acceder fácilmente al contexto
export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories debe usarse dentro de CategoriesProvider");
  }
  return context;
};
