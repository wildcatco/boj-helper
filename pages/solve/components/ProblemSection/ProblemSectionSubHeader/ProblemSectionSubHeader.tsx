import styles from './ProblemSectionSubHeader.module.scss';

interface ProblemSectionHeaderProps {
  title: string;
}

const ProblemSectionSubHeader: React.FC<ProblemSectionHeaderProps> = ({
  title,
}) => {
  return (
    <div className={styles.header}>
      <h3>{title}</h3>
    </div>
  );
};

export default ProblemSectionSubHeader;
