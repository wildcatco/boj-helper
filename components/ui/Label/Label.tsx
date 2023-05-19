import styles from './Label.module.scss';

interface InputLabelProps {
  text: string;
  htmlFor?: string;
  size?: 'base' | 'lg' | 'xl';
}

const Label: React.FC<InputLabelProps> = ({ text, htmlFor, size = 'base' }) => {
  const sizeCN = {
    base: styles.base,
    lg: styles.lg,
    xl: styles.xl,
  };

  return (
    <label className={`${styles.label} ${sizeCN[size]}`} htmlFor={htmlFor}>
      {text}
    </label>
  );
};

export default Label;
