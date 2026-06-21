import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../utils/api';
import Subcategories from './admin/Subcategories.jsx';

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'books', label: 'Books' },
  { key: 'categories', label: 'Categories' },
  { key: 'subcategories', label: 'Subcategories' },
  { key: 'orders', label: 'Orders' },
  { key: 'users', label: 'Users' },
  { key: 'vendors', label: 'Vendors' },
];
const defaultBook = {
  title: '',
  slug: '',
  author: '',
  category: 'Books',
  price: '',
  oldPrice: '',
  badge: '',
  cover: '',
  description: '',
};
const defaultCategory = {
  title: '',
  description: '',
   image: '',
};

const defaultSubcategory = {
  title: '',
  category_id: '',
};
export default function AdminPanel() {
  const [token, setToken] = useState(localStorage.getItem('IBID_ADMIN_TOKEN') || '');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
 const [vendors, setVendors] = useState([]); 
 const [categories, setCategories] = useState([]);
 const [subcategories, setSubcategories] = useState([]);
 const [subcategoryForm, setSubcategoryForm] =
  useState(defaultSubcategory);
const [categoryForm, setCategoryForm] = useState(defaultCategory);
const [categorySearch, setCategorySearch] = useState('');
  const [bookForm, setBookForm] = useState(defaultBook);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  useEffect(() => {
    if (token) {
      localStorage.setItem('IBID_ADMIN_TOKEN', token);
      loadData();
    } else {
      localStorage.removeItem('IBID_ADMIN_TOKEN');
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [activeTab]);
  useEffect(() => {
  fetchCategories();
}, []);

  const loggedIn = Boolean(token);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'overview') {
        const dashboardData = await apiFetch('/api/dashboard');
        setDashboard(dashboardData);
      }
      if (activeTab === 'books') {
        const booksData = await apiFetch('/api/books');
        setBooks(booksData);
      }
      if (activeTab === 'orders') {
        const ordersData = await apiFetch('/api/orders');
        console.log(
          "ORDERS API FULL =",
          JSON.stringify(ordersData, null, 2)
        );
        console.log("FIRST ORDER =", ordersData[0]);
        console.log("ORDER ITEMS =", ordersData[0]?.items);

        setOrders(ordersData);
      }
      if (activeTab === 'Subcategories') {
  const res = await apiFetch('/api/Subcategories');
  console.log("SUBCATEGORIES =", res);
}
      if (activeTab === 'users') {
        const usersData = await apiFetch('/api/users');
        setUsers(usersData);
      }
if (activeTab === 'categories') {
  const categoriesData = await apiFetch('/api/categories');
  console.log('CATEGORIES =', categoriesData);
  setCategories(categoriesData);
}


     if (activeTab === 'vendors') {
  const vendorsData = await apiFetch('/api/vendors');

  console.log("VENDORS =", vendorsData);

  setVendors(vendorsData);
}
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  //fetch categories for book form
const fetchCategories = async () => {
  try {
    const res = await apiFetch('/api/categories');
    setCategories(res || []);
  } catch (err) {
    setMessage(err.message);
  }
};
  const handleLogin = async (event) => {
    event.preventDefault();

    // Validate both email and password are provided
    if (!loginData.email.trim() || !loginData.password.trim()) {
      setMessage('Email and password are required.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      // const data = await apiFetch('/api/admin/login', {
      //   method: 'POST',
      //   body: { email: loginData.email.trim(), password: loginData.password },
      // });
      console.log('LOGIN DATA =', {
        email: loginData.email,
        password: loginData.password
      })
      //alert(JSON.stringify(loginData))
      const data = await apiFetch('/api/admin/login', {
        method: 'POST',
        body: {
          email: loginData.email.trim(),
          password: loginData.password,
        },
      })

      setToken(data.token);
      setLoginData({ email: '', password: '' });
      setMessage('Logged in successfully.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setDashboard(null);

    setOrders([]);
    setUsers([]);
    setBookForm(defaultBook);
    setEditingBookId(null);
    setLoginData({ email: '', password: '' });
    setMessage('Logged out.');
  };

  const handleBookFormChange = (field, value) => {
    setBookForm((current) => ({ ...current, [field]: value }));
  };
const handleAddCategory = async (e) => {
  e.preventDefault();

  try {
    if (editingCategoryId) {
      await apiFetch(`/api/categories/${editingCategoryId}`, {
        method: 'PUT',
        body: categoryForm,
      });

      setMessage('Category updated successfully.');
      setEditingCategoryId(null);
    } else {
      await apiFetch('/api/categories', {
        method: 'POST',
        body: categoryForm,
      });

      setMessage('Category added successfully.');
    }

    setCategoryForm(defaultCategory);
    fetchCategories();
  } catch (err) {
    setMessage(err.message);
  }
};
  const handleSaveBook = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const payload = {
        ...bookForm,
        price: Number(bookForm.price),
        oldPrice: bookForm.oldPrice ? Number(bookForm.oldPrice) : Number(bookForm.price),
      };
      console.log("BOOK PAYLOAD =", payload);
      if (editingBookId) {
        await apiFetch(`/api/books/${editingBookId}`, {
          method: 'PUT',
          body: payload,
        });
        setMessage('Book updated successfully.');
      } else {
        await apiFetch('/api/books', {
          method: 'POST',
          body: payload,
        });
        setMessage('Book created successfully.');
      }
      setBookForm(defaultBook);
      setEditingBookId(null);
      const booksData = await apiFetch('/api/books');
      setBooks(booksData);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
//add category
const addCategory = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await apiFetch('/api/categories', {
      method: 'POST',
      body: categoryForm,
    });

    setCategoryForm(defaultCategory);
    fetchCategories();
    setMessage('Category created successfully');
  } catch (err) {
    setMessage(err.message);
  } finally {
    setLoading(false);
  }
};
  
  const startEditBook = (book) => {
    setEditingBookId(book.id);
    setBookForm({
      title: book.title,
      slug: book.slug,
      author: book.author,
      category: book.category,
      price: book.price,
      oldPrice: book.oldPrice,
      badge: book.badge,
      cover: book.cover,
      description: book.description,
    });
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Delete this book?')) return;
    setLoading(true);
    setMessage('');
    try {
      await apiFetch(`/api/books/${bookId}`, { method: 'DELETE' });
      setBooks((current) => current.filter((book) => book.id !== bookId));
      setMessage('Book deleted successfully.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const updateVendor = async (id, updates) => {
  console.log("UPDATE VENDOR =", id, updates);

  try {
    const response = await apiFetch(`/api/vendors/${id}`, {
      method: 'PUT',
      body: updates,
    });

    console.log("RESPONSE =", response);

    const vendorData = await apiFetch('/api/vendors');
    setVendors(vendorData);
  } catch (error) {
    console.log("ERROR =", error);
  }
}; 
const deleteCategory = async (id) => {
  if (!window.confirm('Delete category?')) return;

  try {
    await apiFetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });

    setCategories((prev) => prev.filter((c) => c.id !== id));
  } catch (err) {
    setMessage(err.message);
  }
};
const handleEditCategory = (cat) => {
  setCategoryForm({
    title: cat.title,
    description: cat.description,
    image: cat.image || "",
  });

  setEditingCategoryId(cat.id);
};
  const overviewStats = useMemo(
    () => [
      { label: 'Books', value: dashboard?.totalBooks ?? '—' },
      { label: 'Orders', value: dashboard?.totalOrders ?? '—' },
      { label: 'Revenue', value: dashboard ? `$${dashboard.totalRevenue.toFixed(2)}` : '—' },
      { label: 'Users', value: dashboard?.totalUsers ?? '—' },
    ],
    [dashboard]
  );

  if (!loggedIn) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft">
          <h1 className="text-3xl font-semibold text-slate-900">Admin sign in</h1>
          <p className="mt-3 text-sm text-slate-500">Use the admin panel to manage books, orders, and users.</p>
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                value={loginData.email}
                onChange={(event) => setLoginData((prev) => ({ ...prev, email: event.target.value }))}
                type="email"
                placeholder="Enter admin email"
                required
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                value={loginData.password}
                onChange={(event) => setLoginData((prev) => ({ ...prev, password: event.target.value }))}
                type="password"
                placeholder="Enter admin password"
                required
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500"
              />
            </div>
            <button type="submit" className="w-full rounded-full bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in as admin'}
            </button>
          </form>
          {message ? <p className="mt-4 text-sm text-red-600">{message}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Admin panel</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Manage iBid</h1>
        </div>
        <button onClick={handleLogout} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
          Log out
        </button>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === tab.key ? 'bg-orange-500 text-white' : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {message ? <div className="mb-6 rounded-3xl border border-orange-100 bg-orange-50 px-6 py-4 text-sm text-orange-700">{message}</div> : null}
      {activeTab === 'categories' && (
        <>
      <div className="mb-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
  <h2 className="text-xl font-semibold text-slate-900">
    Add Category
  </h2>

  <form
    onSubmit={handleAddCategory}
    className="mt-6 space-y-4"
  >
    <input
      type="text"
      placeholder="Category Title"
      value={categoryForm.title}
      onChange={(e) =>
        setCategoryForm({
          ...categoryForm,
          title: e.target.value,
        })
      }
      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-black"
    />

    <input
      type="text"
      placeholder="Category Description"
      value={categoryForm.description}
      onChange={(e) =>
        setCategoryForm({
          ...categoryForm,
          description: e.target.value,
        })
      }
      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-black"
    />

    <input
      type="text"
      placeholder="Image URL"
      value={categoryForm.image}
      onChange={(e) =>
        setCategoryForm({
          ...categoryForm,
          image: e.target.value,
        })
      }
      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-black"
    />

    <button
      type="submit"
      className="rounded-full bg-orange-500 px-6 py-3 text-white"
    >
      Add Category
    </button>
  </form>
</div>

{/* search categories */}
<input
  type="text"
  placeholder="Search category..."
  value={categorySearch}
  onChange={(e) => setCategorySearch(e.target.value)}
  className="mb-4 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-black"
/>
<div className="mt-8 space-y-3">
  {categories
  .filter((cat) =>
    cat.title
      ?.toLowerCase()
      .includes(categorySearch.toLowerCase())
  )
  .map((cat) => (
    <div
      key={cat.id}
      className="flex items-center justify-between rounded-2xl border p-4"
    >
<div>
  <h3 className="font-semibold">{cat.title}</h3>

  <p className="text-sm text-slate-500">
    {cat.description}
  </p>

  <p className="text-xs text-slate-400 mt-1">
    Created: {cat.created_at
      ? new Date(cat.created_at).toLocaleString()
      : "N/A"}
  </p>

  <p className="text-xs text-slate-400">
    Updated: {cat.updated_at
      ? new Date(cat.updated_at).toLocaleString()
      : "N/A"}
  </p>
</div>
      <div className="flex gap-2">
        <button
          onClick={() => handleEditCategory(cat)}
          className="px-3 py-2 bg-blue-500 text-white rounded"
        >
          Edit
        </button>

        <button
          onClick={() => deleteCategory(cat.id)}
          className="rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
</>

)}

      {activeTab === 'overview' && (
        <div className="grid gap-6 lg:grid-cols-4">
          {overviewStats.map((item) => (
            <div key={item.label} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft lg:col-span-4">
            <h2 className="text-xl font-semibold text-slate-900">Recent orders</h2>
            <div className="mt-6 space-y-4">
              {dashboard?.recentOrders?.length ? (
                dashboard.recentOrders.map((order) => (
                  <div key={order.id} className="flex flex-col gap-3 rounded-3xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">Order #{order.id}</h3>
                      <p className="text-sm text-slate-500">Status: {order.status} • Total: ${order.total.toFixed(2)}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No recent orders available.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'books' && (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
              <h2 className="text-xl font-semibold text-slate-900">Books</h2>
              <div className="mt-6 space-y-4">
                {loading ? (
                  <p className="text-sm text-slate-500">Loading books...</p>
                ) : books.length ? (
                  books.map((book) => (
                    <div key={book.id} className="flex flex-col gap-3 rounded-3xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{book.title}</h3>
                        <p className="text-sm text-slate-500">{book.category} • {book.author}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button type="button" onClick={() => startEditBook(book)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-300">
                          Edit
                        </button>
                        <button type="button" onClick={() => handleDeleteBook(book.id)} className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No books found.</p>
                )}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
              <h2 className="text-xl font-semibold text-slate-900">Book details</h2>
              <form onSubmit={handleSaveBook} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input value={bookForm.title} onChange={(e) => handleBookFormChange('title', e.target.value)} placeholder="Title" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm  text-black outline-none focus:border-orange-500" />
                  <input value={bookForm.author} onChange={(e) => handleBookFormChange('author', e.target.value)} placeholder="Author" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none focus:border-orange-500" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">

                  <select
  value={bookForm.category}
  onChange={(e) =>
    handleBookFormChange('category', e.target.value)
  }
  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none focus:border-orange-500"
>
  <option value="">Select Category</option>

  {categories?.map((cat) => (
    <option key={cat.id} value={cat.title}>
      {cat.title}
    </option>
  ))} 
</select>
  {/* <div className="mt-8 space-y-3">
  {categories.map((cat) => (
    <div
      key={cat.id}
      className="flex items-center justify-between rounded-2xl border p-4"
    >
      <div>
        <h3 className="font-semibold">{cat.title}</h3>
        <p className="text-sm text-slate-500">
          {cat.description}
        </p>
      </div>
<div className="flex gap-2">
      <button
        onClick={() => handleEditCategory(cat)}
        className="px-3 py-2 bg-blue-500 text-white rounded"
      >
        Edit
      </button>
      <button
        onClick={() => deleteCategory(cat.id)}
        className="rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Delete
      </button>
    </div>
    </div>
  ))}
</div>  */}
                  <input value={bookForm.category} onChange={(e) => handleBookFormChange('category', e.target.value)} placeholder="Category" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none focus:border-orange-500" />
                  <input value={bookForm.price} onChange={(e) => handleBookFormChange('price', e.target.value)} type="number" step="0.01" placeholder="Price" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none focus:border-orange-500" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input value={bookForm.oldPrice} onChange={(e) => handleBookFormChange('oldPrice', e.target.value)} type="number" step="0.01" placeholder="Old price" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none focus:border-orange-500" />
                  <input value={bookForm.badge} onChange={(e) => handleBookFormChange('badge', e.target.value)} placeholder="Badge" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none focus:border-orange-500" />
                </div>
                <input value={bookForm.cover} onChange={(e) => handleBookFormChange('cover', e.target.value)} placeholder="Cover image URL" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none focus:border-orange-500" />
                <textarea value={bookForm.description} onChange={(e) => handleBookFormChange('description', e.target.value)} placeholder="Description" className="h-28 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none focus:border-orange-500" />
                <div className="flex flex-wrap gap-3">
                  <button type="submit" className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600">
                    {editingBookId ? 'Update book' : 'Create book'}
                  </button>
                  <button type="button" onClick={() => { setBookForm(defaultBook); setEditingBookId(null); }} className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <h2 className="text-xl font-semibold text-slate-900">Orders</h2>
            <div className="mt-6 space-y-4">
              {orders.length ? orders.map((order) => (
                <div key={order.id} className="rounded-3xl border border-slate-100 p-4">

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Order #{order.id}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Status: {order.status || "Pending"} • Total: $
                        {Number(order.total || 0).toFixed(2)}
                      </p>
                    </div>

                    <p className="text-sm text-slate-500">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleString()
                        : "No Date"}
                    </p>
                  </div>

                  {/* 👇 CLICK BUTTON ADDED HERE */}
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="rounded-full bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600"
                    >
                      View Order
                    </button>
                  </div>

                  {/* ITEMS */}
                  <div className="mt-3 grid gap-2 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                    {(order.items || []).length ? (
                      order.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span>Book ID: {item.book_id}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      ))
                    ) : (
                      <p>No Items</p>
                    )}
                  </div>

                </div>
              )) : (
                <p className="text-sm text-slate-500">
                  No orders yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* ------------subcategory------------ */}
     {activeTab === 'subcategories' && (
  <Subcategories />
)}
      {activeTab === 'users' && (
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Users</h2>
          <div className="mt-6 grid gap-4">
            {users.length ? users.map((user) => (
              <div key={user.id} className="flex flex-col gap-2 rounded-3xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{user.name}</h3>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">{user.role}</span>
              </div>
            )) : (
              <p className="text-sm text-slate-500">No users found.</p>
            )}
          </div>
        </div>
        
      )}
      {activeTab === 'vendors' && (
  <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
    <h2 className="text-xl font-semibold text-slate-900">
      Vendors
    </h2>

    <div className="mt-6 grid gap-4">
      {vendors.length ? (
        vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="rounded-3xl border border-slate-100 bg-slate-50 p-4"
          >
            <h3 className="font-semibold text-slate-900">
              {vendor.name}
            </h3>

            <p className="text-sm text-slate-500">
              {vendor.email}
            </p>

            <p className="text-sm">
              Approved:
              {" "}
              {vendor.is_approved ? "Yes" : "No"}
            </p>

            <p className="text-sm">
              Active:
              {" "}
              {vendor.is_active ? "Yes" : "No"}
            </p>
            <div className="mt-3 flex gap-2">
  <button
    onClick={() =>
      updateVendor(vendor.id, {
        is_approved: !vendor.is_approved,
      })
    }
    className="rounded-full bg-green-500 px-4 py-2 text-sm text-white"
  >
    {vendor.is_approved ? 'Unapprove' : 'Approve'}
  </button>

  <button
    onClick={() =>
      updateVendor(vendor.id, {
        is_active: !vendor.is_active,
      })
    }
    className="rounded-full bg-red-500 px-4 py-2 text-sm text-white"
  >
    {vendor.is_active ? 'Deactivate' : 'Activate'}
  </button>
</div>
          </div>

        ))
      ) : (
        <p>No vendors found.</p>
      )}
    </div>
  </div>
)}
    </div>
  );
}