import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = subtotal;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) return alert('Cart is empty');

    setLoading(true);

    try {
      const orderData = {
        items: cart,
        total,
        customer: form,
        createdAt: new Date(),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error('Order failed');

      setSuccess(true);
      clearCart();
      setForm({ name: '', email: '', phone: '', address: '' });
    } catch (err) {
      console.log(err);
      alert('Something went wrong while placing order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-semibold mb-10">Checkout</h1>

      <div className="grid xl:grid-cols-[1.5fr_0.9fr] gap-8">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border p-8"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full p-3 border rounded-xl"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded-xl"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-3 border rounded-xl"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-3 border rounded-xl"
          />

          <button
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-full"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>

          {success && (
            <p className="text-green-600 font-semibold">
              Order placed successfully 🎉
            </p>
          )}
        </form>

        {/* ORDER SUMMARY */}
        <aside className="border p-6 rounded-3xl">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.slug} className="flex gap-4 mb-4">
              <img
                src={item.cover}
                className="h-16 w-12 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">
                  ${item.price} × {item.quantity}
                </p>
              </div>
            </div>
          ))}

          <hr className="my-4" />

          <p className="flex justify-between">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </p>

          <Link
            to="/shop"
            className="block text-center mt-6 border py-3 rounded-full"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}