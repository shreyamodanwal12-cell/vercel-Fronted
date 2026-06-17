export default function CategoryCard({ category }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
  
  <p>{category.image}</p>
      <img
  src={category.image}
  alt={category.title}
  className="h-full w-full object-cover"
  onError={(e) => {
    console.log("Image Error:", category.image);
    console.log(e);
  }}
/>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">{category.description}</p>
      </div>
    </article>
  );
}
