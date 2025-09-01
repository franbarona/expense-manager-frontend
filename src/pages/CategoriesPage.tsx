import { useState } from 'react';
import { type TransactionType } from '../enums/enums';
import { TabsComponent } from '../components/ui/TabsComponent';
import { TransactionTypesWithoutBalanceOptions } from '../constants/constants';
import { ActionButton } from '../components/ui/ActionButtonComponent';
import { GrAdd } from 'react-icons/gr';
import useModal from '../hooks/useModal';
import { ModalComponent } from '../components/ui/ModalComponent';
import CategoryForm from '../components/CategoryForm';
import type { Category } from '../types/types';
import { filterCategoriesByType } from '../utils/transforms';
import { useCategories } from '../context/CategoriesContext';
import DynamicIcon from '../components/ui/DynamicIcon';

const CategoriesPage = () => {
  const { categories, setCategories } = useCategories();
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [transactionType, setTransactionType] = useState<TransactionType | undefined>('expense');
  const { isModalOpen, openModal, closeModal, handleOverlayClick } = useModal();

  // Open modal to create category
  const createCategory = () => {
    setCategoryToEdit(null);
    openModal();
  }

  // Open modal to edit category
  const editCategory = (category: Category) => {
    setCategoryToEdit(category);
    openModal();
  }

  // Create category
  const handleCreateCategory = (category: Category) => {
    setCategories([...categories, category]);
    closeModal();
  };

  // Update category
  const handleEditCategory = (category: Category) => {
    const categoryToUpdateIndex = categories.findIndex(exp => exp.id === category.id);
    if (categoryToUpdateIndex !== -1) {
      const newCategories = [...categories];
      newCategories.splice(categoryToUpdateIndex, 1, category)
      setCategories([...newCategories]);
      closeModal();
    }
  };

  // Change transactionType 
  const handleChangeTransactionType = (value: string | undefined) => {
    if (value === "expense" || value === "income") {
      setTransactionType(value);
    } else {
      setTransactionType(undefined);
    }
  };

  const CategoryList = () => {
    return (
      <div className='flex flex-wrap justify-center overflow-x-hidden overflow-y-auto p-4'>
        {
          filterCategoriesByType(categories, 'expense').map((category) => (
            <button
              type='button'
              onClick={() => editCategory(category)}
              key={category.id}
              className={`w-1/4 flex flex-col justify-center items-center overflow-hidden text-ellipsis text-2xl p-2 cursor-pointer`}
            >
              <span className={`rounded-[50%] shadow p-4 scale-95 hover:scale-105`} style={{ background: `${category.color}30`, color: `${category.color}` }}>
                <DynamicIcon name={category.icon}></DynamicIcon>
              </span>
              <span className='text-sm md:text-base overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full'>
                {category.name}
              </span>
            </button>
          ))
        }
      </div>
    )
  }

  return (
    <div className="pb-6 px-2 space-y-4 md:space-y-8">
      <div className="flex flex-col justify-center md:justify-between md:flex-row items-center flex-wrap">
        <h1 className="text-2xl font-semibold">Categories</h1>
      </div>
      <div className='max-w-3xl m-auto'>
        <div className='flex flex-col-reverse gap-2 md:flex-row justify-center md:justify-between items-center md:items-baseline flex-wrap-reverse w-full px-4 md:mb-2'>
          <TabsComponent options={TransactionTypesWithoutBalanceOptions} value={transactionType} onChange={handleChangeTransactionType} />
          <ActionButton label='Add category' icon={GrAdd} action={createCategory}></ActionButton>
        </div>
        <div className="bg-white p-4 mb-4 rounded-xl shadow">
          <CategoryList />
        </div>
      </div>

      {/* Modal with Form */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleOverlayClick}
        >
          <ModalComponent onClose={() => {
            closeModal();
          }}>
            <CategoryForm
              onSubmit={categoryToEdit ? handleEditCategory : handleCreateCategory}
              onClose={() => { closeModal(); setCategoryToEdit(null); }}
              initialCategory={categoryToEdit}
              settedTransactionType={transactionType || 'expense'}
            />
          </ModalComponent>
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;
