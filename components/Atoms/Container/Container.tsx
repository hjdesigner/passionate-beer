import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      {children}
    </div>
  );
};

export default Container;{}