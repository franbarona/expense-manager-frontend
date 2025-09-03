import { useState } from 'react';
import type { Transaction } from '../types/types';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa6';
import { type TransactionType } from '../enums/enums';
import TransactionItem from './TransactionItem';
import { useCategories } from '../context/CategoriesContext';
import DynamicIcon from './ui/DynamicIcon';
import { formatNumber } from '../utils/transforms';

interface Props {
  transactions: Transaction[];
  transactionType?: TransactionType;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionListByCategories = ({ transactions, transactionType, onEdit, onDelete }: Props) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const { categories } = useCategories();

  if (transactions.length === 0) {
    return <p className="text-gray-300 text-center">No
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
    <div className="space-y-4">
      <div className='flex flex-col md:flex-row justify-center md:justify-between items-center md:items-baseline mb-2 gap-2'>
        <h2 className='text-sm md:text-lg capitalize dark:text-white'>{
          !transactionType
            ? 'Transactions'
            : transactionType + 's'
        } by category</h2>
        <div className="flex justify-center md:justify-end gap-2">
          <button
            onClick={handleExpandAll}
            className="text-sm text-gray-400 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
          >
            Expand All
          </button>
          <button
            onClick={handleCollapseAll}
            className="text-sm bg-gray-200 dark:bg-gray-500 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>
      {Object.entries(grouped).map(([categoryName, items]) => {
        const transactionCategory = categories.find((category) => category.name === categoryName) || {
          icon: undefined,
          color: 'bg-gray-100 text-gray-700',
        };
        const total = items.reduce((sum, exp) => sum + exp.amount, 0);
        const isExpanded = expandedCategories[categoryName];

        return (
          <div key={categoryName} className="shadow-lg rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-950 dark:border-1 dark:border-gray-700">
            <button
              onClick={() => toggleCategory(categoryName)}
              className="w-full text-left p-3 flex justify-between items-center font-medium cursor-pointer"
            >
              <span className={`inline-flex items-center gap-2 rounded`}>
                <span className={`rounded-[50%] text-2xl p-2`} style={{ background: `${transactionCategory.color}20`, color: `${transactionCategory.color}` }}>
                  <DynamicIcon name={transactionCategory.icon}></DynamicIcon>
                </span>
                <span className='font-medium dark:text-white'>
                  {categoryName} ({items.length})
                </span>
              </span>
              <div className='flex gap-2 justify-center items-center flex-nowrap'>
                <span className={`flex justify-center items-center gap-2 ${total > 0 ? 'text-green-900 dark:text-green-500/85' : 'text-red-800 dark:text-rose-500'}`}>{formatNumber(total, 2)}$</span>
                <span className='dark:text-white'>{isExpanded ? <FaAngleUp /> : <FaAngleDown />}</span>
              </div>
            </button>

            {isExpanded && (
              <div className="bg-neutral-100 dark:bg-blue-950/10">
                {items.map((item, index) => (
                  <div key={index} className={`px-3 py-2 pb-1 cursor-pointer hover:bg-neutral-200 dark:hover:bg-blue-950/20 ${(index !== items.length - 1) ? 'border-b border-gray-200 dark:border-gray-700 pb-2' : ''}`}>
                    <TransactionItem
                      key={item.id}
                      transaction={item}
                      onEdit={() => onEdit(item)}
                      onDelete={() => onDelete(item.id)}
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
