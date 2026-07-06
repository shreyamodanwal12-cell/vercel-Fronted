import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
export default function VendorDashboard() {
  const navigate = useNavigate();
const [products, setProducts] = useState([]);
  const vendorName = localStorage.getItem("VENDOR_NAME");
const loadProducts = async () => {
  const vendorId = localStorage.getItem("VENDOR_ID");

  const res = await apiFetch(`/api/vendor/products/${vendorId}`);

  console.log("DASHBOARD PRODUCTS =", res);

  setProducts(res.products);
};
useEffect(() => {
  loadProducts();
}, []);
  const handleLogout = () => {
    localStorage.removeItem("VENDOR_TOKEN");
    localStorage.removeItem("VENDOR_NAME");
    navigate("/vendor/login");
  };
const totalProducts = products.length;

const approvedProducts = products.filter(
  (p) => p.approval_status === "Approved"
).length;

const pendingProducts = products.filter(
  (p) => p.approval_status === "Pending"
).length;

const rejectedProducts = products.filter(
  (p) => p.approval_status === "Rejected"
).length;
  return (
    <div className="min-h-screen bg-slate-100">

      {/* TOP BAR */}
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-800">
          Vendor Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-full bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* MAIN CONTENT */}
      <div className="p-6">

        {/* WELCOME CARD */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-800">
            Welcome 👋 {vendorName || "Vendor"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your products, orders and store analytics
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Products</p>
            <h3 className="text-2xl font-bold 
            //
            text-slate-800">{totalProducts}</h3>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pending Approval</p>
            <h3 className="text-2xl font-bold text-orange-500"> {pendingProducts}</h3>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
           <p className="text-sm text-slate-500">
  Approved Products
</p>

<h3 className="text-2xl font-bold text-green-600">
  {approvedProducts}
</h3>
          </div>
<div className="rounded-2xl bg-white p-5 shadow-sm">
  <p className="text-sm text-slate-500">
    Rejected Products
  </p>

  <h3 className="text-2xl font-bold text-red-600">
    {rejectedProducts}
  </h3>
</div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-wrap gap-4">

          <button
            className="rounded-full bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
            onClick={() => navigate("/vendor/products/new")}
          >
            + Add Product
          </button>

          <button
 
  className="rounded-full bg-orange-500  border px-6 py-3 hover:bg-orange-600"
   onClick={() => navigate("/vendor/products")}
>
  View My Products
</button>

         <button
  className="rounded-full bg-orange-500 border px-6 py-3 hover:bg-orange-600"
  onClick={() => navigate("/vendor/orders")}
>
  Orders
</button>

        </div>

      </div>
    </div>
  );
}