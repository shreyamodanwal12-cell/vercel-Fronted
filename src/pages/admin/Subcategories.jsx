import { useEffect, useState } from 'react';

import { apiFetch } from '../../utils/api';

export default function Subcategories() {
 const [subcategories, setSubcategories] = useState([]);

const [categories, setCategories] = useState([]);
const [search, setSearch] = useState("");

const [editData, setEditData] = useState(null); 
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

useEffect(() => {
  loadSubcategories();
  loadCategories();
}, [])

console.log('Component Loaded');
console.log(subcategories);
  return (
   <div className="min-h-screen bg-slate-100 p-8">

  <div className="mb-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

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
<input
  type="text"
  placeholder="Search Subcategory..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mb-6 mt-5 w-full rounded-3xl border border-slate-300 px-4 py-3"
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

const category=categories.find(
c=>c.id===sub.category_id
);

return(

<div
key={sub.id}
className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
>

<div className="flex items-center justify-between">

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

<div className="flex gap-3">

<button
onClick={()=>setEditData(sub)}
className="rounded-full bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
>
Edit
</button>

<button
onClick={()=>deleteSubcategory(sub.id)}
className="rounded-full bg-red-500 px-5 py-2 text-white hover:bg-red-600"
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