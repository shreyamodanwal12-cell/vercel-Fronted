import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useState } from "react";
import { apiFetch } from "../utils/api";

export default function Cart() {
  const { cart, subtotal, removeFromCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const applyCoupon = async () => {
  try {
    const res = await apiFetch(`/api/coupons/${couponCode}`);

    setDiscount(res.coupon.discount);

    alert(`Coupon applied: ${res.coupon.discount}% off`);
  } catch (err) {
    alert("Invalid coupon");
  }
};
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
              className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg transition hover:shadow-xl"
            >
              <div className="flex flex-col gap-6 lg:flex-row">

                <img
                  src={item.cover || item.image}
                  alt={item.title}
                  className="h-48 w-full rounded-3xl object-cover lg:h-44 lg:w-52"
                />

                <div className="flex-1">

                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{item.title}</h2>
                      <p className="mt-1 text-sm text-slate-500">by {item.author}</p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id || item._id || item.slug)}
                      className="text-sm text-red-500"
                    >
                      <FaTrashAlt /> Remove
                    </button>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
  Qty: {item.quantity}
</span>

<span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
  Price: ${item.price}
</span>

<span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
  {item.category}
</span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id || item._id || item.slug, item.quantity - 1)
                      }
                     className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-xl font-bold text-slate-800 transition hover:bg-orange-500 hover:text-white"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id || item._id || item.slug, item.quantity + 1)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-xl font-bold text-slate-800 transition hover:bg-orange-500 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )) : (
            <div className="rounded-[32px] border border-slate-200 bg-white p-16 text-center shadow-soft">Your cart is empty</div>
          )}
        </div>

        <aside className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 space-y-4">

  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-800">
      Promo Code
    </label>

    <input
      type="text"
      placeholder="Enter coupon code"
      value={couponCode}
      onChange={(e) => setCouponCode(e.target.value)}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-500"
    />
  </div>

  <button
    onClick={applyCoupon}
    className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
  >
    Apply Coupon
  </button>

  <div className="border-t border-slate-200 pt-4 space-y-3">

    <div className="flex justify-between text-slate-600">
      <span>Subtotal</span>
      <span>${subtotal.toFixed(2)}</span>
    </div>

    <div className="flex justify-between text-slate-600">
      <span>Discount</span>

      <span className="font-semibold text-green-600">
        {discount}%
      </span>
    </div>

    <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-bold text-slate-900">
      <span>Total</span>

      <span className="text-orange-600">
        $
        {(
          subtotal -
          (subtotal * discount) / 100
        ).toFixed(2)}
      </span>
    </div>

  </div>

</div>

          <Link
            to="/checkout"
            className="mt-6 block w-full rounded-full bg-orange-500 py-4 text-center text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Checkout
          </Link>
        </aside>

      </div>
    </div>
  );
}