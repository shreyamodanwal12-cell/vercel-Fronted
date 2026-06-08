import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

export default function ProductCard({ book }) {
  const { addToCart } = useCart();
  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/book/${book.slug}`} className="block overflow-hidden">
        <img src={book.cover} alt={book.title} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">
            {book.category}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{book.badge}</span>
        </div>
        <Link to={`/book/${book.slug}`} className="text-xl font-semibold text-slate-900 hover:text-orange-600">
          {book.title}
        </Link>
        <p className="text-sm text-slate-500">by {book.author}</p>
        <div className="flex items-center gap-2 text-orange-500 text-sm font-semibold">
          <FaStar /> {book.rating}
          <span className="text-slate-400">({book.reviews})</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-slate-900">${book.price.toFixed(2)}</p>
            <p className="text-sm text-slate-400 line-through">${book.oldPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={() => addToCart(book)}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            <FaShoppingCart /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
