import { useEffect, useState } from "react";
import CategoryCard from "../components/common/CategoryCard";
import { apiFetch } from "../utils/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await apiFetch("/api/categories");
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Categories
          </p>

          <h1 className="mt-4 text-5xl font-bold text-slate-900">
            Explore Books by Category
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Browse our collection of books across multiple categories.
            Discover new stories, educational books, novels, comics and much
            more.
          </p>

        </div>
      </section>

      {/* STATS */}
      <div className="mx-auto max-w-7xl px-6 pt-10">

        <div className="mb-10 rounded-3xl bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                Available Categories
              </h2>

              <p className="mt-2 text-slate-500">
                Choose a category to explore books.
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 px-8 py-5 text-center">

              <p className="text-sm text-slate-500">
                Total Categories
              </p>

              <h2 className="mt-1 text-4xl font-bold text-orange-600">
                {categories.length}
              </h2>

            </div>

          </div>

        </div>

        {/* CATEGORY GRID */}

        {categories.length === 0 ? (

          <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

            <h2 className="text-2xl font-semibold text-slate-800">
              No Categories Found
            </h2>

            <p className="mt-3 text-slate-500">
              Categories will appear here once they are added by the admin.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
}