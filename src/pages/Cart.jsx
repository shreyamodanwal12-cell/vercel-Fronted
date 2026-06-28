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
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Review your selection
          </h1>
        </div>

        <Link
          to="/checkout"
          className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Proceed to checkout
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.8fr_0.8fr]">

        <div className="space-y-6">
          {cart.length ? cart.map((item) => (
            <div
              key={item.id || item._id || item.slug}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft"
            >
              <div className="flex flex-col gap-6 lg:flex-row">

                <img
                  src={item.cover || item.image}
                  alt={item.title}
                  className="h-40 w-full rounded-3xl object-cover lg:w-48"
                />

                <div className="flex-1">

                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-xl font-semibold font-bold text-black">{item.title}</h2>
                      <p className="text-sm text-slate-500">by {item.author}</p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id || item._id || item.slug)}
                      className="text-sm text-red-500"
                    >
                      <FaTrashAlt /> Remove
                    </button>
                  </div>

                  <div className="mt-4 flex font-bold gap-4 text-sm text-slate-600">
                    <span>Qty: {item.quantity}</span>
                    <span>Price: ${item.price}</span>
                    <span>Category: {item.category}</span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id || item._id || item.slug, item.quantity - 1)
                      }
                      className="px-3 py-1 border border-black text-black text-2xl font-bold"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id || item._id || item.slug, item.quantity + 1)
                      }
                      className="px-3 py-1 border border-black text-black text-2xl font-bold"
                    >
                      +
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )) : (
            <div className="text-center p-10">Your cart is empty</div>
          )}
        </div>

        <aside className="p-6 border rounded-2xl">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block text-center bg-orange-500 text-white py-3 rounded-full"
          >
            Checkout
          </Link>
        </aside>

      </div>
    </div>
  );
}