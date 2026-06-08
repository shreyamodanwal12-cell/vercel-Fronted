export default function Pagination({ currentPage, pageSize, totalItems, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 rounded-full bg-white px-4 py-4 shadow-soft">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`min-w-[44px] rounded-full px-4 py-2 text-sm font-semibold transition ${
            page === currentPage ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
