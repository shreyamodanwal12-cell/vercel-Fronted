import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../utils/api"; 
export default function AddProduct() {
const [productForm, setProductForm] = useState({
    title: "",
    category_id: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
    image: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const isEdit = Boolean(id);
    const handleChange = (e) => {
      setProductForm({
        ...productForm,
        [e.target.name]: e.target.value,
      });
    };
  const handleSaveProduct = async () => {
    try {
      const payload = {
        title: productForm.title,
        category_id: Number(productForm.category_id),
        description: productForm.description,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        sku: productForm.sku,
        image: productForm.image,
  
        // Login vendor ka ID
        vendor_id: Number(localStorage.getItem("VENDOR_ID")),
  
        // Admin approval ka wait karega
        approval_status: "Pending",
  
        // Jab tak admin active na kare
        is_active: false,
      };
  
      console.log("VENDOR PRODUCT =", payload);
  
     if (isEdit) {
  await apiFetch(`/api/products/${id}`, {
    method: "PUT",
    body: payload,
  });

  alert("Product updated successfully!");
} else {
  await apiFetch("/api/products", {
    method: "POST",
    body: payload,
  });

  alert("Product added successfully!");
} 
      alert("Product added successfully!");
  
      setProductForm({
        title: "",
        category_id: "",
        description: "",
        price: "",
        stock: "",
        sku: "",
        image: "",
      });
  
    } catch (err) {
      alert(err.message);
    }
  };
    useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await apiFetch("/api/categories");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    loadCategories();
  }, []);
useEffect(() => {
  if (!isEdit) return;

  const loadProduct = async () => {
    try {
      const product = await apiFetch(`/api/products/${id}`);

      console.log("EDIT PRODUCT =", product);

      setProductForm({
        title: product.title || "",
        category_id: product.category_id || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        sku: product.sku || "",
        image: product.image || "",
      });

    } catch (err) {
      console.log(err);
    }
  };

  loadProduct();
}, [id, isEdit]);
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow">
     <div className="mb-8 flex items-center justify-between">
  <h1 className="text-3xl font-bold text-slate-800">
    {isEdit ? "Edit Product" : "Add Product"}
  </h1>

  <button
    onClick={() => navigate("/vendor/products")}
    className="rounded-xl border border-slate-300 px-5 py-2 font-medium text-slate-700 hover:bg-slate-100"
  >
    ← Back
  </button>
</div>
        <p className="mt-2 text-slate-500">
          Product form yahan aayega.
        </p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">

          <input
            name="title"
            placeholder="Product Title"
            value={productForm.title}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

         <select
  name="category_id"
  value={productForm.category_id}
  onChange={handleChange}
  className="rounded-xl border p-3"
>
  <option value="">Select Category</option>

  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.title}
    </option>
  ))}
</select>

          <input
            name="price"
            placeholder="Price"
            value={productForm.price}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="stock"
            placeholder="Stock"
            value={productForm.stock}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="sku"
            placeholder="SKU"
            value={productForm.sku}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="image"
            placeholder="Image URL"
            value={productForm.image}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

        <textarea
          name="description"
          placeholder="Description"
          value={productForm.description}
          onChange={handleChange}
          className="mt-5 h-36 w-full rounded-xl border p-3"
        />

    <button
  onClick={handleSaveProduct}
  className="mt-6 rounded-full bg-black px-8 py-3 text-white hover:bg-slate-800"
>
 {isEdit ? "Update Product" : "Save Product"}
</button>
        </div>
      </div>
    </div>
  );
}