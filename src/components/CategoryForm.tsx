import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Category } from '../types/types';
import { TransactionTypeEnum, type TransactionType } from '../enums/enums';
import { ColorPickerComponent } from './ui/ColorPickerComponent';
import { IconPickerComponent } from './ui/IconPickerComponent';
import DynamicIcon from './ui/DynamicIcon';

interface Props {
  onSubmit: (category: Category) => void;
  onClose: () => void;
  initialCategory?: Category | null;
  settedTransactionType: TransactionType
}

const CategoryForm = ({ onSubmit, initialCategory, settedTransactionType }: Props) => {
  const [colorSelectorOpen, setColorSelectorOpen] = useState<boolean>(false);
  const [iconSelectorOpen, setIconSelectorOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: initialCategory?.name || '',
    icon: initialCategory?.icon || undefined,
    color: initialCategory?.color || undefined,
    type: settedTransactionType
  });

  const resetForm = () => {
    setFormData({
      name: '',
      icon: undefined,
      color: undefined,
      type: settedTransactionType,
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
      formData.icon &&
      formData.color
    );
  };

  const handleChangeColor = (color: string) => {
    formData.color = color;
    setColorSelectorOpen(false);
  };

  const handleChangeIcon = (icon: string) => {
    formData.icon = icon;
    setIconSelectorOpen(false);
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className='mb-5 flex justify-center gap-[20%]'>
        {Object.values(TransactionTypeEnum).map((transType) => (
          <button
            type='button'
            key={transType}
            onClick={() => {
              if (formData.type !== transType) {
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
        <label className="block mb-1 text-blue-900">Name*</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-blue-900">Icon*</label>
        {
          iconSelectorOpen &&
          <div className='max-h-50 overflow-auto'>
            <IconPickerComponent value={formData.icon} onChange={handleChangeIcon} />
          </div>
        }
        {
          !iconSelectorOpen &&
          <div className='w-full border rounded p-2 flex justify-around cursor-pointer' onClick={() => setIconSelectorOpen(true)}>
            {formData.icon && <div className='text-2xl'><DynamicIcon name={formData.icon} /></div>}
            {!formData.icon && <span className='opacity-50'>Select an icon</span>}
          </div>
        }
      </div>

      <div>
        <label className="block mb-1 text-blue-900">Color*</label>
        {
          colorSelectorOpen &&
          <ColorPickerComponent value={formData.color} onChange={handleChangeColor} />
        }
        {
          !colorSelectorOpen &&
          <div className='w-full border rounded p-2 flex justify-around cursor-pointer' onClick={() => setColorSelectorOpen(true)}>
            {
              formData.color &&
              <div className={`w-full h-8 rounded-lg transition transform `} style={{ backgroundColor: formData.color }}></div>
            }
            {
              !formData.color && <span className='opacity-50'>Select a color</span>
            }
          </div>
        }
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
          {initialCategory ? 'Update ' : 'Add '} category
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
