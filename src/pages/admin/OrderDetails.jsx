import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiFetch from "../../api/api";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userId = localStorage.getItem("IBID_USER_ID");

const res = await apiFetch(
  `/api/orders/${id}?user_id=${userId}`
);
        setOrder(res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!order) return <p>Order not found</p>;
  console.log(order.items);
return (
  <div className="min-h-screen bg-slate-100 p-6">
    <div className="mx-auto max-w-5xl">

      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        Order Details
      </h1>

      <div className="rounded-3xl bg-white p-6 shadow-lg">

        <div className="mb-6 flex flex-col gap-3 border-b pb-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Order #{order.id}
            </h2>

            <p className="mt-1 text-slate-500">
              Total Amount: ₹{order.total}
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {order.status}
          </span>

        </div>

        <h3 className="mb-4 text-xl font-semibold text-slate-800">
          Ordered Items
        </h3>

        <div className="space-y-4">

          {order.items?.map((item, i) => (

            <div
              key={i}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row"
            >

            <img
  src={
    order.items?.[0]?.image
      ? `/images/${order.items[0].image}`
      : "/images/default-book.jpg"
  }
  alt={order.items?.[0]?.title}
  className="h-28 w-24 rounded-xl object-cover"
/>

              <div className="flex-1">

                <h2 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h2>

                <p className="mt-2 text-slate-500">
                  Book ID: {item.book_id || item.id}
                </p>

                <p className="mt-2 text-slate-500">
                  Quantity: {item.quantity}
                </p>

                <p className="mt-2 text-lg font-bold text-orange-600">
                  ₹{item.price}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  </div>
);
}