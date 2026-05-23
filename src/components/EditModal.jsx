import React, { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";

const EditModal = ({ open, title, fields, initialValues, onClose, onSubmit, busy }) => {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!open) return;
    setMounted(false);
    setForm(initialValues || {});
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, [open, initialValues]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const setValue = (key) => (e) => {
    const value = e?.target?.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setFileValue = (key) => (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, [key]: String(reader.result || "") }));
    };
    reader.readAsDataURL(file);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-6 py-8">
      <button type="button" aria-label="Tutup" className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={`relative w-full max-w-lg neo-card bg-white p-6 sm:p-8 border-2 border-black shadow-[10px_10px_0px_0px_rgba(23,23,23,1)] transition-all duration-200 max-h-[calc(100vh-4rem)] flex flex-col ${
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

        <div className="inline-flex w-fit self-start px-4 py-2 bg-pastel-yellow border-2 border-black rounded-full mb-5">
          <span className="text-xs font-black uppercase tracking-widest">{title}</span>
        </div>

        <h2 className="text-2xl font-black tracking-tight leading-none mb-6">Edit Data</h2>

        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.key} className={f.fullWidth ? "md:col-span-2" : ""}>
                <label className="block text-xs font-black uppercase tracking-wider mb-2">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    value={form?.[f.key] ?? ""}
                    onChange={setValue(f.key)}
                    className="neo-input w-full min-h-[120px]"
                  />
                ) : f.type === "image" ? (
                  <div className="space-y-3">
                    <input type="file" accept="image/*" onChange={setFileValue(f.key)} className="neo-input w-full" />
                    {form?.[f.key] ? (
                      <div className="border-2 border-black rounded-xl bg-white p-3">
                        <img
                          src={String(form?.[f.key] ?? "")}
                          alt={f.label}
                          className="w-full max-h-[260px] object-contain rounded-lg"
                        />
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <input
                    type={f.type || "text"}
                    value={form?.[f.key] ?? ""}
                    onChange={setValue(f.key)}
                    className="neo-input w-full"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button type="button" disabled={busy} onClick={onClose} className="neo-button bg-white hover:bg-pastel-peach">
            Batal
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => onSubmit?.(form)}
            className="neo-button bg-pastel-mint"
          >
            {busy ? "Menyimpan..." : "Selesai"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
