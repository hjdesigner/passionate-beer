import { cookies } from 'next/headers';
import { notFound } from "next/navigation";
import { ShowCase } from "@/components";
import { getBeers } from "@/services/beers";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('clientId')?.value || 1;
  const beers = await getBeers(Number(userId));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    title: 'Passionate Beer – Beer Catalog',
    description: `Collection with ${beers?.length} amazing beers to explore.`,
    openGraph: {
      title: 'Passionate Beer',
      description: 'Explore and catalog unique and craft beers.',
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}


export default async  function Home() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('clientId')?.value || 1;
  const beers = await getBeers(Number(userId));
  
  if (!beers) notFound(); 

  return (
    <ShowCase content={beers} />
  );
}
