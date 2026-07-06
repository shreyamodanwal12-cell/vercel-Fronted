import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";


export default function VendorProducts() {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);


const loadProducts = async () => {
  const vendorId = localStorage.getItem("VENDOR_ID");

  const res = await apiFetch(`/api/vendor/products/${vendorId}`);

  console.log("MY PRODUCTS =", res);

  setProducts(res.products);
};
const [search, setSearch] = useState("");




useEffect(() => {
  loadProducts();
}, []);
const handleDelete = async (id) => {
  const ok = window.confirm("Are you sure you want to delete this product?");

  if (!ok) return;

  try {
    await apiFetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    alert("Product deleted successfully!");

    loadProducts();
  } catch (err) {
    alert(err.message);
  }
};
const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow">

        <h1 className="text-3xl font-bold text-slate-800">
          My Products
        </h1>

        <p className="mt-2 text-slate-500">
          Add and manage your own products.
        </p>

  
<div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

  <input
    type="text"
    placeholder="Search your products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-slate-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 md:w-96"
  />

  <button
    onClick={() => navigate("/vendor/products/new")}
    className="rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
  >
    + Add Product
  </button>

</div>
<div className="mt-10">
<h2 className="mb-6 text-3xl font-bold text-slate-800">
  My Products
</h2>

{filteredProducts.length === 0 ? (
  <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
    <p className="text-lg text-slate-500">
      No products found.
    </p>
  </div>
) : (
  <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
    <table className="min-w-full">
      <thead className="bg-slate-100">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
            Product
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
            Price
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
            Stock
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
            Status
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
            Active
          </th>

          <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {filteredProducts.map((product) => (
          <tr
            key={product.id}
            className="border-t hover:bg-slate-50 transition"
          >
            <td className="px-6 py-4 font-medium text-slate-800">
              {product.title}
            </td>

            <td className="px-6 py-4 text-slate-700">
              ₹{product.price}
            </td>

            <td className="px-6 py-4 text-slate-700">
              {product.stock}
            </td>

            <td className="px-6 py-4">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  product.approval_status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : product.approval_status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {product.approval_status}
              </span>
            </td>

            <td className="px-6 py-4">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  product.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {product.is_active ? "Active" : "Inactive"}
              </span>
            </td>

            <td className="px-6 py-4">
              <div className="flex justify-center gap-2">
                <button
  onClick={() => navigate(`/vendor/products/edit/${product.id}`)}
  className="rounded-xl bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
>
  Edit
</button>

                <button
 onClick={() => handleDelete(product.id)}
  className="rounded-xl bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
>
  Delete
</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
</div>

      </div>
    </div>
  );
}