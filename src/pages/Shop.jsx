import { useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../utils/api';


import ProductCard from '../components/common/ProductCard';
import { categories } from '../data/categories';
import { authors } from '../data/authors';
import Pagination from '../components/common/Pagination';
import { useCart } from '../contexts/CartContext';

const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Rating'];

export default function Shop() {
  
  const [viewMode, setViewMode] = useState('grid');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [authorFilter, setAuthorFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
   
useEffect(() => {
  apiFetch('/api/books')
    .then((res) => {
      console.log("FULL API RESPONSE:", res);

      const booksData =
        Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.book)
          ? res.book
          : [];

      setBooks(booksData);
    })
    .catch((err) => {
      console.error("API ERROR:", err);
      // ⚠️ only error case me empty karo
    });
}, []);
  const { addToCart } = useCart();
  const [books, setBooks] = useState([]);
console.log("books STATE SAMPLE:", books[0]);
console.log("BOOK 1 =", books[0]);
 const availableCategories = [
  'All',
  ...new Set((books || []).map((book) => book.category))
];


 const availableAuthors = [
  'All',
  ...new Set((books || []).map((book) => book.author))
];

//   const filteredBooks = useMemo(() => {
//     return books
//       .filter((book) => (categoryFilter === 'All' ? true : book.category === categoryFilter))
//       .filter((book) => (authorFilter === 'All' ? true : book.author === authorFilter))
//       .filter((book) =>
//   ratingFilter === 'All'
//     ? true
//     : Number(book.rating || 0) >= Number(ratingFilter)
// )
//       .filter((book) =>
//   (book.title || "")
//     .toLowerCase()
//     .includes(search.toLowerCase()) ||
//   (book.author || "")
//     .toLowerCase()
//     .includes(search.toLowerCase())
// )
//       .sort((a, b) => {
//         if (sortBy === 'Price: Low to High') return a.price - b.price;
//         if (sortBy === 'Price: High to Low') return b.price - a.price;
//         if (sortBy === 'Rating') return b.rating - a.rating;
//         return b.reviews - a.reviews;
//       });
//   }, [categoryFilter, authorFilter, ratingFilter, search, sortBy]);
const filteredBooks = books;
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize);
console.log("books DATA:", books);
console.log("FILTERED:", filteredBooks);
console.log("PAGINATED:", paginatedBooks);
//const safeBook = book || [];
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Shop</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">book & comics marketplace</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-full px-4 py-3 text-sm font-semibold transition ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white text-slate-700 shadow-sm'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`rounded-full px-4 py-3 text-sm font-semibold transition ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white text-slate-700 shadow-sm'}`}
          >
            List
          </button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Search</h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search title or author"
              className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 text-black outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Category</h2>
            <div className="mt-4 space-y-2">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${categoryFilter === category ? 'bg-orange-500 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Author</h2>
            <select
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 text-black outline-none focus:border-orange-500"
            >
              {availableAuthors.map((author) => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Rating</h2>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 text-black outline-none focus:border-orange-500"
            >
              <option value="All">All ratings</option>
              <option value="4">4 stars & up</option>
              <option value="4.5">4.5 stars & up</option>
              <option value="5">5 stars</option>
            </select>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Sort by</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 text-black outline-none focus:border-orange-500"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </aside>

        <section className="space-y-8">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">Showing {filteredBooks.length} products</p>
                <h2 className="text-2xl font-semibold text-slate-900">Filter results</h2>
              </div>
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                Active filters: <span className="font-semibold text-slate-900">{categoryFilter}</span>
              </div>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedBooks.map((book) => (
                <ProductCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {paginatedBooks.map((book) => (
                <div key={book.id}className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
                  <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
                    <img src={book.cover} alt={book.title} className="h-72 w-full rounded-3xl object-cover" />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">{book.category}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{book.badge}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-slate-900">{book.title}</h3>
                        <p className="mt-2 text-sm text-slate-500">by {book.author}</p>
                      </div>
                      <p className="text-sm leading-7 text-slate-600">{book.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span>Rating {book.rating}</span>
                        <span>{book.reviews} reviews</span>
                        <span>Pages {book.pages}</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-3xl font-semibold text-slate-900">${book.price.toFixed(2)}</p>
                         <p className="text-sm text-slate-400 line-through">
  ${Number(book.old_price || 0).toFixed(2)}
</p>
                        </div>
                        <button
                          onClick={() => addToCart({
  ...book,
  id: book.id || book._id || book.slug
})}
                          className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Pagination currentPage={currentPage} pageSize={pageSize} totalItems={filteredBooks.length} onPageChange={setCurrentPage} />
        </section>
      </div>
    </div>
  );
}
