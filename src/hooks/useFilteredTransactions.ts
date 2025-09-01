import { useMemo } from "react";
import { subMonths, subYears } from "date-fns";
import { isInPeriod, type TimeFilter } from "../utils/dateUtils";
import type { Transaction } from "../types/types";

export function useFilteredTransactions(transactions: Transaction[], timeFilter: TimeFilter, period: Date) {
  const filtered = useMemo(
    () => transactions.filter(t => isInPeriod(t.date, timeFilter, period)),
    [transactions, timeFilter, period]
  );

  const prevFiltered = useMemo(
    () => transactions.filter(
      t => isInPeriod(
        t.date, timeFilter, 
        timeFilter === "month" ? subMonths(period, 1) : subYears(period, 1)
      )
    ),
    [transactions, timeFilter, period]
  );

  return { filtered, prevFiltered };
}