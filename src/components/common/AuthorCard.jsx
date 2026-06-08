export default function AuthorCard({ author }) {
  return (
    <article className="rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <img src={author.avatar} alt={author.name} className="mx-auto mb-5 h-28 w-28 rounded-full object-cover" />
      <h3 className="text-xl font-semibold text-slate-900">{author.name}</h3>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-orange-600">{author.role}</p>
      <p className="mt-4 text-sm leading-6 text-slate-500">{author.bio}</p>
    </article>
  );
}
