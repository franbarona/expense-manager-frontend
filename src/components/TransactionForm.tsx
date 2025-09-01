import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Category, Transaction } from '../types/types';
import { TransactionTypeEnum, type TransactionType } from '../enums/enums';
import { useCategories } from '../context/CategoriesContext';
import DynamicIcon from './ui/DynamicIcon';
import { filterCategoriesByType } from '../utils/transforms';

interface Props {
  onSubmit: (transaction: Transaction) => void;
  onClose: () => void;
  initialTransaction?: Transaction | null;
  settedTransactionType: TransactionType
}

const TransactionForm = ({ onSubmit, initialTransaction, settedTransactionType }: Props) => {
  const getTodayString = () => new Date().toISOString().split('T')[0];
  const { categories } = useCategories();
  const [transactionTypeCategories, setTransactionTypeCategories] = useState<Category[]>([...filterCategoriesByType([...categories], settedTransactionType)])

  const [formData, setFormData] = useState({
    name: initialTransaction?.name || '',
    amount: initialTransaction?.amount.toString() || '',
    category: initialTransaction?.category || '',
    type: settedTransactionType,
    date: initialTransaction?.date || getTodayString(),
  });

  const resetForm = () => {
    setFormData({
      name: '',
      amount: '',
      category: '',
      type: settedTransactionType,
      date: getTodayString()
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.category.trim() !== '' &&
      formData.date.trim() !== '' &&
      !isNaN(parseFloat(formData.amount)) &&
      parseFloat(formData.amount) > 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;

    const transaction: Transaction = {
      id: initialTransaction?.id || uuidv4(),
      name: formData.name,
      amount: formData.type === TransactionTypeEnum.EXPENSE ? -parseFloat(formData.amount) : parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date,
    };

    onSubmit(transaction);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className='mb-5 flex justify-center gap-[20%]'>
        {Object.values(TransactionTypeEnum).map((transType) => (
          <button
            type='button'
            key={transType}
            onClick={() => {
              if (formData.type !== transType) {
                setTransactionTypeCategories([...filterCategoriesByType([...categories], transType as TransactionType)])
                setFormData(prev => ({
                  ...prev,
                  type: transType as TransactionType,
                  category: '',
                }));
              }
            }}
            className={`cursor-pointer text-lg ${formData.type === transType ? 'border-b-2 border-blue-800' : ''}`}
          >
            <span className='capitalize'>
              {transType}
            </span>
          </button>
        ))}
      </div>

      <div>
        <label className="block mb-1 text-blue-900">Amount*</label>
        <input
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border rounded p-2 text-blue-900"
          required
          min={0.01}
          step={0.01}
          maxLength={3}
        />
      </div>

      <div>
        <label className="block mb-1 text-blue-900">Comment*</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
          maxLength={50}
        />
      </div>

      <div>
        <label className="block mb-1 text-blue-900">Category</label>
        <div className='flex flex-wrap max-h-[200px] overflow-x-hidden overflow-y-auto'>
          {
            transactionTypeCategories.map((category) => (
              <button
                type='button'
                key={category.id}
                onClick={() => setFormData(prev => ({
                  ...prev,
                  category: category.name,
                }))}
                className={`w-1/4 flex flex-col justify-center items-center overflow-hidden text-ellipsis text-2xl p-2 cursor-pointer ${formData.category !== category.name ? 'opacity-40' : 'opacity-100'}`}
              >
                <span className={`rounded-[50%] p-4`} style={{ background: `${categories.find(cat => cat.name === category.name)?.color}20`, color: `${categories.find(cat => cat.name === category.name)?.color}` }}>
                  <DynamicIcon name={categories.find(cat => cat.name === category.name)?.icon} />
                </span>
                <span className='text-base overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full'>
                  {category.name}
                </span>
              </button>
            ))
          }
        </div>
      </div>

      <div>
        <label className="block mb-1 text-blue-900">Date*</label>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className='flex justify-center gap-2'>
        <button
          type="submit"
          disabled={!isValid()}
          className={
            `py-2 px-6 font-medium text-white rounded w-fit bg-blue-800 ${isValid()
              ? 'cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
            }`}
        >
          {initialTransaction ? 'Update ' : 'Add '} {formData.type}
        </button>
      </div>

    </form>
  );
};

export default TransactionForm;
