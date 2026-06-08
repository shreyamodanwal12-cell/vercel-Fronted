import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cart, subtotal, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Shopping cart</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Review your selection</h1>
        </div>
        <Link to="/checkout" className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
          Proceed to checkout
        </Link>
      </div>
      <div className="grid gap-8 xl:grid-cols-[1.8fr_0.8fr]">
        <div className="space-y-6">
          {cart.length ? cart.map((item) => (
            <div key={item.slug} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-6 lg:flex-row">
                <img src={item.cover} alt={item.title} className="h-40 w-full rounded-3xl object-cover lg:w-48" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                      <p className="mt-2 text-sm text-slate-500">by {item.author}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      <FaTrashAlt className="mr-2 inline" /> Remove
                    </button>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      Quantity:
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Category: {item.category}</div>
                    <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Price: ${item.price.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-soft">
              Your cart is empty. Add items from the shop to continue.
            </div>
          )}
        </div>
        <aside className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Estimated tax</span>
              <span>$0.00</span>
            </div>
            <div className="border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
              Total <span className="float-right">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-600">
            Checkout now
          </Link>
        </aside>
      </div>
    </div>
  );
}
