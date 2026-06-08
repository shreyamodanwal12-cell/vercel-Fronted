import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-600">About iBid</p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-900">A modern marketplace for book lovers</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">iBid brings together recommended books, comics, and editorial content in a polished shopping experience. Our curated storefront helps you find the right read for every mood and interest.</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[32px] bg-slate-50 p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-orange-600">Our mission</p>
              <p className="mt-3 text-sm text-slate-600">Make discovering great books easy, inspiring and delightful for every reader.</p>
            </div>
            <div className="rounded-[32px] bg-slate-50 p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-orange-600">What we offer</p>
              <p className="mt-3 text-sm text-slate-600">A handpicked catalogue, author spotlights, real reviews and fast checkout in one trusted site.</p>
            </div>
          </div>
        </div>
        <div className="rounded-[32px] bg-slate-900 p-10 text-white shadow-soft">
          <h2 className="text-3xl font-semibold">Start your reading journey</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">From emerging authors to popular collections, our team curates selections with care so you can find the next story worth sharing.</p>
          <div className="mt-8 grid gap-4">
            {['Fast delivery', 'Secure checkout', 'Expert recommendations'].map((item) => (
              <div key={item} className="rounded-3xl bg-white/10 p-5 text-sm text-slate-200">{item}</div>
            ))}
          </div>
          <Link to="/shop" className="mt-8 inline-flex rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
            Shop bestsellers
          </Link>
        </div>
      </div>
    </div>
  );
}
