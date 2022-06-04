
import styles from './InputCheckBox.module.css';
interface InputCheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

function InputCheckBox({ label, ...props }: InputCheckBoxProps) {
  return (
    <label className={styles.container}>
      <input type="checkbox" {...props} />
      <span className={styles.checkmark}></span>
    </label>
  );
}

export default InputCheckBox;
