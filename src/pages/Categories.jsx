import CategoryCard from '../components/common/CategoryCard';
import { categories } from '../data/categories';

export default function Categories() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Browse categories</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Explore genres and formats</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
