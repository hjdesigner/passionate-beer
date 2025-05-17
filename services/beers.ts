import { Beer } from "@/components/ShowCase/ShowCase";

export const getBeers = async (user = 1, page = 1): Promise<Beer[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/beers?user=${user}&order=desc&limit=8&page=${page}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Error searching for beers');
  return await res.json();
};
