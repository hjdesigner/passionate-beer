
import styles from './styles.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>{`© ${new Date().getFullYear()} Passionate Beer. All Rights Reserved`}</p>
    </footer>
  )
}

export default Footer;