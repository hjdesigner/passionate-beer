import React, { ReactNode } from 'react';
import styles from './styles.module.css';

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default Container;