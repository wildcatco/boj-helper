import { useEffect, useRef, useState } from 'react';

import DropDownLabel from './DropDownLabel';
import DropDownList from './DropDownList';

import styles from './DropDown.module.scss';

export interface DropDownItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface DropDownProps {
  label: string;
  list: DropDownItem[];
}

const DropDown: React.FC<DropDownProps> = ({ label, list }) => {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };

    document.body.addEventListener('click', closeMenu);

    return () => {
      document.body.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.container}>
      <DropDownLabel label={label} onToggle={handleToggle} />
      {show && <DropDownList list={list} onClose={handleClose} />}
    </div>
  );
};

export default DropDown;
