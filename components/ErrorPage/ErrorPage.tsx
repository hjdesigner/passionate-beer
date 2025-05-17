"use client"

import { SectionWrap } from "@/components";
import styles from './styles.module.css';

export default function ErrorPage({ text = '' }) {
  return (

    <SectionWrap>
      <p className={styles.errorText}>{text}</p>
    </SectionWrap>
  );
}
