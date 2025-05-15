import Image from "next/image";
import styles from './styles.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Image
        src="/assets/hero/background.jpg"
        alt="Pouring beer into a glass"
        fill
        priority
      />
      <h1 className={styles.heroTitle}>The right place for every beer enthusiast and lover</h1>
      <div className={styles.heroOverlay} />
    </section>
  )
}

export default Hero;