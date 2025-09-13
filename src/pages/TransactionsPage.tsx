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
import { ConfirmationComponent } from '../components/ui/ConfirmationComponent';
import { useAlert } from '../context/AlertContext';

const TransactionsPage = () => {
  const { transactions, setTransactions } = useTransactions();
  const { categories } = useCategories();
  const [transactionType, setTransactionType] = useState<TransactionType | undefined>('expense')
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');
  const { period, goPrev, goNext } = usePeriodNavigation(timeFilter, undefined);
  const { filtered: filteredTransactions } = useFilteredTransactions(transactions, transactionType, timeFilter, period);
  const { width } = useWindowSize();
  const { isModalOpen, openModal, closeModal, handleOverlayClick } = useModal();
  const { isModalOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal, handleOverlayClick: handleDeleteOverlayClick } = useModal();
  const [transactionSelected, setTransactionSelected] = useState<Transaction | null>(null);
  useDisableScroll(isModalOpen);
  const { addAlert } = useAlert();
  const isSticky = useStickyOnScroll();

  // Click on create
  const createTransaction = () => {
    setTransactionSelected(null);
    openModal();
  }

  // Click on edit
  const editTransaction = (transaction: Transaction) => {
    setTransactionSelected(transaction);
    openModal();
  };

  // Click on delete
  const deleteTransaction = (transaction: Transaction) => {
    setTransactionSelected(transaction);
    openDeleteModal();
    // setTransactions(transactions.filter(e => e.id !== id));
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
      addAlert({ type: 'success', message: `Transaction "${transaction?.name}" updated correctly` })
    }
  };

  const handleDeleteTransaction = () => {
    setTransactions(transactions.filter(e => e.id !== transactionSelected?.id));
    closeDeleteModal();
    addAlert({ type: 'success', message: `Transaction "${transactionSelected?.name}" deleted correctly` })
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
        <div className='w-full items-center justify-between space-y-2 flex flex-col md:flex-row'>
          <div className='flex-1'>
            <TitleComponent>Transactions</TitleComponent>
          </div>
          <div className='flex-1'>
            {/* Section Time Filter */}
            <SegmentedControlComponent
              options={TimeFilterOptions}
              value={timeFilter}
              onChange={handleChangeTimeFilter as (value: string) => void} />
          </div>
          <div className='flex-1 flex justify-end'>
            {/* Period Time Navigation */}
            <PeriodNavigationControlComponent timeFilter={timeFilter} period={period} goPrev={goPrev} goNext={goNext} />
          </div>
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
        <div className='max-w-3xl md:px-4 m-auto mb-10'>
          <div className="p-4 mb-4 md:rounded-xl">
            <EchartPieChart data={mapToPieChartData(groupTransactionsByCategory(filteredTransactions), categories)} />
          </div>
        </div>
      }

      <div className='max-w-3xl m-auto md:px-4'>
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
          <ModalComponent onClose={() => { closeModal(); setTransactionSelected(null); }} handleOverlayClick={handleOverlayClick}>
            <TransactionForm
              onSubmit={transactionSelected ? handleEditTransaction : handleAddTransaction}
              onClose={() => { closeModal(); setTransactionSelected(null); }}
              initialTransaction={transactionSelected}
              settedTransactionType={transactionType || 'expense'}
            />
          </ModalComponent>
        )
      }
      {
        isDeleteModalOpen && (
          <ModalComponent onClose={() => closeDeleteModal()} handleOverlayClick={handleDeleteOverlayClick}>
            <ConfirmationComponent
              title='Delete Transaction'
              onAccept={handleDeleteTransaction}
              onCancel={closeDeleteModal}
            >
              <span className='text-center text-secondary'> Are you sure you want to delete the transaction <br /> <strong>{transactionSelected?.name}</strong>?</span>
            </ConfirmationComponent>
          </ModalComponent>
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
