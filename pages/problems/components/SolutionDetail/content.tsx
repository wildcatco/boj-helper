import styles from './SolutionDetail.module.scss';

interface SolutionDetailContentProps {
  label: string;
  content: string;
}

const SolutionDetailContent: React.FC<SolutionDetailContentProps> = ({
  label,
  content,
}) => {
  return (
    <div className={styles.content}>
      <span className={styles.label}>{label}</span>
      <span className="dark:text-dark-text">{content}</span>
    </div>
  );
};

export default SolutionDetailContent;
