import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { type TransactionType } from '../enums/enums';
import type { Category } from '../types/types';
import { TransactionTypesWithoutBalanceOptions } from '../constants/constants';
// Contexts
import { useCategories } from '../context/CategoriesContext';
import { useWindowSize } from '../context/WindowSizeContext';
// Hooks
import useModal from '../hooks/useModal';
import { useStickyOnScroll } from '../hooks/useStickyOnScroll';
// Components
import { TabsComponent } from '../components/ui/TabsComponent';
import { ActionButton } from '../components/ui/ActionButtonComponent';
import { ModalComponent } from '../components/ui/ModalComponent';
import CategoryForm from '../components/CategoryForm';
import { HeaderComponent } from '../components/ui/HeaderComponent';
import CategoryList from '../components/CategoryList';
import { TitleComponent } from '../components/ui/TitleComponent';

const CategoriesPage = () => {
  const { categories, setCategories } = useCategories();
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [transactionType, setTransactionType] = useState<TransactionType | undefined>('expense');
  const { isModalOpen, openModal, closeModal, handleOverlayClick } = useModal();
  const { width } = useWindowSize();
  const isSticky = useStickyOnScroll();

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

  return (
    <div className="pb-6">
      <HeaderComponent isSticky={isSticky}>
        <div className='w-full flex flex-col md:flex-row items-center justify-between space-y-2'>
          <TitleComponent>Categories</TitleComponent>
        </div>
        <div className='flex flex-col-reverse gap-2 md:flex-row justify-center md:justify-between items-center md:items-baseline flex-wrap-reverse w-full px-4 md:mb-1 max-w-3xl m-auto'>
          <TabsComponent options={TransactionTypesWithoutBalanceOptions} value={transactionType} onChange={handleChangeTransactionType} />
          {
            width >= 448 &&
            <ActionButton label='Add category' icon={FaPlus} isMobileDesign={width < 448} action={createCategory}></ActionButton>
          }
        </div>
      </HeaderComponent>
      <div className='max-w-3xl px-2 m-auto'>
        <div className="bg-white dark:bg-gray-950/95 dark:border-1 dark:border-gray-700 p-4 mb-4 rounded-xl shadow">
          <CategoryList categories={categories} transactionType={transactionType} onEdit={editCategory} />
        </div>
      </div>

      {/* Modal with Form */}
      {isModalOpen && (
        <ModalComponent onClose={() => closeModal()} handleOverlayClick={handleOverlayClick}>
          <CategoryForm
            onSubmit={categoryToEdit ? handleEditCategory : handleCreateCategory}
            onClose={() => { closeModal(); setCategoryToEdit(null); }}
            initialCategory={categoryToEdit}
            settedTransactionType={transactionType || 'expense'}
          />
        </ModalComponent>
      )}
      {/* Mobile button add */}
      {
        width < 448 &&
        <div className='fixed bottom-5 right-5'>
          <ActionButton label='Add category' icon={FaPlus} isMobileDesign={width < 448} action={createCategory}></ActionButton>
        </div>
      }
    </div>
  );
}

export default CategoriesPage;
