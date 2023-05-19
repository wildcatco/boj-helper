import styles from './SectionHeader.module.scss';

interface SectionTitleProps {
  title: string;
}

const SectionHeader: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div className={styles.header}>
      <h2>{title}</h2>
    </div>
  );
};

export default SectionHeader;
