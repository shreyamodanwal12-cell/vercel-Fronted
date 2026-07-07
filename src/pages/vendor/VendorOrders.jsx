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
<div className="mb-8 grid gap-4 md:grid-cols-3">
  <div className="rounded-3xl bg-white p-6 shadow-sm">
    <p className="text-sm text-slate-500">Total Orders</p>
    <h2 className="mt-2 text-3xl font-bold text-slate-800">
      {orders.length}
    </h2>
  </div>

  <div className="rounded-3xl bg-white p-6 shadow-sm">
    <p className="text-sm text-slate-500">Pending Orders</p>
    <h2 className="mt-2 text-3xl font-bold text-yellow-500">
      {orders.filter(o => o.status === "Pending").length}
    </h2>
  </div>

  <div className="rounded-3xl bg-white p-6 shadow-sm">
    <p className="text-sm text-slate-500">Revenue</p>
    <h2 className="mt-2 text-3xl font-bold text-green-600">
      ₹{orders.reduce((sum, o) => sum + Number(o.total || 0), 0)}
    </h2>
  </div>
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

              <div className="mt-6 border-t pt-5 space-y-4">

  {(order.items || []).map((item) => (

    <div
      key={item.id}
      className="flex flex-col md:flex-row md:items-center md:justify-between rounded-2xl border border-slate-200 p-4"
    >

      <div className="flex items-center gap-4">

        <img
          src={`/images/${item.image}`}
          alt={item.title}
          className="h-20 w-20 rounded-xl object-cover border"
        />

        <div>

          <h3 className="font-semibold text-slate-800">
            {item.title}
          </h3>

          <p className="text-sm text-slate-500">
            SKU : {item.sku}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Product ID : {item.id}
          </p>

        </div>

      </div>

      <div className="mt-4 md:mt-0 flex items-center gap-6">

        <div className="text-center">
          <p className="text-xs text-slate-500">
            Quantity
          </p>

          <p className="font-semibold">
            {item.quantity}
          </p>
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-500">
            Price
          </p>

          <p className="font-semibold text-orange-600">
            ₹{item.price}
          </p>
        </div>

      </div>

    </div>

  ))}

</div>

              {/* Footer */}

            <div className="mt-6 flex flex-col gap-4 border-t pt-5 md:flex-row md:items-center md:justify-between">

  <div>

    <p className="text-sm text-slate-500">
      Customer ID
    </p>

    <p className="font-semibold">
      #{order.user_id}
    </p>

  </div>

  <div>

    <p className="text-sm text-slate-500">
      Products
    </p>

    <p className="font-semibold">
      {order.items.length}
    </p>

  </div>

  <div className="text-right">

    <p className="text-sm text-slate-500">
      Order Total
    </p>

    <h2 className="text-2xl font-bold text-orange-600">
      ₹{order.total}
    </h2>

  </div>

</div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}