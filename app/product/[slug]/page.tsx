import { notFound } from 'next/navigation';
import { getBeerBySlug } from '@/services/beers';

import { Product } from "@/components";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  const { slug } = await params
  const beer = await getBeerBySlug(slug);
 
  if (!beer) return { title: 'beer not found' };

  return {
    title: `${beer.name} – Passionate Beer`,
    description: beer.details,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/beers/${beer.id}`,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params
  const beer = await getBeerBySlug(slug);
  
  if (!beer) return notFound();

  return (
    <Product content={beer} />
  );
}