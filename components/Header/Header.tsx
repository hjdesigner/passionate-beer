'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from "next/link";
import { Container, FormField } from "@/components";
import styles from './styles.module.css';

const CLIENT_ID_COOKIE = 'clientId';
const DEFAULT_CLIENT_ID = '1';

const Header = () => {
  const [clientId, setClientId] = useState<string>(DEFAULT_CLIENT_ID);
  
  useEffect(() => {
    const cookieClientId = Cookies.get(CLIENT_ID_COOKIE);
    if (cookieClientId) {
      setClientId(cookieClientId);
    } else {
      Cookies.set(CLIENT_ID_COOKIE, DEFAULT_CLIENT_ID, { expires: 7 });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    Cookies.set(CLIENT_ID_COOKIE, value, { expires: 7 });
    setClientId(value);
    window.location.href = '/';
  };

  return (
    <header className={styles.header}>
      <Container className={styles.custonContainer}>
        <Link href="/" className={styles.logo}>Passionate Beer</Link>
        <FormField
          name="rating"
          type="select"
          value={clientId}
          onChange={handleChange}
          options={[
            { label: 'Client Henrique', value: '1' },
            { label: 'Client Carol', value: '2' },
          ]}
        />
      </Container>      
    </header>
  )
}

export default Header;