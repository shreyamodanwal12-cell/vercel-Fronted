import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";

export default function VendorOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const vendorId = localStorage.getItem("VENDOR_ID");

    const res = await apiFetch(`/api/vendor/orders/${vendorId}`);

    console.log(res);

    setOrders(res.orders || []);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-black p-8">

      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black text-slate-800">
          My Orders
        </h1>

        <p className="text-slate-500 mt-2">
          Orders containing your products
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow">
          <h2 className="text-xl font-semibold">
            No Orders Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Once customers purchase your products,
            orders will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="rounded-3xl bg-white p-6 shadow hover:shadow-lg transition"
            >

              {/* Top */}

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-black font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {new Date(order.created_at).toLocaleString()}
                  </p>

                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold
                  ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status}
                </span>

              </div>

              {/* Products */}

              <div className="mt-6 border-t pt-5">

                {(order.items || []).map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b py-4"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-500">
                        SKU : {item.sku}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="font-semibold">
                        ₹{item.price}
                      </p>

                      <p className="text-sm text-slate-500">
                        Qty : {item.quantity}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

              {/* Footer */}

              <div className="mt-6 flex justify-between">

                <h3 className="font-semibold">
                  Total
                </h3>

                <h3 className="text-xl font-bold text-orange-600">
                  ₹{order.total}
                </h3>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}