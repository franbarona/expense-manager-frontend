import type { Transaction } from '../types/types';
import TransactionItem from './TransactionItem';

interface Props {
  transactions: Transaction[];
  limit?: number;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

const TransactionList = ({ transactions, limit, onEdit, onDelete }: Props) => {
  let transactionsToShow = [...transactions];
  if (transactionsToShow.length === 0) {
    return <p className="text-gray-300 text-center h-full flex justify-center items-center">No transactions added yet.</p>;
  }

  if (limit) {
    transactionsToShow = transactionsToShow.slice(0, limit);
  }

  return (
    <div className={`p-3 space-y-2`}>
      {transactionsToShow.map((item, index) => (
        <div key={index} className={`pb-1 ${(index !== transactionsToShow.length - 1) ? 'border-b border-gray-200 pb-2' : ''}`}>
          <TransactionItem
            key={item.id}
            transaction={item}
            showCategoryIcon={true}
            onEdit={onEdit ? () => onEdit(item) : undefined}
            onDelete={onDelete ? () => onDelete(item.id) : undefined}
          />
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
