import { Link } from 'react-router-dom';
import BlogCard from '../components/common/BlogCard';
import { blogs } from '../data/blogs';

export default function Blog() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.28em] text-orange-600">From the blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Reading inspiration and book news</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((post) => (
          <BlogCard key={post.slug} blog={post} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link to="/contact" className="inline-flex rounded-full bg-orange-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-orange-600">
          Contact our team
        </Link>
      </div>
    </div>
  );
}
