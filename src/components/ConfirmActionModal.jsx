import React, { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";

const ConfirmActionModal = ({ open, title, message, onClose, onEdit, onDelete, busy }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!open) return;
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-6 py-8">
      <button type="button" aria-label="Tutup" className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={`relative w-full max-w-md neo-card bg-white p-6 sm:p-8 border-2 border-black shadow-[10px_10px_0px_0px_rgba(23,23,23,1)] transition-all duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <button
          type="button"
          aria-label="Tutup"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center bg-pastel-yellow"
        >
          <X size={20} weight="bold" />
        </button>

        <div className="inline-flex w-fit self-start px-4 py-2 bg-pastel-lavender border-2 border-black rounded-full mb-5">
          <span className="text-xs font-black uppercase tracking-widest">{title}</span>
        </div>

        <h2 className="text-2xl font-black tracking-tight leading-none mb-2">Konfirmasi</h2>
        <p className="text-sm font-medium text-[#404040] mb-6">{message}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={onEdit}
            className="neo-button bg-pastel-mint w-full"
          >
            Edit
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={onDelete}
            className="neo-button bg-pastel-peach w-full"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
