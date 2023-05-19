import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';
import useModal from '@/hooks/useModal';
import { getZIndexFromTime } from '@/libs/utils/z-index';
import { ModalName } from '@/states/modal';

interface ModalProps {
  name: ModalName;
  isStatic?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ name, isStatic, children }) => {
  const { modal, closeModal } = useModal();

  const handleClose = () => {
    if (isStatic) {
      return;
    }

    closeModal(name);
  };

  if (!modal[name]) {
    return null;
  }

  return createPortal(
    <>
      <BackDrop onClose={handleClose} />
      <div className={styles.modal} style={{ zIndex: getZIndexFromTime() }}>
        {children}
      </div>
    </>,
    document.getElementById('modal')!
  );
};

interface BackDropProps {
  onClose?: () => void;
}

const BackDrop: React.FC<BackDropProps> = ({ onClose }) => {
  return (
    <div
      className={styles.backDrop}
      style={{ zIndex: getZIndexFromTime() }}
      onClick={onClose}
    />
  );
};

export default Modal;
