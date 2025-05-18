"use client"

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

import { ActionsBar, Button, Heading, SectionWrap } from '@/components';
import Svgheart from '/public/assets/showcase/heart.svg';
import { getBeers } from "@/services/beers";
import { FilterParams } from "../ActionsBar/ActionsBar";

import styles from './styles.module.css';

export type Beer = {
  id?: string;
  name: string;
  image: string;
  user?: number;
  rating: string;
  altImage: string;
  details: string;
  brand: string;
  year: string;
  createdAt?: string;
  slug: string;
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
  const [filter, setFilter] = useState<FilterParams>({
    brand: '',
    rating: '',
  });

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    setError(false);

    try {
      const nextPage = page + 1;
      const newBeers = await getBeers(1, nextPage, filter);

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

  const upadtedBeers = async () => {
    const result = await getBeers();    
    if (result) {
      setBeers(result);
    }
  }

  const fielterBeers = async (data: FilterParams) => {
    setFilter(data);
    const result = await getBeers(1, 1, data);    
    if (result) {
      setBeers(result);
    }
  }

  return (
    <SectionWrap space='top' className={styles.customShowCase}>
      <ActionsBar handleFallback={upadtedBeers} handleFilterFallback={fielterBeers} />
      <Heading as='h2'>Your collection</Heading>
      {beers.length > 0 ? (
        <ul className={styles.showCase}>
          {beers?.map((beer) => (
            <li key={beer.id} className={styles.showCaseBeer}>
              <Link href={`/product/${beer.slug}`} className={styles.showCaseBeerLink}>
                <figure className={styles.showCaseBeerImage}>
                  <Image
                    src={beer.image}
                    alt={beer.altImage}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
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
          <Heading as='h2' size="sm">No beer record found in your collection</Heading>
        </div>
      )}
      
      {hasMore && beers.length >= 8 && (
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