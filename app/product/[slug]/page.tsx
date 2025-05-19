import { notFound } from 'next/navigation';
import { getBeerBySlug } from '@/services/beers';

import { Product } from "@/components";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const beer = await getBeerBySlug(slug);

  if (!beer) {
    return {
      title: 'Beer not found',
    };
  }

  return {
    title: `${beer.name} – Passionate Beer`,
    description: beer.details,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${beer.slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const beer = await getBeerBySlug(slug);

  if (!beer) return notFound();

  return <Product content={beer} />;
}