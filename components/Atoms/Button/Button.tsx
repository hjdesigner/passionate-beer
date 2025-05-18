import clsx from 'clsx';

import styles from './styles.module.css';

type ButtonProps = {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'submit' | 'button';
  variant?: 'primary' | 'default';
};

function Button({
  children,
  size = 'md',
  disabled = false,
  onClick,
  className,
  type = 'button',
  variant = 'primary'
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={clsx(styles.button, styles[variant], styles[`${size}Size`], className)}
    >
      {children}
    </button>
  );
}

export default Button;