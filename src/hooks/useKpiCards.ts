import { useMemo } from "react";
import { transformNumberToPositive } from "../utils/transforms";

export function useKpiCards (
  totalIncome: number, totalExpenses: number, balance: number,
  totalIncomePrev: number, totalExpensesPrev: number, balancePrev: number
) {
  return useMemo(() => [
    {
      name: "Total Balance",
      amount: balance,
      variance: balance - balancePrev,
      variancePercentage: ((balance - balancePrev) / balancePrev) * 100
    },
    {
      name: "Income",
      amount: totalIncome,
      variance: totalIncome - totalIncomePrev,
      variancePercentage: ((totalIncome - totalIncomePrev) / totalIncomePrev) * 100
    },
    {
      name: "Expenses",
      amount: transformNumberToPositive(totalExpenses),
      variance: transformNumberToPositive(totalExpenses) - transformNumberToPositive(totalExpensesPrev),
      variancePercentage: ((totalExpenses - totalExpensesPrev) / totalExpensesPrev) * 100
    }
  ], [totalIncome, totalExpenses, balance, totalIncomePrev, totalExpensesPrev, balancePrev]);
}