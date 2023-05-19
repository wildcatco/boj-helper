import Link from 'next/link';

import { DropDownItem } from '../DropDown';
import styles from './DropDownList.module.scss';

interface DropDownListProps {
  list: DropDownItem[];
  onClose: () => void;
}

const DropDownList: React.FC<DropDownListProps> = ({ list, onClose }) => {
  const handleItemClick = (item: DropDownItem) => () => {
    item.onClick && item.onClick();
    onClose();
  };

  return (
    <ul className={styles.list}>
      {list.map((item) => {
        if (item.href) {
          return (
            <Link key={item.label} href={item.href}>
              <li onClick={handleItemClick(item)} className={styles.item}>
                {item.label}
              </li>
            </Link>
          );
        } else {
          return (
            <li
              key={item.label}
              onClick={handleItemClick(item)}
              className={styles.item}
            >
              {item.label}
            </li>
          );
        }
      })}
    </ul>
  );
};

export default DropDownList;
