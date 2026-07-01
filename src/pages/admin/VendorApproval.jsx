import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";

export default function VendorApproval() {
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    const data = await apiFetch("/api/vendors");
    setVendors(data || []);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const approveVendor = async (id) => {
    await apiFetch(`/api/vendors/${id}/approve`, {
      method: "PUT",
    });

    fetchVendors();
  };

  const toggleActive = async (id, current) => {
    await apiFetch(`/api/vendors/${id}`, {
      method: "PUT",
      body: {
        is_active: !current,
      },
    });

    fetchVendors();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vendor Approval System</h1>

      <div className="grid gap-4">
        {vendors.map((v) => (
          <div key={v.id} className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold">{v.name}</h2>
            <p>{v.email}</p>
            <p>Shop: {v.shop_name}</p>

            <p className="mt-2">
              Status:{" "}
              {v.is_approved ? (
                <span className="text-green-600">Approved</span>
              ) : (
                <span className="text-red-600">Pending</span>
              )}
            </p>

            <div className="mt-3 flex gap-2">
              {!v.is_approved && (
                <button
                  onClick={() => approveVendor(v.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
              )}

              <button
                onClick={() => toggleActive(v.id, v.is_active)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                {v.is_active ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}