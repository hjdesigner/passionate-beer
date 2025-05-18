import clsx from 'clsx';

import styles from './styles.module.css';

type FormFieldProps = {
  label?: string;
  name: string;
  type?: 'text' | 'number' | 'textarea' | 'range' | 'select';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  min?: number;
  max?: number;
  help?: string;
  options?: { label: string; value: string }[];
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
  options,
}: FormFieldProps) => {
  return (
    <div className={styles.formField}>
      {label && <label htmlFor={name} className={styles.label}>
        {label} {required && <span>*</span>}
      </label>}
      <div className={styles.fieldWrap}>
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={clsx(styles.textArea, { [styles.error] : error})}
          />
        ) : type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={clsx(styles.select, { [styles.error]: error })}
          >
            <option value="">Select an option</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) :  (
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
