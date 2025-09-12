import { useState } from 'react';
import type { Transaction } from '../types/types';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa6';
import { type TransactionType } from '../enums/enums';
import TransactionItem from './TransactionItem';
import { useCategories } from '../context/CategoriesContext';
import { formatNumber } from '../utils/transforms';
import CategoryIconFilled from './CategoryIconFilled';

interface Props {
  transactions: Transaction[];
  transactionType?: TransactionType;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

const TransactionListByCategories = ({ transactions, transactionType, onEdit, onDelete }: Props) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const { categories } = useCategories();

  if (transactions.length === 0) {
    return <p className="text-secondary text-center">No
      {
        !transactionType
          ? ' transactions '
          : ` ${transactionType} `
      }
      added yet.</p>;
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleExpandAll = () => {
    const newState: Record<string, boolean> = {};
    for (const category of Object.keys(grouped)) {
      newState[category] = true;
    }
    setExpandedCategories(newState);
  };

  const handleCollapseAll = () => {
    const newState: Record<string, boolean> = {};
    for (const category of Object.keys(grouped)) {
      newState[category] = false;
    }
    setExpandedCategories(newState);
  };

  const grouped = transactions.reduce<Record<string, Transaction[]>>((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = [];
    }
    acc[transaction.category].push(transaction);
    return acc;
  }, {});

  return (
    <div className="md:space-y-4">
      <div className='flex flex-col md:flex-row justify-center md:justify-between items-center md:items-baseline mb-2 gap-2'>
        <h2 className='text-sm md:text-lg capitalize text-primary'>{
          !transactionType
            ? 'Transactions'
            : transactionType + 's'
        } by category</h2>
        <div className="flex justify-center md:justify-end gap-2">
          <button
            onClick={handleExpandAll}
            className="text-sm text-secondary bg-secondary px-3 py-1 rounded hover:bg-rose-300 dark:hover:bg-neutral-600 cursor-pointer"
          >
            Expand All
          </button>
          <button
            onClick={handleCollapseAll}
            className="text-sm text-secondary bg-secondary px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-neutral-600 cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>
      {Object.entries(grouped).map(([categoryId, items]) => {
        const transactionCategory = categories.find((category) => category.id === categoryId);
        const total = items.reduce((sum, exp) => sum + exp.amount, 0);
        const isExpanded = expandedCategories[categoryId];

        return (
          <div key={categoryId} className="shadow-lg md:rounded-xl overflow-hidden bg-surface border-primary">
            <button
              onClick={() => toggleCategory(categoryId)}
              className="w-full text-left p-3 flex justify-between items-center font-medium cursor-pointer"
            >
              <span className={`inline-flex items-center gap-2 rounded`}>
                <CategoryIconFilled category={transactionCategory}/>
                <span className='font-medium dark:text-white'>
                  {transactionCategory?.name} ({items.length})
                </span>
              </span>
              <div className='flex gap-2 justify-center items-center flex-nowrap'>
                <span className={`flex justify-center items-center gap-2 ${total > 0 ? 'text-green-900 dark:text-emerald-500' : 'text-red-800 dark:text-rose-600'}`}>{formatNumber(total, 2)}$</span>
                <span className='dark:text-white'>{isExpanded ? <FaAngleUp /> : <FaAngleDown />}</span>
              </div>
            </button>

            {isExpanded && (
              <div className="bg-surface-variant">
                {items.map((item, index) => (
                  <div key={index} className={`px-3 py-2 pb-1 cursor-pointer ${(index !== items.length - 1) ? 'border-b border-[var(--color-border)] pb-2' : ''}`}>
                    <TransactionItem
                      key={item.id}
                      transaction={item}
                      onEdit={() => onEdit(item)}
                      onDelete={() => onDelete(item)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TransactionListByCategories;
