import { useCategories } from "../context/CategoriesContext";
import type { Transaction } from "../types/types";
import { FaRegEdit } from 'react-icons/fa';
import { formatNumber } from "../utils/transforms";
import { useWindowSize } from "../context/WindowSizeContext";
import { FaRegTrashCan } from "react-icons/fa6";
import CategoryIconFilled from "./CategoryIconFilled";

interface Props {
  transaction: Transaction;
  showCategoryIcon?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TransactionItem = ({ transaction, showCategoryIcon = false, onEdit, onDelete }: Props) => {
  const { categories } = useCategories();
  const { width } = useWindowSize();

  return (
    <li className="flex group">
      <div className="w-full h-11 flex justify-between items-center" onClick={onEdit}>
        <div className="flex flex-1/2 gap-3 overflow-hidden h-full items-center">
          {showCategoryIcon &&
            <div className='min-w-14 h-full'>
              <CategoryIconFilled category={categories.find((c) => c.id === transaction.category)} background={false} />
            </div>
          }
          <div className="flex flex-col">
            <span className={`font-normal truncate overflow-hidden dark:text-white`} style={{ width: `${width / 3}px` }}>{transaction.name}</span>
            <span className="text-sm text-gray-400">{transaction.date}</span>
          </div>
        </div>
        <div className="flex flex-1/2 justify-end items-center gap-4">
          <span className={`font-normal ${transaction.amount > 0 ? 'text-green-900 dark:text-emerald-500' : 'text-red-800 dark:text-rose-400'}`}>
            {formatNumber(transaction.amount, 2)}$
          </span>
          <div className="flex gap-2 lg:gap-3">
            {onEdit && (
              <button
                onClick={(e) => { e.stopPropagation(); onEdit() }}
                className="hidden lg:block text-xl rounded-2xl p-2 cursor-pointer text-zinc-800 dark:text-white hover:bg-neutral-300 dark:hover:bg-gray-700 opacity-30 dark:opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <FaRegEdit />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => { e.stopPropagation(); onDelete() }}
                className="text-xl rounded-2xl p-2 cursor-pointer text-zinc-800 dark:text-white hover:bg-neutral-300 dark:hover:bg-gray-700 opacity-30 dark:opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <FaRegTrashCan />
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default TransactionItem;
