import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShowCase, { Beer } from '../ShowCase';

// Mock do método getBeers (que é importado dentro do ShowCase)
jest.mock('../../../services/beers', () => ({
  getBeers: jest.fn(),
}));

import { getBeers } from "@/services/beers";

const beersMock: Beer[] = [
  {
    id: '1',
    name: 'Beer One',
    image: 'https://example.com/img1.png',
    altImage: 'altImage',
    details: 'details',
    brand: 'brand',
    year: 'year',
    user: 1,
    rating: '4',
    slug: 'url'
  },
  {
    id: '2',
    name: 'Beer Two',
    image: 'https://example.com/img2.png',
    altImage: 'altImage2',
    user: 1,
    rating: '5',
    slug: 'url',
    details: 'details',
    brand: 'brand',
    year: 'year',
  },
  {
    id: '3',
    name: 'Beer 3',
    image: 'https://example.com/img3.png',
    altImage: 'altImage3',
    user: 1,
    rating: '5',
    slug: 'url',
    details: 'details',
    brand: 'brand',
    year: 'year',
  },
  {
    id: '4',
    name: 'Beer 4',
    image: 'https://example.com/img4.png',
    altImage: 'altImage4',
    user: 1,
    rating: '5',
    slug: 'url',
    details: 'details',
    brand: 'brand',
    year: 'year',
  },
  {
    id: '5',
    name: 'Beer 5',
    image: 'https://example.com/img5.png',
    altImage: 'altImage5',
    user: 1,
    rating: '5',
    slug: 'url',
    details: 'details',
    brand: 'brand',
    year: 'year',
  },
  {
    id: '6',
    name: 'Beer 6',
    image: 'https://example.com/img6.png',
    altImage: 'altImage6',
    user: 1,
    rating: '5',
    slug: 'url',
    details: 'details',
    brand: 'brand',
    year: 'year',
  },
  {
    id: '7',
    name: 'Beer 7',
    image: 'https://example.com/img7.png',
    altImage: 'altImage7',
    user: 1,
    rating: '5',
    slug: 'url',
    details: 'details',
    brand: 'brand',
    year: 'year',
  },
  {
    id: '8',
    name: 'Beer 8',
    image: 'https://example.com/img8.png',
    altImage: 'altImage8',
    user: 1,
    rating: '5',
    slug: 'url',
    details: 'details',
    brand: 'brand',
    year: 'year',
  },
  {
    id: '9',
    name: 'Beer 9',
    image: 'https://example.com/img9.png',
    altImage: 'altImage9',
    user: 1,
    rating: '5',
    slug: 'url',
    details: 'details',
    brand: 'brand',
    year: 'year',
  }
];

describe('ShowCase component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial beers', () => {
    render(<ShowCase content={beersMock} />);
    expect(screen.getByText('Beer One')).toBeInTheDocument();
    expect(screen.getByText('Beer Two')).toBeInTheDocument();
  });

  it('loads more beers when Load More button is clicked', async () => {
    (getBeers as jest.Mock).mockResolvedValue([
      { id: '3', name: 'Beer Three', image: 'https://example.com/img3.png', altImage: 'altImage3', user: 1, rating: 3 },
    ]);

    render(<ShowCase content={beersMock} />);
    const button = screen.getByRole('button', { name: /load more/i });

    fireEvent.click(button);

    expect(button).toHaveTextContent(/loading/i);
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('Beer Three')).toBeInTheDocument();
    });

    expect(button).toHaveTextContent(/load more/i);
    expect(button).not.toBeDisabled();
  });

  it('hides Load More button when no more beers', async () => {
    (getBeers as jest.Mock).mockResolvedValue([]);

    render(<ShowCase content={beersMock} />);
    const button = screen.getByRole('button', { name: /load more/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).not.toBeInTheDocument();
    });
  });

  it('does not load more if already loading', () => {
    (getBeers as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<ShowCase content={beersMock} />);
    const button = screen.getByRole('button', { name: /load more/i });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(getBeers).toHaveBeenCalledTimes(1);
  });
});
