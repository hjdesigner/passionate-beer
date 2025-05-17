import { getBeers } from "@/services/beers";
import { toSlug } from "@/utils/toSlug";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const beers = await getBeers();

  const staticPaths = [
    '',
  ];

  const beerPaths = beers.map((beer) => `/product/${toSlug(beer.name)}`);

  const allPaths = [...staticPaths, ...beerPaths];

  const xml = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((path) => {
          return `
            <url>
              <loc>${baseUrl}${path}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
