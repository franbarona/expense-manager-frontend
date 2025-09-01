import { useState } from "react";
import { getNextPeriod, getPrevPeriod, type TimeFilter } from "../utils/dateUtils";

export function usePeriodNavigation(timeFilter: TimeFilter, initialDate: Date = new Date()) {
  const [period, setPeriod] = useState(initialDate);

  const goPrev = () => setPeriod(p => getPrevPeriod(timeFilter, p));
  const goNext = () => setPeriod(p => getNextPeriod(timeFilter, p));

  return { period, setPeriod, goPrev, goNext };
}