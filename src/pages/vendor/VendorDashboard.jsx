import { useNavigate } from "react-router-dom";

export default function VendorDashboard() {
  const navigate = useNavigate();

  const vendorName = localStorage.getItem("VENDOR_NAME");

  const handleLogout = () => {
    localStorage.removeItem("VENDOR_TOKEN");
    localStorage.removeItem("VENDOR_NAME");
    navigate("/vendor/login");
  };

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
            <h3 className="text-2xl font-bold text-slate-800">12</h3>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pending Approval</p>
            <h3 className="text-2xl font-bold text-orange-500">3</h3>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Sales</p>
            <h3 className="text-2xl font-bold text-green-600">₹8,450</h3>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-wrap gap-4">

          <button
            className="rounded-full bg-black px-6 py-3 text-white hover:bg-slate-800"
            onClick={() => navigate("/vendor/products")}
          >
            + Add Product
          </button>

          <button
            className="rounded-full border px-6 py-3 hover:bg-slate-200"
          >
            View My Products
          </button>

          <button
            className="rounded-full border px-6 py-3 hover:bg-slate-200"
          >
            Orders
          </button>

        </div>

      </div>
    </div>
  );
}