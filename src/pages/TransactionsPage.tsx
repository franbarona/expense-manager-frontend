import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { SIZES, TimeFilterOptions, TransactionTypesOptions } from '../constants/constants';
import type { TransactionType } from '../enums/enums';
import type { Transaction } from '../types/types';
// Contexts
import { useTransactions } from "../context/TransactionsContext";
import { useCategories } from '../context/CategoriesContext';
import { useWindowSize } from "../context/WindowSizeContext";
// Utils
import { type TimeFilter } from '../utils/dateUtils';
import { groupTransactionsByCategory, mapToPieChartData } from '../utils/transforms';
// Hooks
import useDisableScroll from '../hooks/useDisableScroll';
import useModal from '../hooks/useModal';
import { usePeriodNavigation } from '../hooks/usePeriodNavigation';
import { useFilteredTransactions } from '../hooks/useFilteredTransactions';
import { useStickyOnScroll } from '../hooks/useStickyOnScroll';
// Components
import TransactionForm from '../components/TransactionForm';
import TransactionListByCategories from '../components/TransactionListByCategories';
import EchartPieChart from '../components/charts/EchartPieChart';
import { SegmentedControlComponent } from '../components/ui/SegmentedControlComponent';
import { TabsComponent } from '../components/ui/TabsComponent';
import { ActionButton } from '../components/ui/ActionButtonComponent';
import { ModalComponent } from '../components/ui/ModalComponent';
import PeriodNavigationControlComponent from '../components/ui/PeriodNavigationControlComponent';
import { HeaderComponent } from '../components/ui/HeaderComponent';
import { TitleComponent } from '../components/ui/TitleComponent';

const TransactionsPage = () => {
  const { transactions, setTransactions } = useTransactions();
  const { categories } = useCategories();
  const [transactionType, setTransactionType] = useState<TransactionType | undefined>('expense')
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');
  const { period, goPrev, goNext } = usePeriodNavigation(timeFilter, undefined);
  const { filtered: filteredTransactions } = useFilteredTransactions(transactions, transactionType, timeFilter, period);
  const { width } = useWindowSize();
  const { isModalOpen, openModal, closeModal, handleOverlayClick } = useModal();
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  useDisableScroll(isModalOpen);
  const isSticky = useStickyOnScroll();

  // Click en crear transacción
  const createTransaction = () => {
    setTransactionToEdit(null);
    openModal();
  }

  // Click en edit transacción
  const editTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    openModal();
  };

  // Click en borrar transacción
  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(e => e.id !== id));
  };

  // Manejar funcionalidad de crear transacción
  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    closeModal();
  };

  // Manejar funcionalidad de editar transacción
  const handleEditTransaction = (transaction: Transaction) => {
    const transactionToUpdateIndex = transactions.findIndex(exp => exp.id === transaction.id);
    if (transactionToUpdateIndex !== -1) {
      const newTransactions = [...transactions];
      newTransactions.splice(transactionToUpdateIndex, 1, transaction)
      setTransactions([...newTransactions]);
      closeModal();
    }
  };

  // Cambiar tipo de transacción
  const handleChangeTransactionType = (value: string | undefined) => {
    if (value === "expense" || value === "income") {
      setTransactionType(value);
    } else {
      setTransactionType(undefined);
    }
  };

  //Cambiar bloque de periodo de tiempo
  const handleChangeTimeFilter = (value: TimeFilter) => {
    setTimeFilter(value);
  };

  return (
    <div className="pb-6">
      <HeaderComponent isSticky={isSticky}>
        <div className='w-full flex flex-col md:flex-row items-center justify-between'>
          <TitleComponent>Transactions</TitleComponent>
          {/* Section Time Filter */}
          <SegmentedControlComponent
            options={TimeFilterOptions}
            value={timeFilter}
            onChange={handleChangeTimeFilter as (value: string) => void} />

          {/* Period Time Navigation */}
          <PeriodNavigationControlComponent timeFilter={timeFilter} period={period} goPrev={goPrev} goNext={goNext} />
        </div>

        <div className='flex flex-col-reverse gap-2 md:flex-row justify-center md:justify-between items-center md:items-baseline flex-wrap-reverse w-full px-4 md:mb-1 max-w-3xl m-auto'>
          <TabsComponent options={TransactionTypesOptions} value={transactionType} onChange={handleChangeTransactionType} />
          {
            width >= SIZES.MD &&
            <ActionButton label='Add transaction' icon={FaPlus} isMobileDesign={false} action={createTransaction}></ActionButton>
          }
        </div>
      </HeaderComponent>

      {
        filteredTransactions.length &&
        <div className='max-w-3xl px-2 m-auto'>
          <div className="bg-white dark:bg-gray-950/95 dark:border-1 dark:border-gray-700 p-4 mb-4 rounded-xl shadow">
            <EchartPieChart data={mapToPieChartData(groupTransactionsByCategory(filteredTransactions), categories)} />
          </div>
        </div>
      }


      <div className='max-w-3xl m-auto'>
        <TransactionListByCategories
          transactions={filteredTransactions}
          onEdit={editTransaction}
          onDelete={deleteTransaction}
          transactionType={transactionType}
        />
      </div>

      {/* Modal with Form */}
      {
        isModalOpen && (
          <div
            className="fixed h-full inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 flex justify-center items-center z-50"
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
        )
      }
      {/* Mobile button add */}
      {
        width < SIZES.MD &&
        <div className='fixed bottom-5 right-5'>
          <ActionButton label='Add transaction' icon={FaPlus} isMobileDesign={true} action={createTransaction}></ActionButton>
        </div>
      }
    </div >
  );
}

export default TransactionsPage;
