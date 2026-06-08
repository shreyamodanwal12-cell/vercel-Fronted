import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogs.find((item) => item.slug === slug) || blogs[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <img src={post.image} alt={post.title} className="h-80 w-full rounded-[32px] object-cover" />
        <div className="mt-8 space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-600">{post.category}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{post.title}</h1>
          <p className="text-sm text-slate-500">By {post.author} • {post.date}</p>
          <p className="text-base leading-8 text-slate-600">{post.excerpt}</p>
          <div className="space-y-5 text-slate-600">
            <p>{post.content}</p>
            <p>{post.content}</p>
          </div>
        </div>
        <div className="mt-10">
          <Link to="/blog" className="inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
            Back to blog
          </Link>
        </div>
      </div>
    </div>
  );
}
