import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../../utils/api";

export default function VendorRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    shop_name: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log("FORM DATA =", form); // 👈 add this
    try {
      const res = await apiFetch("/api/vendor/register", {
        method: "POST",
        body: {
          ...form,
          role: "Vendor",
        },
      });
 console.log(res);
      setMessage(res.message);
      setTimeout(() => navigate("/vendor/login"), 1500);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border bg-white p-8 shadow">
        <h1 className="text-2xl text-black font-semibold mb-6">Vendor Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input name="name" placeholder="Name" onChange={handleChange}
            className="w-full border p-3 rounded" />

          <input name="email" placeholder="Email" onChange={handleChange}
            className="w-full border p-3 rounded" />

          <input name="password" type="password" placeholder="Password"
            onChange={handleChange} className="w-full border p-3 rounded" />

          <input name="shop_name" placeholder="Shop Name"
            onChange={handleChange} className="w-full border p-3 rounded" />

          <input name="phone" placeholder="Phone"
            onChange={handleChange} className="w-full border p-3 rounded" />

          <input name="address" placeholder="Address"
            onChange={handleChange} className="w-full border p-3 rounded" />

          <button className="w-full bg-orange-500 text-white py-3 rounded">
            Register
          </button>
        </form>

        <p className="text-sm mt-4 text-center text-green-600">
          {message}
        </p>

        <p className="text-sm mt-3 text-black text-center">
          Already have account?{" "}
          <Link to="/vendor/login" className="text-orange-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}