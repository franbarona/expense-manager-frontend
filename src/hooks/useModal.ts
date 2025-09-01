import { useState, type MouseEvent } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      console.log("ENTROOO!")
      closeModal();
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleOverlayClick,
  };
};

export default useModal;