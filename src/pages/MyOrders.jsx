import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../utils/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const userId = localStorage.getItem("IBID_USER_ID");

        const data = await apiFetch(
  `/api/my-orders/${userId}`
);

        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-6 text-3xl font-bold">
          My Orders
        </h1>

        <div className="space-y-5">

          {orders.map((order) => (

            <Link
              key={order.id}
              to={`/orders/${order.id}`}
            >
              <div className="rounded-3xl bg-white p-5 shadow-lg transition hover:shadow-2xl">

                <div className="flex items-center gap-5">

                 <img
  src={
    order.items?.[0]?.image
      ? `/images/${order.items[0].image}`
      : "/images/default-book.jpg"
  }
  alt={order.items?.[0]?.title}
  className="h-28 w-24 rounded-xl object-cover border border-slate-200"
/>

                  <div className="flex-1">

                    <h2 className="text-xl font-semibold">
                      {order.items?.[0]?.title}
                    </h2>

                    <p className="mt-2 text-slate-500">
                      Order ID: #{order.id}
                    </p>

                    <p className="mt-2 text-slate-500">
                      Total: ₹{order.total}
                    </p>

                  </div>

                  <div>

                    <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                      {order.status}
                    </span>

                  </div>

                </div>

              </div>
            </Link>

          ))}

        </div>

      </div>
    </div>
  );
}