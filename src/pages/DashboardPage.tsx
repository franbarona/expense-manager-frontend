import { useState } from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { filterTransactionsByType, formatNumber, groupExpensesByDayOfTheWeek, groupTransactionsByCategory, groupTransactionsByMonthAndType, mapToPieChartData, orderTransactionByRecentDate } from "../utils/transforms";
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
    <div className="pb-6 px-2 space-y-8">
      <HeaderComponent isSticky={isSticky}>
        <TitleComponent>Dashboard</TitleComponent>
        {/* Section Time Filter */}
        <SegmentedControlComponent options={TimeFilterOptionsDashboard} value={timeFilter} onChange={setTimeFilter as (value: string) => void} />
        {/* Period Time Navigation */}
        <PeriodNavigationControlComponent timeFilter={timeFilter} period={period} goPrev={goPrev} goNext={goNext} />
      </HeaderComponent>
      {/* KPIs */}
      <div className="grid grid-cols-4 xl:grid-cols-12 gap-4">
        {
          kpiCardsData.map((card) => (
            <div key={card.name} className='bg-white dark:bg-gray-950/95 dark:border-1 dark:border-gray-700 rounded-xl shadow p-6 flex flex-col gap-4 justify-center col-span-4 xl:col-span-4'>
              <div className='flex justify-between gap-5 items-center'>
                <TitleComponent extraClass="text-lg">{card.name}</TitleComponent>
                <div className={`rounded-xl flex justify-center items-center gap-2 px-4 text-sm ${card.variancePercentage > 0 ? 'bg-green-100 text-green-900 dark:bg-emerald-200 dark:tex-emerald-600' : 'bg-rose-100 text-red-900 dark:bg-rose-200 dark:text-rose-600'}`}>
                  {card.variancePercentage > 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
                  {formatNumber(card.variancePercentage, 1)}%
                </div>
              </div>
              <div className="flex gap-2">
                <h2 className='text-2xl font-semibold dark:text-white'>{formatNumber(card.amount, 0)}$</h2>
              </div>
              <span className="text-gray-400 text-sm">{card.variance > 0 && '+'}{formatNumber(card.variance, 1)} compared with prev. {timeFilter}</span>
            </div>
          ))
        }
      </div>
      <div className="grid grid-cols-12 gap-4" >
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
      <div className="grid grid-cols-12 gap-4" >
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
