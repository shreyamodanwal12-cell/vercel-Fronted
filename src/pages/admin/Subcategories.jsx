import { useEffect, useState } from 'react';

import { apiFetch } from '../../utils/api';

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
export default function Subcategories() {
 const [subcategories, setSubcategories] = useState([]);

const [categories, setCategories] = useState([]);
const [search, setSearch] = useState("");

const [editData, setEditData] = useState(null); 
const [form, setForm] = useState({
  title: "",
  category_id: "",
  description: "",
  image: "",
  is_active: true,
});
const [loading, setLoading] = useState(false);

  const loadSubcategories = async () => {
    try {
      console.log('Loading subcategories...');
      const data = await apiFetch('/api/subcategories');
     console.log(JSON.stringify(data, null, 2));
      setSubcategories(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const loadCategories = async () => {
  try {
    const data = await apiFetch("/api/categories");
    setCategories(data);
  } catch (err) {
    console.log(err);
  }
};
async function deleteSubcategory(id) {

  if (!window.confirm("Delete this subcategory?")) return;

  await apiFetch(`/api/subcategories/${id}`, {
    method: "DELETE",
  });

  loadSubcategories();
}
async function updateSubcategory() {

await apiFetch(`/api/subcategories/${editData.id}`,{
method:"PUT",

body:{
title:editData.title,
category_id:editData.category_id,
}
});

setEditData(null);

loadSubcategories();

}
async function uploadImage(file) {

  const formData = new FormData();

  formData.append("image", file);

  const response = await fetch(
    "http://localhost:4000/api/upload-subcategory-image",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (data.error) {
    alert(data.error);
    return;
  }

  setForm((prev) => ({
    ...prev,
    image: data.image,
  }));

  Swal.fire({
    icon: "success",
    title: "Image Uploaded",
    timer: 1200,
    showConfirmButton: false,
  });
}
async function addSubcategory() {
  setLoading(true);
  if (!form.title || !form.category_id) {
    alert("Please fill all fields");
    return;
  }

  await apiFetch("/api/subcategories", {
    method: "POST",
    body: form,
  });


Swal.fire({
  icon: "success",
  title: "Success!",
  text: "Subcategory added successfully.",
  timer: 1800,
  showConfirmButton: false,
});
  setForm({
    title: "",
    category_id: "",
     description: "",
  image: "",
  is_active: true,
  });

  loadSubcategories();
  setLoading(false);
}

useEffect(() => {
  loadSubcategories();
  loadCategories();
}, [])

console.log('Component Loaded');
console.log(subcategories);
  return (
   <div className="min-h-screen bg-slate-100 px-6 py-10">

  <div className="mx-auto mb-8 max-w-6xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">

    <h1 className="text-3xl font-bold text-slate-900">
      Manage Subcategories
    </h1>

    <p className="mt-2 text-slate-500">
      Create, edit and manage all subcategories.
    </p>

    <div className="mt-6 flex items-center gap-6">

      <div className="rounded-2xl bg-orange-50 px-6 py-4">

        <p className="text-sm text-slate-500">
          Total Subcategories
        </p>

        <h2 className="text-3xl font-bold text-orange-600">
          {subcategories.length}
        </h2>

      </div>

    </div>

  </div>
 

<div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">

  <div className="mb-6">
    <p className="text-center text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
ADMIN PORTAL
</p>

<h2 className="mt-3 text-center text-4xl font-bold text-slate-900">
Add Subcategory
</h2>

<p className="mt-2 text-center text-slate-500">
Create new subcategory for your products
</p>

    <p className="mt-2 text-slate-500">
      Create a new subcategory under an existing category.
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-2">

    {/* Subcategory Name */}
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Subcategory Name
      </label>

      <input
        type="text"
        placeholder="Enter subcategory name"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
       className="w-full rounded-full border border-slate-300 px-6 py-4 outline-none focus:border-orange-500"
      />
    </div>

    {/* Category */}
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Category
      </label>

      <select
        value={form.category_id}
        onChange={(e) =>
          setForm({
            ...form,
            category_id: Number(e.target.value),
          })
        }
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
      >
        <option value="">Select Category</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.title}
          </option>
        ))}
      </select>
    </div>

    {/* Description */}
    <div className="md:col-span-2">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Description
      </label>

      <textarea
        rows="4"
        placeholder="Write short description..."
        value={form.description || ""}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
      />
    </div>
<div className="md:col-span-2">

<label className="block mb-2 text-sm font-semibold text-slate-700">
Subcategory Image
</label>

<label className="flex h-60 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-orange-400 hover:bg-orange-50">

<span className="text-6xl">📷</span>

<p className="mt-3 font-semibold text-slate-700">
Upload Image
</p>

<p className="text-sm text-slate-200">
PNG, JPG, JPEG
</p>

<input
type="file"
hidden
accept="image/*"
onChange={(e)=>{
if(e.target.files[0]){
uploadImage(e.target.files[0]);
}
}}
/>

</label>

{form.image && (

<p className="mt-3 text-green-600">
✔ Image Uploaded
</p>

)}

</div>

    {/* Status */}
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Status
      </label>

      <select
        value={form.status || "Active"}
         onChange={(e) =>
          setForm({
            ...form,
            status: e.target.value,
          })
        }
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>

  </div>

  <div className="mt-8 flex justify-end">

   <button
  onClick={addSubcategory}
  disabled={loading}
  className="rounded-full bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Adding..." : "Add Subcategory"}
</button>

  </div>

</div>

<input
  type="text"
  placeholder="Search Subcategory..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mb-8 mt-8 w-full rounded-full border border-slate-300 bg-white px-6 py-4 shadow-sm outline-none focus:border-orange-500"
/>
{editData && (

<div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow">

<h2 className="mb-4 text-xl font-bold">
Edit Subcategory
</h2>

<input
type="text"
value={editData.title}
onChange={(e)=>
setEditData({
...editData,
title:e.target.value
})
}
className="w-full rounded-xl border p-3"
/>

<div className="mt-4 flex gap-3">

<button
onClick={updateSubcategory}
className="rounded-full bg-green-500 px-6 py-2 text-white"
>
Save
</button>

<button
onClick={()=>setEditData(null)}
className="rounded-full bg-gray-500 px-6 py-2 text-white"
>
Cancel
</button>

</div>

</div>

)}
      <div className="grid gap-5">

{subcategories
.filter(sub =>
sub.title
.toLowerCase()
.includes(search.toLowerCase())
)
.map(sub=>{
console.log(sub.image);
const category=categories.find(
c=>c.id===sub.category_id
);

return(

<div
key={sub.id}
className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
>

<div className="flex items-center justify-between">

  <div className="flex items-center gap-5">

    {sub.image ? (
      <img
        src={`https://obzqkxxypytninuzhupx.supabase.co/storage/v1/object/public/subcategory-images/${sub.image}`}
        alt={sub.title}
        className="h-24 w-24 rounded-2xl border object-cover"
        onError={() => console.log("Image failed:", sub.image)}
      />
    ) : (
      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-200 text-sm text-slate-500">
        No Image
      </div>
    )}

    <div>
      <h2 className="text-xl font-semibold text-slate-800">
        {sub.title}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Category :
        <span className="font-medium text-orange-600">
          {" "}
          {category?.title || "Unknown"}
        </span>
      </p>

      <p className="mt-2 text-xs text-slate-400">
        Subcategory ID : #{sub.id}
      </p>
    </div>

  </div>

  <div className="flex gap-3">

    <button
      onClick={() => setEditData(sub)}
      className="rounded-full bg-slate-800 px-5 py-2 text-white transition hover:bg-black"
    >
      Edit
    </button>

    <button
      onClick={() => deleteSubcategory(sub.id)}
      className="rounded-full bg-red-500 px-5 py-2 text-white transition hover:bg-red-700"
    >
      Delete
    </button>

  </div>

</div>

</div>

);

})}

</div>
    </div>
  );
}