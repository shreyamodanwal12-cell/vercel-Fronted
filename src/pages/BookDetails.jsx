import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { apiFetch } from '../utils/api';

import { useCart } from '../contexts/CartContext';

export default function BookDetails() {
const { id } = useParams();
console.log("URL ID =", id);
const [book, setBook] = useState(null);
const bookInfo = book?.info || {};
const [activeTab, setActiveTab] = useState('description');

const { addToCart } = useCart();

const bookReviews = [];
const relatedBooks = [];

useEffect(() => {
  apiFetch(`/api/products/${id}`)
    .then((data) => {
      console.log("PRODUCT DETAILS =", data);
      setBook(data);
    })
    .catch((err) => {
      console.error(err);
    });
}, [id]);
if (!book) {
  return <h1>Loading...</h1>;
}
const image = book.cover
  ? book.cover
  : book.image
  ? `/images/${book.image}`
  : "/placeholder.jpg";
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Product Details</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">{book.title}</h1>
          <p className="mt-3 text-base text-slate-500">by {book.author}</p>
        </div>
        <Link to="/shop" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Back to shop
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">

          
          <img
  src={image}
  alt={book.title}
className="h-[520px] w-full rounded-[32px] object-cover" />
          <div className="mt-4">
  {/* <img
    src={image}
    alt={book.title}
    className="h-28 w-28 rounded-2xl object-cover"
  /> */}
</div>
        </div>

        <div className="space-y-8">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <div className="flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-orange-700">{book.category}</span>
              <span className="flex items-center gap-2 text-sm text-orange-600">
                <FaStar /> {book.rating} ({book.reviews} reviews)
              </span>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-sm text-slate-500">Price</p>
                  <p className="text-3xl font-bold text-slate-900">${book.price.toFixed(2)}</p>
                </div>
                <p className="text-sm text-slate-400 line-through">
  ${Number(book.old_price || 0).toFixed(2)}
</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => addToCart(book)}
                  className="rounded-full bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  <FaShoppingCart className="mr-2 inline" /> Add to Cart
                </button>
               <button
  onClick={() => {
    const existing =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = existing.find(
      (item) => item.id === book.id
    );

    if (!alreadyExists) {
      existing.push(book);
      localStorage.setItem(
        "wishlist",
        JSON.stringify(existing)
      );
    }

    alert("Added to Wishlist");
  }}
  className="rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
>
  <FaHeart className="mr-2 inline" />
  Add to Wishlist
</button>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <div className="flex flex-wrap gap-4">
              {['description', 'information', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${activeTab === tab ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {tab === 'description' ? 'Description' : tab === 'information' ? 'Additional information' : 'Reviews'}
                </button>
              ))}
            </div>
            <div className="mt-8 text-slate-600">
              {activeTab === 'description' && <p>{book.description}</p>}
             {activeTab === 'information' && (
  <div className="grid gap-4 sm:grid-cols-2 text-sm text-slate-700">

    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="font-semibold">Brand</p>
      <p>{book.brand || "N/A"}</p>
    </div>

    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="font-semibold">Color</p>
      <p>{book.color || "N/A"}</p>
    </div>

    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="font-semibold">Size</p>
      <p>{book.size || "N/A"}</p>
    </div>

    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="font-semibold">Warranty</p>
      <p>{book.warranty || "N/A"}</p>
    </div>

    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="font-semibold">Country</p>
      <p>{book.country || "N/A"}</p>
    </div>

    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="font-semibold">Stock</p>
      <p>{book.stock || "N/A"}</p>
    </div>

    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="font-semibold">SKU</p>
      <p>{book.sku || "N/A"}</p>
    </div>

  </div>
)}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {bookReviews.length ? bookReviews.map((review) => (
                    <div key={review.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="font-semibold text-slate-900">{review.author}</span>
                        <span>Rating {review.rating}</span>
                      </div>
                      <p className="mt-3 text-sm text-slate-600">{review.comment}</p>
                    </div>
                  )) : <p className="text-sm text-slate-500">No reviews yet.</p>}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate-900">Related books</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {relatedBooks.map((related) => (
                <Link key={related.slug} to={`/book/${related.slug}`} className="rounded-3xl border border-slate-200 p-4 transition hover:border-orange-500 hover:bg-slate-50">
                  <h3 className="text-lg font-semibold text-slate-900">{related.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">by {related.author}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}