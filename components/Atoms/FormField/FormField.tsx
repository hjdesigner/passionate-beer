import clsx from 'clsx';

import styles from './styles.module.css';

type FormFieldProps = {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'textarea' | 'range';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  min?: number;
  max?: number;
  help?: string;
};

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  min,
  max,
  help,
}: FormFieldProps) => {
  return (
    <div className={styles.formField}>
      <label htmlFor={name} className={styles.label}>
        {label} {required && <span>*</span>}
      </label>
      <div className={styles.fieldWrap}>
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={clsx(styles.textArea, { [styles.error] : error})}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            min={min}
            max={max}
            className={clsx(styles.input, { [styles.error] : error})}
          />
        )}
        {help && <p className={styles.helpText}>{help}</p>}
        {error && <p className={styles.errorText}>{error}</p>}
      </div>      
    </div>
  );
};

export default FormField;
