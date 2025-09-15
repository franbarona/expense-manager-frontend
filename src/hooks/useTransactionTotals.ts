import { useMemo } from "react";
import type { Transaction } from "../types/types";

export function useTransactionTotals (transactions: Transaction[], prevTransactions: Transaction[]) {

  const totalIncome = useMemo(
    () => transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );

  const balance = totalIncome + totalExpenses;

  const totalIncomePrev = useMemo(
    () => prevTransactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0),
    [prevTransactions]
  );

  const totalExpensesPrev = useMemo(
    () => prevTransactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0),
    [prevTransactions]
  );

  const balancePrev = totalExpensesPrev + totalIncomePrev;

  return { totalIncome, totalExpenses, balance, totalIncomePrev, totalExpensesPrev, balancePrev };
}