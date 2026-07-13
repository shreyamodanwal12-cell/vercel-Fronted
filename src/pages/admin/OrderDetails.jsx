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
        const res = await apiFetch(`/api/orders/${id}`);
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

  return (

  <div className="min-h-screen bg-slate-100 text-black p-8">

    <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">

      <h1 className="text-4xl font-bold text-slate-900">
        Order #{order.id}
      </h1>

      <p className="mt-2 text-slate-500">
        Complete order information
      </p>

      {/* Top cards */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl bg-orange-50 p-5">
          <p className="text-sm text-slate-500">Status</p>

          <h2 className="mt-2 text-xl font-bold text-orange-600">
            {order.status}
          </h2>
        </div>

        <div className="rounded-2xl bg-green-50 p-5">
          <p className="text-sm text-slate-500">Total Amount</p>

          <h2 className="mt-2 text-xl font-bold text-green-600">
            ₹{order.total}
          </h2>
        </div>

        <div className="rounded-2xl bg-blue-50 p-5">
          <p className="text-sm text-slate-500">Date</p>

          <h2 className="mt-2 text-lg font-bold text-blue-600">
            {new Date(order.created_at).toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Customer Details */}

      <div className="mt-8 rounded-2xl text-black border p-6">

        <h2 className="mb-4 text-black font-bold">
          Customer Details
        </h2>

        <div className="space-y-3">

          <p>
            <span className="font-semibold">
              Name:
            </span>{" "}
            {order.customer_name}
          </p>

          <p>
            <span className="font-semibold">
              Phone:
            </span>{" "}
            {order.customer_phone}
          </p>

          <p>
            <span className="font-semibold">
              Address:
            </span>{" "}
            {order.customer_address}
          </p>

        </div>

      </div>

      {/* Ordered Products */}

      <div className="mt-8">

        <h2 className="mb-4 text-black font-bold">
          Ordered Items
        </h2>

        <div className="space-y-4">

          {order.items?.map((item , index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-2xl border p-5 shadow-sm"
            >

              <div>

                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500">
                  Vendor ID: {item.vendor_id}
                </p>

              </div>

              <div className="text-right">

                <p>
                  Qty: {item.quantity}
                </p>

                <p className="font-bold text-orange-600">
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