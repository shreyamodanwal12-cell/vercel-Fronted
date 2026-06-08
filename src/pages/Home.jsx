import { motion } from 'framer-motion';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { books } from '../data/books';
import { banners } from '../data/banners';
import { categories } from '../data/categories';
import { authors } from '../data/authors';
import { testimonials } from '../data/testimonials';
import ProductCard from '../components/common/ProductCard';
import CategoryCard from '../components/common/CategoryCard';
import AuthorCard from '../components/common/AuthorCard';
import Modal from '../components/ui/Modal';

export default function Home() {
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [subscriber, setSubscriber] = useState('');
  const featured = books.slice(0, 4);
  const bestSellers = books.slice(0, 3);

  const handleSubscribe = (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    if (!email) return;
    setSubscriber(email);
    setSubscribeOpen(true);
    event.target.reset();
  };

  return (
    <div className="space-y-20 py-10 lg:py-16">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="rounded-[32px] overflow-hidden shadow-soft"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative h-[420px] bg-slate-900 text-white sm:h-[520px]">
                <img src={banner.image} alt={banner.title} className="absolute inset-0 h-full w-full object-cover opacity-70" />
                <div className="relative mx-auto flex h-full max-w-7xl items-center p-6 sm:p-10 lg:p-16">
                  <div className="max-w-2xl space-y-6 rounded-3xl bg-slate-950/40 p-8 backdrop-blur-xl sm:p-12">
                    <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Limited deal</p>
                    <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{banner.title}</h1>
                    <p className="max-w-xl text-base text-slate-200 sm:text-lg">{banner.subtitle}</p>
                    <Link to={banner.href} className="inline-flex rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">
                      {banner.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-600">Top selection</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Featured books for every shelf</h2>
          </div>
          <Link to="/shop" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
            View all books
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((book) => (
            <ProductCard key={book.slug} book={book} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-600">Bestsellers</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Readers love these picks</h2>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {bestSellers.map((book) => (
              <ProductCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-600">Discover</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Shop by category</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.32em] text-orange-300">Author spotlight</p>
              <h2 className="text-4xl font-semibold tracking-tight">Meet the authors behind our favorite stories</h2>
              <p className="max-w-xl text-base leading-8 text-slate-300">A curated selection of authors creating rich worlds, memorable characters, and page-turning experiences.</p>
              <Link to="/authors" className="inline-flex rounded-full bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600">Explore authors</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {authors.slice(0, 4).map((author) => (
                <div key={author.id} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <img src={author.avatar} alt={author.name} className="mb-4 h-20 w-20 rounded-full object-cover" />
                  <h3 className="text-xl font-semibold">{author.name}</h3>
                  <p className="mt-2 text-sm text-slate-300">{author.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-600">Blog</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Latest stories & reading tips</h2>
          </div>
          <Link to="/blog" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
            Read our blog
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div key={testimonial.id} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
              <p className="text-slate-600">“{testimonial.feedback}”</p>
              <div className="mt-6">
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-sm uppercase tracking-[0.36em] text-orange-300">Stay updated</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Never miss the latest releases</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">Subscribe for curated book recommendations, new arrivals and exclusive offers from iBid.</p>
          <form onSubmit={handleSubscribe} className="mx-auto mt-8 flex max-w-xl flex-col gap-4 sm:flex-row">
            <input name="email" type="email" placeholder="Enter your email address" className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white/10 px-5 py-4 text-slate-900 outline-none placeholder:text-slate-500 focus:border-orange-500 focus:bg-white" />
            <button type="submit" className="rounded-full bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600">Subscribe</button>
          </form>
        </div>
      </section>
      <Modal
        open={subscribeOpen}
        title="Subscription confirmed"
        message={`Thanks for subscribing! We’ll send the latest book updates to ${subscriber}.`}
        onClose={() => setSubscribeOpen(false)}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-orange-600">Gallery</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Discover the reading lifestyle</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1473755504818-b72b6dfdc4b5?auto=format&fit=crop&w=900&q=80',
          ].map((src) => (
            <div key={src} className="overflow-hidden rounded-[32px] bg-slate-100 shadow-soft">
              <img src={src} alt="Gallery" className="h-72 w-full object-cover transition duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
