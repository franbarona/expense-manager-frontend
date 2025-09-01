import { useCategories } from "../context/CategoriesContext";
import type { Transaction } from "../types/types";
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import DynamicIcon from "./ui/DynamicIcon";
import { formatNumber } from "../utils/transforms";
import { useWindowSize } from "../context/WindowSizeContext";

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
    <li className="flex">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-1/2 gap-3 overflow-hidden">
          {showCategoryIcon && (
            <span
              className={`rounded-[50%] text-2xl p-2 m-auto`}
              style={{
                background: `${categories.find((c) => c.name === transaction.category)?.color}20`,
                color: `${categories.find((c) => c.name === transaction.category)?.color}`,
              }}
            >
              <DynamicIcon name={categories.find((c) => c.name === transaction.category)?.icon} />
            </span>
          )}
          <div className="flex flex-col">
            <span className={`font-normal truncate overflow-hidden`} style={{width: `${width/3}px`}}>{transaction.name}</span>
            <span className="text-sm text-gray-400">{transaction.date}</span>
          </div>
        </div>
        <div className="flex flex-1/2 justify-end items-center gap-2">
          <span className={`font-normal ${transaction.amount > 0 ? 'text-green-900' : 'text-red-800'}`}>
            {formatNumber(transaction.amount, 2)}$
          </span>
          <div className="flex gap-2 lg:gap-4 ">
            {onEdit && (
              <button
                onClick={onEdit}
                className="text-zinc-700 text-base font-semibold rounded cursor-pointer flex justify-center items-center md:border md:px-3 md:py-1 gap-1 hover:bg-gray-200"
              >
                <FaRegEdit />
                <span className="hidden lg:block">Edit</span>
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="text-red-700 text-base font-semibold rounded cursor-pointer flex justify-center items-center md:border md:px-3 md:py-1 gap-1 hover:bg-red-100"
              >
                <FaRegTrashAlt />
                <span className="hidden lg:block">Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default TransactionItem;
