import AuthorCard from '../components/common/AuthorCard';
import { authors } from '../data/authors';

export default function Authors() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Author network</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Discover creators and storytellers</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {authors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    </div>
  );
}
