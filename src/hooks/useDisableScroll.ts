import { useEffect } from 'react';

const useDisableScroll = (isModalOpen: boolean) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);
};

export default useDisableScroll;