import clsx from 'clsx';

import styles from './styles.module.css';

type ButtonProps = {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

function Button({
  children,
  size = 'md',
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(styles.button, styles[`${size}Size`], className)}
    >
      {children}
    </button>
  );
}

export default Button;