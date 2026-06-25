export default function CategoryCard({ category }) {
   console.log(category);
  return (
<<<<<<< HEAD
    <article className="group overflow-hidden rounded-[28px] border border-slate-150 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
=======
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
>>>>>>> 207c6875c5f7fac0f61198e82cfba31ecfb76bea
  
 <p style={{ color: "red", fontSize: "20px" }}>
  {category.image}
</p>
     <img
  src={`/images/${category.image}`}
  alt={category.title}
  className="h-full w-full object-cover"
  onError={(e) => {
    console.log("Image not found:", category.image);
<<<<<<< HEAD
    e.target.src = "/images/1.jpg";
=======
    e.target.src = "/images/coff.jpg";
>>>>>>> 207c6875c5f7fac0f61198e82cfba31ecfb76bea
  }}
/>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">{category.description}</p>
      </div>
      
    </article>
  );
}