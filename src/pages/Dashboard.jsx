import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../utils/api';

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/api/dashboard')
      .then((data) => setDashboard(data))
      .catch(() => setError('Unable to load dashboard data.'));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Your account overview</h1>
        </div>
        <Link to="/wishlist" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
          View wishlist
        </Link>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Orders</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{dashboard?.totalOrders ?? '—'}</p>
          <p className="mt-3 text-sm text-slate-500">Orders placed in the last 30 days.</p>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Revenue</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{dashboard ? `$${dashboard.totalRevenue.toFixed(2)}` : '—'}</p>
          <p className="mt-3 text-sm text-slate-500">Total revenue from recent orders.</p>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Saved</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{dashboard?.totalUsers ?? '—'} users</p>
          <p className="mt-3 text-sm text-slate-500">Active shoppers in the store.</p>
        </div>
      </div>
      <div className="mt-10 space-y-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Recent orders</h2>
          <div className="mt-6 space-y-4">
            {dashboard?.recentOrders?.length ? (
              dashboard.recentOrders.map((order) => (
                <div key={order.id} className="flex flex-col gap-3 rounded-3xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">Order #{order.id}</h3>
                    <p className="text-sm text-slate-500">Status: {order.status}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">${order.total.toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No recent orders available.</p>
            )}
          </div>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Account details</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Name</p>
              <p className="mt-2 font-semibold text-slate-900">Emma Watson</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-2 font-semibold text-slate-900">emma@example.com</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Member since</p>
              <p className="mt-2 font-semibold text-slate-900">2024</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Rewards</p>
              <p className="mt-2 font-semibold text-slate-900">Gold reader</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
