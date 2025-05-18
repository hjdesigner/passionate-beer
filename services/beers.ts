import { Beer } from "@/components/ShowCase/ShowCase";

export const getBeers = async (
  user = 1,
  page = 1,
  filters: { brand?: string; rating?: string } = {}
): Promise<Beer[]> => {
  const params = new URLSearchParams({
    user: String(user),
    limit: '8',
    page: String(page),
    order: 'desc',
    sortBy: 'createdAt',
  });

  if (filters.brand && filters.brand !== '') {
    params.append('brand', filters.brand);
  }

  if (filters.rating && filters.rating !== '') {
    params.append('rating', filters.rating);
  }

  const url = `${process.env.NEXT_PUBLIC_API}/beers?${params.toString()}`;
  
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error('Error searching for beers');
  return await res.json();
};

export const getBeerBySlug = async (slug: string): Promise<Beer> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/beers?slug=${slug}`, {
    next: { revalidate: 60 },
  });
  
  if (!res.ok) throw new Error('Error searching for beer');
  
  const data = await res.json();
  return data[0] || null;
}

export const createBeer = async (beerData: Beer): Promise<Beer> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/beers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(beerData),
  });

  if (!res.ok) {
    throw new Error('Error creating beer');
  }

  const data = await res.json();
  return data;
};