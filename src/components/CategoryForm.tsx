import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Category } from '../types/types';
import { type TransactionType } from '../enums/enums';
import DynamicIcon from './ui/DynamicIcon';
import { TabsComponent } from './ui/TabsComponent';
import { CATEGORY_ICON_LIST, TAILWIND_COLORS_600, TransactionTypesWithoutBalanceOptions } from '../constants/constants';
import { ActionButton } from './ui/ActionButtonComponent';
import InputComponent from './ui/InputComponent';
import PickerComponent from './ui/PickerComponent';
import { FaRegTrashAlt } from 'react-icons/fa';

interface Props {
  onSubmit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onClose: () => void;
  initialCategory?: Category | null;
  settedTransactionType: TransactionType
}

const CategoryForm = ({ onSubmit, onDelete, initialCategory, settedTransactionType }: Props) => {
  const [formData, setFormData] = useState({
    name: initialCategory?.name || '',
    icon: initialCategory?.icon || '',
    color: initialCategory?.color || '',
    type: settedTransactionType
  });

  const resetForm = () => {
    setFormData(prev => ({
      ...prev,
      name: '',
      icon: '',
      color: '',
      type: settedTransactionType,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTransactionType = (value: string | undefined) => {
    setFormData(prev => ({
      ...prev,
      type: value as TransactionType,
    }));
  }

  const isValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.icon &&
      formData.color
    );
  };

  const handleChangeColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      color: color
    }));
  };

  const handleChangeIcon = (icon: string) => {
    setFormData(prev => ({
      ...prev,
      icon: icon
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;

    const category: Category = {
      id: initialCategory?.id || uuidv4(),
      name: formData.name,
      icon: formData.icon as string,
      color: formData.color as string,
      type: formData.type,
    };

    onSubmit(category);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TabsComponent options={TransactionTypesWithoutBalanceOptions} value={formData.type} onChange={handleChangeTransactionType} />
      <div className='flex gap-5 justify-between items-end'>
        <div className='w-full'>
          <InputComponent name='name' type='text' value={formData.name} placeholder='name' onChange={handleChange} />
        </div>
        <span className={`rounded-full text-3xl p-2`} style={{ background: `${formData?.color}20`, color: `${formData?.color}`, border: `1px solid ${formData?.color}30` }}>
          <DynamicIcon name={formData?.icon}></DynamicIcon>
        </span>
      </div>

      {/* Icon picker */}
      <PickerComponent label='Symbol' type='icons' selectedValue={formData.icon} options={CATEGORY_ICON_LIST} onSelect={handleChangeIcon} columns={6} />
      {/* Color picker */}
      <PickerComponent label='Color' type='colors' selectedValue={formData.color} options={Object.values(TAILWIND_COLORS_600)} onSelect={handleChangeColor} columns={8} />

      <div className='flex justify-center gap-4'>
        <ActionButton label={(initialCategory ? 'Update ' : 'Add ') + 'category'} disabled={!isValid()}></ActionButton>
        {
          initialCategory &&
          <ActionButton label={'Delete'} style='remove' icon={FaRegTrashAlt} action={() => onDelete(initialCategory)}></ActionButton>
        }
      </div>
    </form>
  );
};

export default CategoryForm;
