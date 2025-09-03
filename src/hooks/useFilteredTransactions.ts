import { useMemo } from "react";
import { subMonths, subYears } from "date-fns";
import { isInPeriod, type TimeFilter } from "../utils/dateUtils";
import type { Transaction, TransactionType } from "../types/types";

export function useFilteredTransactions(transactions: Transaction[], transactionType: TransactionType | undefined, timeFilter: TimeFilter, period: Date) {
  const filtered = useMemo(
    () =>
      transactions.filter(transaction => {
        const isTypeMatch = transactionType ? transaction.type === transactionType : true;
        const isInPeriodMatch = isInPeriod(transaction.date, timeFilter, period);
        return isTypeMatch && isInPeriodMatch;
      }),
    
    [transactions, transactionType, timeFilter, period]
  );

  const prevFiltered = useMemo(
    () =>
      transactions.filter(transaction => {
        const isTypeMatch = transactionType ? transaction.type === transactionType : true;
        const isInPeriodMatch = isInPeriod(transaction.date, timeFilter, timeFilter === "month" ? subMonths(period, 1) : subYears(period, 1));
        return isTypeMatch && isInPeriodMatch;
      }
    ),
    [transactions, transactionType, timeFilter, period]
  );

  return { filtered, prevFiltered };
}