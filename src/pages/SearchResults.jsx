import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { books } from '../data/books';
import ProductCard from '../components/common/ProductCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const search = query.get('q') || '';

  const results = useMemo(() => {
    const term = search.toLowerCase();
    return books.filter((book) => book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term) || book.category.toLowerCase().includes(term));
  }, [search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Search results</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Results for “{search || 'everything'}”</h1>
        <p className="mt-3 text-sm text-slate-500">We found {results.length} books matching your search.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {results.map((book) => (
          <ProductCard key={book.slug} book={book} />
        ))}
      </div>
      {!results.length && (
        <div className="rounded-[32px] border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">No books were found.</p>
          <p className="mt-3 text-sm text-slate-500">Try a different keyword or browse our shop.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
            Browse shop
          </Link>
        </div>
      )}
    </div>
  );
}
