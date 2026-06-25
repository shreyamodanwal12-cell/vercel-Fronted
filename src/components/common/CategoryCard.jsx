export default function CategoryCard({ category }) {
   console.log(category);
  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-150 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
  
 <p style={{ color: "red", fontSize: "20px" }}>
  {category.image}
</p>
     <img
  src={`/images/${category.image}`}
  alt={category.title}
  className="h-full w-full object-cover"
  onError={(e) => {
    console.log("Image not found:", category.image);
    e.target.src = "/images/1.jpg";
  }}
/>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">{category.description}</p>
      </div>
      
    </article>
  );
}