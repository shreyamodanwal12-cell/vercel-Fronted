import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

export default function ProductCard({ book }) {
  console.log("PRODUCT CARD BOOK =", book);
  const { addToCart } = useCart();

  const image = book.cover || book.image || '/placeholder.jpg';
  const oldPrice = book.oldPrice || book.old_price || 0;

  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">

      {/* IMAGE */}
      <Link to={`/book/${book.id}`} className="block overflow-hidden">
        <img
          src={image}
          alt={book.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="space-y-3 p-6">

        {/* CATEGORY + BADGE */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">
            {book.category || 'Book'}
          </span>
          {book.badge && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {book.badge}
            </span>
          )}
        </div>

        {/* TITLE */}
        <Link
  to={`/book/${book.id}`}
  className="text-xl font-semibold text-slate-900 hover:text-orange-600"
>
          {book.title}
        </Link>

        {/* AUTHOR */}
        <p className="text-sm text-slate-500">
          by {book.author}
        </p>

        {/* RATING */}
        <div className="flex items-center gap-2 text-orange-500 text-sm font-semibold">
          <FaStar />
          {book.rating || 0}
          <span className="text-slate-400">
            ({book.reviews || 0})
          </span>
        </div>

        {/* PRICE + BUTTON */}
        <div className="flex items-end justify-between gap-4">

          <div>
            <p className="text-2xl font-bold text-slate-900">
              ${Number(book.price || 0).toFixed(2)}
            </p>

            {oldPrice > 0 && (
              <p className="text-sm text-slate-400 line-through">
                ${Number(oldPrice).toFixed(2)}
              </p>
            )}
          </div>

          <button
            onClick={() => addToCart({
  ...book,
  id: book.id || book._id || book.slug
})}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            <FaShoppingCart /> Add
          </button>

        </div>
      </div>
    </article>
  );
}