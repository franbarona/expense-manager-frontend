import { v4 as uuidv4 } from 'uuid';
import type { Category } from "../types/types";
export const mockCategories: Category[] = [
  // Expense categories
  { id: uuidv4(), name: "Food", icon: "PiCarrot", color: '#EAB308', type: "expense" },
  { id: uuidv4(), name: "Entertainment", icon: "PiGameControllerBold", color: '#EC4899', type: "expense" },
  { id: uuidv4(), name: "Shopping", icon: "PiShoppingBagBold", color: '#D946EF', type: "expense" },
  { id: uuidv4(), name: "Transportation", icon: "PiCarBold", color: '#4F46E5', type: "expense" },
  { id: uuidv4(), name: "Housing", icon: "PiHouseBold", color: '#E11D48', type: "expense" },
  { id: uuidv4(), name: "Sport", icon: "PiBarbellBold", color: '#84CC16', type: "expense" },
  { id: uuidv4(), name: "Education", icon: "PiStudentBold", color: '#06B6D4', type: "expense" },
  { id: uuidv4(), name: "Pets", icon: "PiPawPrintBold", color: '#F97316', type: "expense" },
  { id: uuidv4(), name: "Travel", icon: "PiAirplaneTiltBold", color: '#14B8A6', type: "expense" },
  { id: uuidv4(), name: "Others", icon: "PiQuestionMarkBold", color: '#B45309', type: "expense" },
  // Income categories
  { id: uuidv4(), name: "Salary", icon: "PiPiggyBank", color: '#10B981', type: "income"},
  { id: uuidv4(), name: "Pasive Incomes", icon: "PiCoins", color: '#7C3AED', type: "income"},
  { id: uuidv4(), name: "Other Incomes", icon: "PiCurrencyDollar", color: '#475569', type: "income"},
];
