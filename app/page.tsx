import { notFound } from "next/navigation";
import { ShowCase } from "@/components";
import { getBeers } from "@/services/beers";

export async function generateMetadata() {
  const beers = await getBeers();
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
  const beers = await getBeers();

  if (!beers) notFound(); 

  return (
    <ShowCase content={beers} />
  );
}
