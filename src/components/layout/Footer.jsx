import { Link } from 'react-router-dom';

const footerNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Categories', href: '/categories' },
  { label: 'Authors', href: '/authors' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900">iBid.</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
              A premium book marketplace for collectors, readers and creators.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-800">Explore</p>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              {footerNavigation.map((item) => (
                <Link key={item.href} to={item.href} className="block hover:text-slate-900">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-800">Contact</p>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p>support@ibid.com</p>
              <p>+1 (541) 754-3010</p>
              <p>123 Reading Ave, New York</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-800">Newsletter</p>
            <p className="mt-5 text-sm text-slate-600">Get weekly book recommendations and exclusive deals.</p>
            <form className="mt-5 flex flex-col gap-3">
              <input type="email" placeholder="Your email address" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500" />
              <button className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-16 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          © 2026 iBid. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
