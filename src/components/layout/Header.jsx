import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaShoppingBag, FaUser, FaHeart, FaTimes } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Categories', path: '/categories' },
  { label: 'Authors', path: '/authors' },
  { label: 'Blog', path: '/blog' },
  { label: 'Admin', path: '/admin' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const onSearch = (event) => {
    event.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    setSearch('');
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-orange-500 text-white text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <p>Free shipping on orders over $50.00 — Books delivered nationwide.</p>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-slate-100">Sign In</Link>
            <Link to="/register" className="font-semibold hover:text-slate-100">Register</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-3xl font-extrabold tracking-tight text-slate-900">iBid.</Link>
          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-orange-500 text-white' : 'text-slate-700 hover:bg-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={onSearch} className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              placeholder="Search books..."
            />
            <button type="submit" className="rounded-full bg-orange-500 px-3 py-2 text-white transition hover:bg-orange-600">
              <FaSearch />
            </button>
          </form>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/wishlist" className="text-slate-600 hover:text-slate-900" aria-label="Wishlist">
              <FaHeart />
            </Link>
            <Link to="/cart" className="relative text-slate-600 hover:text-slate-900" aria-label="Cart">
              <FaShoppingBag />
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-slate-300 hover:bg-slate-50">
              <FaUser /> Account
            </Link>
          </div>

          <button onClick={() => setIsOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden">
            <FaBars />
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-slate-900">iBid.</Link>
              <button onClick={() => setIsOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700">
                <FaTimes />
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className="rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-100">
                  {item.label}
                </Link>
              ))}
            </div>
            <form onSubmit={onSearch} className="mt-8 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                placeholder="Search books..."
              />
              <button type="submit" className="rounded-full bg-orange-500 px-3 py-2 text-white">
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </header>
  );
}
