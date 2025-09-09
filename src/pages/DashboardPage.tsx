import { useState } from "react";
import { filterTransactionsByType, groupExpensesByDayOfTheWeek, groupTransactionsByCategory, groupTransactionsByMonthAndType, mapToPieChartData, orderTransactionByRecentDate } from "../utils/transforms";
import { type TimeFilter } from "../utils/dateUtils";
import TransactionList from "../components/TransactionList";
import EchartPieChart from "../components/charts/EchartPieChart";
import EchartBarChart from "../components/charts/EchartBarChart";
import { SegmentedControlComponent } from "../components/ui/SegmentedControlComponent";
import { usePeriodNavigation } from "../hooks/usePeriodNavigation";
import { useFilteredTransactions } from "../hooks/useFilteredTransactions";
import { useKpiCards } from "../hooks/useKpiCards";
import { useTransactionTotals } from "../hooks/useTransactionTotals";
import { TimeFilterOptionsDashboard } from "../constants/constants";
import { useTransactions } from "../context/TransactionsContext";
import { useCategories } from "../context/CategoriesContext";
import { HeaderComponent } from "../components/ui/HeaderComponent";
import PeriodNavigationControlComponent from "../components/ui/PeriodNavigationControlComponent";
import { useStickyOnScroll } from "../hooks/useStickyOnScroll";
import { TitleComponent } from "../components/ui/TitleComponent";
import KpiCard from "../components/KpiCard";

export default function DashboardPage () {
  const { transactions } = useTransactions();
  const { categories } = useCategories();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');
  const { period, goPrev, goNext } = usePeriodNavigation(timeFilter, undefined);
  const { filtered: filteredTransactions, prevFiltered: filteredTransactionsPrevPeriod } = useFilteredTransactions(transactions, undefined, timeFilter, period);
  const { filtered: yearTransactions } = useFilteredTransactions(transactions, undefined, 'year', period);
  const { totalIncome, totalExpenses, balance, totalIncomePrev, totalExpensesPrev, balancePrev } = useTransactionTotals(filteredTransactions, filteredTransactionsPrevPeriod);
  const kpiCardsData = useKpiCards(totalIncome, totalExpenses, balance, totalIncomePrev, totalExpensesPrev, balancePrev);
  const isSticky = useStickyOnScroll();

  return (
    <div className="pb-6 space-y-2 md:space-y-5">
      <HeaderComponent isSticky={isSticky}>
        <TitleComponent>Dashboard</TitleComponent>
        {/* Section Time Filter */}
        <SegmentedControlComponent options={TimeFilterOptionsDashboard} value={timeFilter} onChange={setTimeFilter as (value: string) => void} />
        {/* Period Time Navigation */}
        <PeriodNavigationControlComponent timeFilter={timeFilter} period={period} goPrev={goPrev} goNext={goNext} />
      </HeaderComponent>
      {/* KPIs */}
      <div className="grid grid-cols-12 gap-2 md:gap-5 px-2 md:px-5">
        {
          kpiCardsData.map((card, index) => (
            <KpiCard key={index} card={card} timeFilter={timeFilter} />
          ))
        }
      </div>
      <div className="grid grid-cols-12 gap-2 md:gap-5 px-2 md:px-5" >
        <div className="col-span-12 md:col-span-7 xl:col-span-8">
          <div className="bg-white dark:bg-gray-950/95 dark:border-1 dark:border-gray-700 p-4 rounded-xl shadow">
            <TitleComponent extraClass="text-lg">Incomes vs Expenses by month</TitleComponent>
            <EchartBarChart data={groupTransactionsByMonthAndType(yearTransactions)}></EchartBarChart>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 xl:col-span-4">
          <div className="bg-white dark:bg-gray-950/95 dark:border-1 dark:border-gray-700 p-4 rounded-xl shadow">
            <TitleComponent extraClass="text-lg">Expenses</TitleComponent>
            <EchartPieChart data={mapToPieChartData(groupTransactionsByCategory(filterTransactionsByType(filteredTransactions, 'expense')), categories)} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-2 md:gap-5 px-2 md:px-5" >
        <div className="col-span-12 md:col-span-7 xl:col-span-6">
          <div className="bg-white dark:bg-gray-950/95 dark:border-1 dark:border-gray-700 p-4 rounded-xl shadow">
            <TitleComponent extraClass="text-lg">Recent transactions of {period.getFullYear()}</TitleComponent>
            <div className="h-[300px]">
              <TransactionList transactions={orderTransactionByRecentDate(yearTransactions)} limit={5} />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 xl:col-span-6">
          <div className="bg-white dark:bg-gray-950/95 dark:border-1 dark:border-gray-700 p-4 rounded-xl shadow">
            <TitleComponent extraClass="text-lg">Avarage expenses per day of the week</TitleComponent>
            <EchartBarChart data={groupExpensesByDayOfTheWeek(filteredTransactions)}></EchartBarChart>
          </div>
        </div>
      </div>
    </div>
  );
}
