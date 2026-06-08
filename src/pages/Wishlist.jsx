import { Link } from 'react-router-dom';
import { books } from '../data/books';

const wishlistItems = books.slice(2, 6);

export default function Wishlist() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Wishlist</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Saved for later</h1>
        </div>
        <Link to="/shop" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Continue shopping
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {wishlistItems.map((book) => (
          <div key={book.slug} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <img src={book.cover} alt={book.title} className="h-56 w-full rounded-3xl object-cover" />
            <div className="mt-5 space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">{book.title}</h2>
              <p className="text-sm text-slate-500">by {book.author}</p>
              <p className="text-sm font-semibold text-orange-600">${book.price.toFixed(2)}</p>
              <Link to={`/book/${book.slug}`} className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                View details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
