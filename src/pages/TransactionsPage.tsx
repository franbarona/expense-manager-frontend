import { useState } from 'react';
import { GrAdd, GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import type { TransactionType } from '../enums/enums';
import type { Transaction } from '../types/types';
import { getPeriodLabel, isInPeriod, isNextDisabled, type TimeFilter } from '../utils/dateUtils';
import { groupTransactionsByCategory, mapToPieChartData } from '../utils/transforms';
import TransactionForm from '../components/TransactionForm';
import TransactionListByCategories from '../components/TransactionListByCategories';
import EchartPieChart from '../components/charts/EchartPieChart';
import { SegmentedControlComponent } from '../components/ui/SegmentedControlComponent';
import { TimeFilterOptions, TransactionTypesOptions } from '../constants/constants';
import { usePeriodNavigation } from '../hooks/usePeriodNavigation';
import { TabsComponent } from '../components/ui/TabsComponent';
import { ActionButton } from '../components/ui/ActionButtonComponent';
import useModal from '../hooks/useModal';
import useDisableScroll from '../hooks/useDisableScroll';
import { ModalComponent } from '../components/ui/ModalComponent';
import { useTransactions } from "../context/TransactionsContext";
import { useCategories } from '../context/CategoriesContext';

const TransactionsPage = () => {
  const { transactions, setTransactions } = useTransactions();
  const { categories } = useCategories();
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [transactionType, setTransactionType] = useState<TransactionType | undefined>('expense')
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');
  const { period, goPrev, goNext } = usePeriodNavigation(timeFilter, undefined);
  const { isModalOpen, openModal, closeModal, handleOverlayClick } = useModal();
  useDisableScroll(isModalOpen);

  const isIncrementDisabled = isNextDisabled(period, timeFilter);

  // Click en crear transacción
  const createTransaction = () => {
    setTransactionToEdit(null);
    openModal();
  }

  // Click en edit
  const editTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    openModal();
  };

  // Click en borrar
  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(e => e.id !== id));
  };

  // Manejar funcionalidad de editar
  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    closeModal();
  };

  // Manejar funcionalidad de editar
  const handleEditTransaction = (transaction: Transaction) => {
    const transactionToUpdateIndex = transactions.findIndex(exp => exp.id === transaction.id);
    if (transactionToUpdateIndex !== -1) {
      const newTransactions = [...transactions];
      newTransactions.splice(transactionToUpdateIndex, 1, transaction)
      setTransactions([...newTransactions]);
      closeModal();
    }
  };

  // Change transactionType 
  const handleChangeTransactionType = (value: string | undefined) => {
    if (value === "expense" || value === "income") {
      setTransactionType(value);
    } else {
      setTransactionType(undefined);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (transactionType) {
      return transaction.type === transactionType && isInPeriod(transaction.date, timeFilter, period);
    }
    return isInPeriod(transaction.date, timeFilter, period)
  });

  const periodLabel = getPeriodLabel(timeFilter, period);

  const handleChangeTimeFilter = (value: TimeFilter) => {
    setTimeFilter(value);
  };

  return (
    <div className="pb-6 px-2 space-y-4 md:space-y-8">
      <div className="flex flex-col justify-center md:justify-between md:flex-row items-center flex-wrap space-y-4">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        {/* Filter Buttons */}
        <SegmentedControlComponent
          options={TimeFilterOptions}
          value={timeFilter}
          onChange={handleChangeTimeFilter as (value: string) => void} />

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

      <div className='max-w-3xl m-auto'>
        <div className='flex flex-col-reverse gap-2 md:flex-row justify-center md:justify-between items-center md:items-baseline flex-wrap-reverse w-full px-4 md:mb-2'>
          <TabsComponent options={TransactionTypesOptions} value={transactionType} onChange={handleChangeTransactionType} />
          <ActionButton label='Add transaction' icon={GrAdd} action={createTransaction}></ActionButton>
        </div>
        <div className="bg-white p-4 mb-4 rounded-xl shadow">
          <EchartPieChart data={mapToPieChartData(groupTransactionsByCategory(filteredTransactions), categories)} />
        </div>
      </div>

      <div className='max-w-3xl m-auto'>
        <TransactionListByCategories
          transactions={filteredTransactions}
          onEdit={editTransaction}
          onDelete={deleteTransaction}
          transactionType={transactionType}
        />
      </div>

      {/* Modal with Form */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleOverlayClick} // Detecta el clic en el overlay
        >
          <ModalComponent onClose={() => {
            closeModal();
            setTransactionToEdit(null);
          }}>
            <TransactionForm
              onSubmit={transactionToEdit ? handleEditTransaction : handleAddTransaction}
              onClose={() => { closeModal(); setTransactionToEdit(null); }}
              initialTransaction={transactionToEdit}
              settedTransactionType={transactionType || 'expense'}
            />
          </ModalComponent>
        </div>
      )}
    </div>
  );
}

export default TransactionsPage;
