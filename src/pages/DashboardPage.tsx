import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { filterTransactionsByType, formatNumber, groupExpensesByDayOfTheWeek, groupTransactionsByCategory, groupTransactionsByMonthAndType, mapToPieChartData, orderTransactionByRecentDate } from "../utils/transforms";
import { getPeriodLabel, isNextDisabled, type TimeFilter } from "../utils/dateUtils";
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

export default function DashboardPage () {
  const { transactions } = useTransactions();
  const { categories } = useCategories();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');
  const { period, goPrev, goNext } = usePeriodNavigation(timeFilter, undefined);
  const { filtered: filteredTransactions, prevFiltered: filteredTransactionsPrevPeriod } = useFilteredTransactions(transactions, timeFilter, period);
  const { filtered: yearTransactions } = useFilteredTransactions(transactions, 'year', period);

  const isIncrementDisabled = isNextDisabled(period, timeFilter);

  const { totalIncome, totalExpenses, balance, totalIncomePrev, totalExpensesPrev, balancePrev } = useTransactionTotals(filteredTransactions, filteredTransactionsPrevPeriod);

  const kpiCardsData = useKpiCards(totalIncome, totalExpenses, balance, totalIncomePrev, totalExpensesPrev, balancePrev);

  const periodLabel = getPeriodLabel(timeFilter, period);

  return (
    <div className="pb-6 px-2 space-y-8">
      <div className="flex flex-col justify-center md:justify-between md:flex-row items-center flex-wrap space-y-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        {/* Time period selector */}
        <SegmentedControlComponent options={TimeFilterOptionsDashboard} value={timeFilter} onChange={setTimeFilter as (value: string) => void} />

        {/* Period Navigation */}
        <div className="flex justify-between items-center text-sm text-gray-600 gap-5">
          <button
            onClick={goPrev}
            className="relative cursor-pointer inline-flex p-2 items-center justify-center rounded-md border-neutral-200 text-neutral-600 bg-transparent transition-colors hover:bg-neutral-200"
          >
            <GrLinkPrevious />
          </button>
          <span>{periodLabel}</span>
          <button
            onClick={goNext}
            disabled={isIncrementDisabled}
            className={`relative cursor-pointer inline-flex p-2 items-center justify-center rounded-md border-neutral-200 text-neutral-600 bg-transparent transition-colors hover:bg-neutral-200 ${isIncrementDisabled ? 'opacity-20' : ''}`}
          >
            <GrLinkNext />
          </button>
        </div>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-4 xl:grid-cols-12 gap-4">
        {
          kpiCardsData.map((card) => (
            <div key={card.name} className='bg-white rounded-xl shadow p-6 flex flex-col gap-4 justify-center col-span-4 xl:col-span-4'>
              <div className='flex justify-between gap-5 items-center'>
                <h4 className='text-lg'>{card.name}</h4>
                <div className={`rounded-xl flex justify-center items-center gap-2 px-4 text-sm ${card.variancePercentage > 0 ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                  {card.variancePercentage > 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
                  {formatNumber(card.variancePercentage, 1)}%
                </div>
              </div>
              <div className="flex gap-2">
                <h2 className='text-2xl font-semibold'>{formatNumber(card.amount, 0)}$</h2>
              </div>
              <span className="text-gray-400 text-sm">{card.variance > 0 && '+'}{formatNumber(card.variance, 1)} compared with prev. {timeFilter}</span>
            </div>
          ))
        }
      </div>
      <div className="grid grid-cols-12 gap-4" >
        <div className="col-span-12 md:col-span-7 xl:col-span-8">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg">Incomes vs Expenses by month</h2>
            <EchartBarChart data={groupTransactionsByMonthAndType(yearTransactions)}></EchartBarChart>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 xl:col-span-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg">Expenses</h2>
            <EchartPieChart data={mapToPieChartData(groupTransactionsByCategory(filterTransactionsByType(filteredTransactions, 'expense')), categories)} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4" >
        <div className="col-span-12 md:col-span-7 xl:col-span-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg">Recent transactions of {period.getFullYear()}</h2>
            <div className="h-[300px]">
              <TransactionList transactions={orderTransactionByRecentDate(yearTransactions)} limit={5} height={300} />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 xl:col-span-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg truncate">Avarage expenses per day of the week</h2>
            <EchartBarChart data={groupExpensesByDayOfTheWeek(filteredTransactions)}></EchartBarChart>
          </div>
        </div>
      </div>
    </div>
  );
}
