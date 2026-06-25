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
    <div className="p-6">
      <h1 className="text-2xl font-bold">Order #{order.id}</h1>

      <p>Status: {order.status}</p>
      <p>Total: ₹{order.total}</p>

      <div className="mt-4">
        <h2 className="font-semibold">Items</h2>

        {order.items?.map((item, i) => (
          <div key={i} className="flex justify-between border p-2 mt-2">
            <span>Book ID: {item.book_id || item.id}</span>
            <span>Qty: {item.quantity || item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}