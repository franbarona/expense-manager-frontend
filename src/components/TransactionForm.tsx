import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Category, Transaction } from '../types/types';
import { TransactionTypeEnum, type TransactionType } from '../enums/enums';
import { useCategories } from '../context/CategoriesContext';
import { filterCategoriesByType } from '../utils/transforms';
import { TabsComponent } from './ui/TabsComponent';
import { TransactionTypesWithoutBalanceOptions } from '../constants/constants';
import InputComponent from './ui/InputComponent';
import PickerComponent from './ui/PickerComponent';
import { ActionButton } from './ui/ActionButtonComponent';

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
    amount: initialTransaction?.amount ? Math.abs(initialTransaction?.amount).toString() : '',
    category: initialTransaction?.category || '',
    type: settedTransactionType,
    date: initialTransaction?.date || getTodayString(),
  });

  const resetForm = () => {
    setFormData(prev => ({
      ...prev,
      name: '',
      amount: '',
      category: '',
    }));
  };

  const handleChangeTransactionType = (value: string | undefined) => {
    setFormData(prev => ({
      ...prev,
      type: value as TransactionType,
    }));
    setTransactionTypeCategories([...filterCategoriesByType([...categories], value as TransactionType)]);
    handleChangeCategorySelected('');
  }

  const handleChangeCategorySelected = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value,
    }));
  }

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
      <div className='mb-4'>
        <TabsComponent options={TransactionTypesWithoutBalanceOptions} value={formData.type} onChange={handleChangeTransactionType} />
      </div>
      <InputComponent name='name' type='text' value={formData.name} placeholder='name' onChange={handleChange} />
      <InputComponent name='amount' type='number' value={formData.amount} placeholder='amount' onChange={handleChange} />
      <PickerComponent label='Category' type='categories' selectedValue={formData.category} options={transactionTypeCategories} onSelect={handleChangeCategorySelected} height={35} />
      <InputComponent name='date' type='date' value={formData.date} placeholder='date' onChange={handleChange} />
      <div className='flex justify-center gap-2'>
        <ActionButton label={`${initialTransaction ? 'Update ' : 'Add '} ${formData.type}`} disabled={!isValid()} action={handleSubmit} />
      </div>
    </form>
  );
};

export default TransactionForm;
