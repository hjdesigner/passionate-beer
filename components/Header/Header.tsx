import Link from "next/link";
import { Container } from "@/components";
import styles from './styles.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <Link href="/" className={styles.logo}>Passionate Beer</Link>
      </Container>      
    </header>
  )
}

export default Header;