import { Link } from 'react-router-dom';
import { books } from '../data/books';

const orderItems = books.slice(0, 2);

export default function Checkout() {
  const subtotal = orderItems.reduce((sum, book) => sum + book.price, 0);
  const total = subtotal + 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Checkout</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Complete your purchase</h1>
      </div>
      <div className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
        <form className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Billing details</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <input type="text" placeholder="Full name" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-orange-500" />
              <input type="email" placeholder="Email address" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-orange-500" />
              <input type="text" placeholder="Phone number" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-orange-500" />
              <input type="text" placeholder="Shipping address" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-orange-500" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Payment method</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {['Credit card', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
                <button key={method} type="button" className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-sm font-semibold text-slate-700 transition hover:border-orange-500">
                  {method}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full rounded-full bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-600">
            Place order
          </button>
        </form>

        <aside className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
            <div className="mt-6 space-y-4">
              {orderItems.map((book) => (
                <div key={book.slug} className="flex items-center gap-4 rounded-3xl border border-slate-100 p-4">
                  <img src={book.cover} alt={book.title} className="h-20 w-16 rounded-2xl object-cover" />
                  <div>
                    <p className="font-semibold text-slate-900">{book.title}</p>
                    <p className="text-sm text-slate-500">${book.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 rounded-3xl bg-slate-50 p-6">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
              Total <span className="float-right">${total.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/shop" className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
