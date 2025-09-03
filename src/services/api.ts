import axios from "axios";
import type { Category, Transaction } from "../types/types";

const API_URL = "http://localhost:5000/api"; // cambia si tu back está en otro host/puerto

// ========== Categorías ==========
export const getCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`);
  return res.data;
};

export const createCategory = async (category: {
  name: string;
  icon: string;
  color: string;
  type: "expense" | "income";
}) => {
  const res = await axios.post(`${API_URL}/categories`, category);
  return res.data;
};

export const updateCategory = async (id: string, category: Category) => {
  const res = await axios.put(`${API_URL}/categories/${id}`, category);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await axios.delete(`${API_URL}/categories/${id}`);
  return res.data;
};

// ========== Transacciones ==========
export const getTransactions = async (populate = false) => {
  const url = populate
    ? `${API_URL}/transactions?populate=true`
    : `${API_URL}/transactions`;
  const res = await axios.get(url);
  return res.data;
};

export const createTransaction = async (transaction: {
  name: string;
  amount: number;
  category: string;
  type: "expense" | "income";
  date: string;
}) => {
  const res = await axios.post(`${API_URL}/transactions`, transaction);
  return res.data;
};

export const updateTransaction = async (id: string, transaction: Transaction) => {
  const res = await axios.put(`${API_URL}/transactions/${id}`, transaction);
  return res.data;
};

export const deleteTransaction = async (id: string) => {
  const res = await axios.delete(`${API_URL}/transactions/${id}`);
  return res.data;
};