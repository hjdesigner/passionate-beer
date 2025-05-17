"use client"

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

import { Button, Heading, SectionWrap } from '@/components';
import Svgheart from '/public/assets/showcase/heart.svg';
import { toSlug } from "@/utils/toSlug";

import styles from './styles.module.css';
import { getBeers } from "@/services/beers";


export type Beer = {
  id: string;
  name: string;
  image: string;
  user: number;
  rating: number;
  altImage: string;
};

type ShowCaseProps = {
  content: Beer[];
}

const ShowCase = ({ content }: ShowCaseProps) => {
  const [beers, setBeers] = useState<Beer[]>(content);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    setError(false);

    try {
      const nextPage = page + 1;
      const newBeers = await getBeers(1, nextPage);

      if (newBeers.length === 0) {
        setHasMore(false);
      } else {
        setBeers(prev => [...prev, ...newBeers]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrap space='top' className={styles.customShowCase}>
      <Heading as='h2'>Your collection</Heading>
      {beers.length > 0 ? (
        <ul className={styles.showCase}>
          {beers?.map((beer) => (
            <li key={beer.id} className={styles.showCaseBeer}>
              <Link href={`/product/${toSlug(beer.name)}`} className={styles.showCaseBeerLink}>
                <figure className={styles.showCaseBeerImage}>
                  <Image
                    src={beer.image}
                    alt={beer.altImage}
                    fill
                  />
                </figure>
                <div className={styles.showCaseBeerContent}>
                  <Heading className={styles.showCaseBeerName} as='h3' size='sm'>{beer.name}</Heading>
                  <div data-rating={beer.rating} className={styles.showCaseBeerRating}>
                    <Svgheart />
                    <Svgheart />
                    <Svgheart />
                    <Svgheart />
                    <Svgheart />
                  </div>
                </div>
              </Link>            
            </li>
          ))}        
        </ul>
      ) : (
        <div className={styles.empty}>
          <Heading as='h2' size="sm">You have not registered any beer in your collection</Heading>
        </div>
      )}
      
      {hasMore && beers.length > 0 && (
        <div className={styles.loadMore}>
          {error && <p className={styles.error}>There was an error trying to load more beer, please try again later</p>}
          <Button size='lg' onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </SectionWrap>
  )
}
export default ShowCase;