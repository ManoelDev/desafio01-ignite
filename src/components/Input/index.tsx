
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export function Input({ ...props }: InputProps) {
  return (
    <div className={styles.wrapper}>
      <input type="text" {...props} />
    </div>
  );
}

