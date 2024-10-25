import styles from './Input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
  return <input className={styles.input} {...props} />;
};

export default Input;
