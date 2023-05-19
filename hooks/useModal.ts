import { useMemo } from 'react';

import { useRecoilState } from 'recoil';

import { ModalName, modalState } from '@/states/modal';

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = useMemo(
    () => (modalName: ModalName) => {
      setModal((prev) => ({
        ...prev,
        [modalName]: true,
      }));
    },
    [setModal]
  );

  const closeModal = (modalName: ModalName) => {
    setModal({
      ...modal,
      [modalName]: false,
    });
  };

  return { modal, openModal, closeModal };
};

export default useModal;
