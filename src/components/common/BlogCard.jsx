import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/blog/${post.slug}`}>
        <img src={post.image} alt={post.title} className="h-56 w-full object-cover" />
      </Link>
      <div className="p-6">
        <div className="mb-3 text-xs uppercase tracking-[0.3em] text-orange-600">{post.category}</div>
        <Link to={`/blog/${post.slug}`} className="text-xl font-semibold text-slate-900 hover:text-orange-600">
          {post.title}
        </Link>
        <p className="mt-3 text-sm leading-6 text-slate-500">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </article>
  );
}
