import { useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../utils/api';

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'books', label: 'Books' },
  { key: 'orders', label: 'Orders' },
  { key: 'users', label: 'Users' },
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

export default function AdminPanel() {
  const [token, setToken] = useState(localStorage.getItem('IBID_ADMIN_TOKEN') || '');
  const [activeTab, setActiveTab] = useState('overview');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookForm, setBookForm] = useState(defaultBook);
  const [editingBookId, setEditingBookId] = useState(null);
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
        setOrders(ordersData);
      }
      if (activeTab === 'users') {
        const usersData = await apiFetch('/api/users');
        setUsers(usersData);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
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
      const data = await apiFetch('/api/admin/login', {
        method: 'POST',
        body: { email: loginData.email.trim(), password: loginData.password },
      });
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
    setBooks([]);
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
                    <p className="text-sm font-semibold text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</p>
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
                  <input value={bookForm.title} onChange={(e) => handleBookFormChange('title', e.target.value)} placeholder="Title" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                  <input value={bookForm.author} onChange={(e) => handleBookFormChange('author', e.target.value)} placeholder="Author" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input value={bookForm.category} onChange={(e) => handleBookFormChange('category', e.target.value)} placeholder="Category" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                  <input value={bookForm.price} onChange={(e) => handleBookFormChange('price', e.target.value)} type="number" step="0.01" placeholder="Price" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input value={bookForm.oldPrice} onChange={(e) => handleBookFormChange('oldPrice', e.target.value)} type="number" step="0.01" placeholder="Old price" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                  <input value={bookForm.badge} onChange={(e) => handleBookFormChange('badge', e.target.value)} placeholder="Badge" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                </div>
                <input value={bookForm.cover} onChange={(e) => handleBookFormChange('cover', e.target.value)} placeholder="Cover image URL" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                <textarea value={bookForm.description} onChange={(e) => handleBookFormChange('description', e.target.value)} placeholder="Description" className="h-28 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500" />
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
                      <h3 className="font-semibold text-slate-900">Order #{order.id}</h3>
                      <p className="text-sm text-slate-500">Status: {order.status} • Total: ${order.total.toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="mt-3 grid gap-2 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between gap-3">
                        <span>{item.title}</span>
                        <span>{item.quantity} × ${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )) : (
                <p className="text-sm text-slate-500">No orders yet.</p>
              )}
            </div>
          </div>
        </div>
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
    </div>
  );
}
