import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../../components/ui/Modal";
import { apiFetch } from "../../utils/api";

export default function VendorLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) return;

    try {
      const data = await apiFetch("/api/vendor/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });

      console.log("VENDOR LOGIN =", data);
      localStorage.setItem("VENDOR_ID", data.vendor.id);
localStorage.setItem("VENDOR_NAME", data.vendor.name);
localStorage.setItem("VENDOR_EMAIL", data.vendor.email);
localStorage.setItem("VENDOR_ROLE", data.vendor.role);

      localStorage.setItem("VENDOR_TOKEN", data.vendor?.id);
      localStorage.setItem("VENDOR_NAME", data.vendor?.name);

      setMessage("Login successful! Redirecting...");
      setIsOpen(true);

      setTimeout(() => {
        navigate("/vendor/dashboard");
      }, 1000);
    } catch (error) {
      setMessage(error.message || "Login failed");
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft">
          
          {/* HEADER */}
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-orange-600">
              Vendor Portal
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Vendor Login
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Login to manage your products and orders
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 text-black bg-slate-50 px-4 py-4 text-sm outline-none focus:border-orange-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-black outline-none focus:border-orange-500"
            />

            <button
              type="submit"
              className="w-full rounded-full bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Sign in as Vendor
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Want to go back?{" "}
            <Link
              to="/vendor/register"
              className="font-semibold text-orange-600 hover:text-orange-700"
            >
              register
            </Link>
          </p>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={isOpen}
        title="Vendor Login"
        message={message}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}