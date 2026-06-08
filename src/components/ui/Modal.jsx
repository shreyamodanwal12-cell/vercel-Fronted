import React from "react";

export default function Modal({ open, title, message, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="text-slate-600">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex w-full justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
