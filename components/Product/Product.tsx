import Image from "next/image";

import { Heading, SectionWrap } from "@/components";
import { Beer } from "@/components/ShowCase/ShowCase";
import Svgheart from '/public/assets/showcase/heart.svg';

import styles from './styles.module.css';
import Link from "next/link";

type ProductProps = {
  content: Beer;
}

const Product = ({ content } : ProductProps) => {
  const { image, altImage, name, brand, year, rating, createdAt, details} = content;
  const date = createdAt ? new Date(createdAt) : new Date();
  const formatted = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);

  return (
    <SectionWrap space="top" className={styles.customShowCase}>
      <nav className={styles.breadcrumb}>
        <ul>
          <li><Link href='/'>All beers</Link></li>
          <li>/</li>
          <li>{name}</li>
        </ul>
      </nav>
      <section className={styles.productHero}>
        <figure className={styles.productImage}>
          <Image
            src={image}
            alt={altImage}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw"
            fill
          />
        </figure>
        <div className={styles.productDetails}>
          <Heading as='h2'>{name}</Heading>
          <div data-rating={rating} className={styles.productRating}>
            <Svgheart />
            <Svgheart />
            <Svgheart />
            <Svgheart />
            <Svgheart />
          </div>
          <p>Created in: {formatted}</p>
          <p>Brand: {brand}</p>
          <p>Year: {year}</p>
        </div>
      </section>
      <section className={styles.productFullDetails}>
        <Heading as='h3' size="sm">Details</Heading>
        <p>{details}</p>
      </section>      

    </SectionWrap>
  )
}

export default Product;