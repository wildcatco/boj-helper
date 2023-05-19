import styles from './ProblemTitle.module.scss';

interface ProblemTitleProps {
  id: string;
  title: string;
}

const ProblemTitle: React.FC<ProblemTitleProps> = ({ id, title }) => {
  return (
    <h1 className={styles.title}>
      {id}번 {title}
    </h1>
  );
};

export default ProblemTitle;
