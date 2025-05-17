
import { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

type HeadingProps = {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'lg' | 'md' | 'sm';
  className?: string;
};

const Heading = ({ children, as = 'h2', size = 'md', className }: HeadingProps) => {
  const Tag = as;
  return (
    <Tag
      className={clsx(styles[`${size}Heading`], className)}
    >
      {children}
    </Tag>
  );
};

export default Heading;