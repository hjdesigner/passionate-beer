import React, { ReactNode } from 'react';
import clsx from 'clsx';

import { Container } from "@/components";

import styles from './styles.module.css';


type SectionWrapProps = {
  children: ReactNode;
  space?: 'top' | 'bottom' | 'both';
  className?: string;
};

const SectionWrap = ({ children, space = 'bottom', className }: SectionWrapProps) => {
  return (
    <section className={clsx(styles.sectionWrap, styles[`${space}Space`])}>
      <Container className={className}>
        {children}
      </Container>
    </section>
  )
}

export default SectionWrap;