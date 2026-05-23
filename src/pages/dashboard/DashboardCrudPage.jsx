import React, { useEffect, useMemo, useState } from "react";
import { api } from "@/api/client";
import { normalizeList } from "@/api/normalize";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import EditModal from "@/components/EditModal";

function compare(a, b) {
  if (a === b) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b));
}

const DashboardCrudPage = ({ title, badgeClass, resource, columns, fields, defaultSortKey, sortKeys, searchKeys }) => {
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(defaultSortKey || (sortKeys?.[0] || columns?.[0]?.key || "id"));
  const [sortDir, setSortDir] = useState("asc");

  const [selected, setSelected] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const resp = await api.get(resource);
      setItems(normalizeList(resp.data));
    } catch (e) {
      setError("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [resource]);

  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    let list = [...items];
    if (q) {
      const keys = (searchKeys && searchKeys.length ? searchKeys : columns.map((c) => c.key)).filter(Boolean);
      list = list.filter((it) =>
        keys.some((k) => String(it?.[k] ?? "").toLowerCase().includes(q))
      );
    }
    list.sort((x, y) => {
      const c = compare(x?.[sortKey], y?.[sortKey]);
      return sortDir === "asc" ? c : -c;
    });
    return list;
  }, [items, query, sortKey, sortDir, columns, searchKeys]);

  const onRowClick = (it) => {
    setSelected(it);
    setConfirmOpen(true);
  };

  const onDelete = async () => {
    if (!selected) return;
    setBusy(true);
    setError("");
    try {
      await api.delete(`${resource}/${selected.id}`);
      setItems((prev) => prev.filter((x) => x.id !== selected.id));
      setConfirmOpen(false);
      setSelected(null);
    } catch (e) {
      setError("Gagal menghapus data.");
    } finally {
      setBusy(false);
    }
  };

  const onSubmitEdit = async (form) => {
    if (!selected) return;
    setBusy(true);
    setError("");
    try {
      const payload = {};
      fields.forEach((f) => {
        const v = form?.[f.key];
        payload[f.key] = f.type === "number" ? Number(v) : v;
      });
      const resp = await api.put(`${resource}/${selected.id}`, payload);
      const updated = resp?.data || { ...selected, ...payload };
      setItems((prev) => prev.map((x) => (x.id === selected.id ? updated : x)));
      setEditOpen(false);
      setConfirmOpen(false);
      setSelected(null);
    } catch (e) {
      setError("Gagal menyimpan perubahan.");
    } finally {
      setBusy(false);
    }
  };

  const sortOptions = (sortKeys && sortKeys.length ? sortKeys : columns.map((c) => c.key)).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="neo-card p-6 bg-white">
        <div className={`inline-block px-4 py-2 border-2 border-black rounded-full mb-4 ${badgeClass}`}>
          <span className="text-xs font-black uppercase tracking-widest">Dashboard</span>
        </div>
        <h2 className="text-3xl font-black tracking-tight leading-none">{title}</h2>
      </div>

      <div className="neo-card p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7">
            <label className="block text-xs font-black uppercase tracking-wider mb-2">Cari</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="neo-input w-full"
              placeholder="Ketik untuk mencari..."
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-black uppercase tracking-wider mb-2">Sortir</label>
            <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="neo-input w-full">
              {sortOptions.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex items-end">
            <button
              type="button"
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              className="neo-button w-full bg-white hover:bg-pastel-lavender"
            >
              {sortDir === "asc" ? "A → Z" : "Z → A"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="neo-card p-6 bg-pastel-peach">
          <p className="font-bold">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="neo-card p-6 bg-white">
          <p className="font-bold">Loading...</p>
        </div>
      ) : (
        <div className="neo-card p-6 bg-white overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-black">
                {columns.map((c) => (
                  <th key={c.key} className="py-3 pr-4 text-xs font-black uppercase tracking-widest">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((it) => (
                <tr
                  key={it.id}
                  onClick={() => onRowClick(it)}
                  className="border-b border-black/10 cursor-pointer hover:bg-pastel-mint/40"
                >
                  {columns.map((c) => (
                    <td key={c.key} className="py-3 pr-4 font-medium">
                      {c.render ? c.render(it?.[c.key], it) : String(it?.[c.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="pt-4 font-bold">Belum ada data.</div>}
        </div>
      )}

      <ConfirmActionModal
        open={confirmOpen}
        title={title}
        message="Silahkan konfirmasi terkait data yang dipilih"
        busy={busy}
        onClose={() => {
          if (busy) return;
          setConfirmOpen(false);
          setSelected(null);
        }}
        onEdit={() => {
          setEditOpen(true);
        }}
        onDelete={onDelete}
      />

      <EditModal
        open={editOpen}
        title={title}
        fields={fields}
        busy={busy}
        initialValues={selected || {}}
        onClose={() => {
          if (busy) return;
          setEditOpen(false);
        }}
        onSubmit={onSubmitEdit}
      />
    </div>
  );
};

export default DashboardCrudPage;
