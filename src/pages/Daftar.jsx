import React, { useState } from "react";
import axios from "axios";
import { CheckCircle, PaperPlaneRight } from "@phosphor-icons/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
const API = (BACKEND_URL ? `${BACKEND_URL}`.replace(/\/$/, "") : "") + "/api";

const Daftar = () => {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    angkatan: "",
    alasan: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await axios.post(`${API}/registrations`, form);
      setSubmitted(true);
      setForm({
        nama: "",
        email: "",
        telepon: "",
        angkatan: "",
        alasan: ""
      });
    } catch (err) {
      setError("Gagal mengirim pendaftaran. Pastikan backend berjalan dan URL sudah benar.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-12" data-testid="daftar-page">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-pastel-yellow border-2 border-black rounded-full mb-6">
            <span className="text-xs font-black uppercase tracking-widest">Pendaftaran</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4">GABUNG NAPOSO ORJ</h1>
          <p className="text-base md:text-lg font-medium text-[#404040] max-w-2xl mx-auto">
            Isi formulir berikut untuk mendaftar. Tim kami akan menghubungi kamu setelah data diterima.
          </p>
        </div>

        {submitted && (
          <div
            className="neo-card p-6 bg-pastel-mint mb-6 flex items-start gap-3"
            data-testid="daftar-success"
          >
            <CheckCircle size={28} weight="bold" />
            <div>
              <p className="font-black uppercase tracking-wide">Pendaftaran terkirim</p>
              <p className="text-sm font-medium text-[#404040]">
                Terima kasih! Kami akan menghubungi kamu secepatnya.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="neo-card p-6 bg-pastel-peach mb-6" data-testid="daftar-error">
            <p className="font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="neo-card p-6 bg-white" data-testid="daftar-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-2">Nama</label>
              <input
                value={form.nama}
                onChange={onChange("nama")}
                required
                className="neo-input w-full"
                placeholder="Nama lengkap"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-2">Angkatan</label>
              <input
                value={form.angkatan}
                onChange={onChange("angkatan")}
                required
                className="neo-input w-full"
                placeholder="Contoh: 2023"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={onChange("email")}
                required
                className="neo-input w-full"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-2">Telepon</label>
              <input
                value={form.telepon}
                onChange={onChange("telepon")}
                required
                className="neo-input w-full"
                placeholder="08xxxxxxxxxx"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-black uppercase tracking-wider mb-2">Alasan Bergabung</label>
            <textarea
              value={form.alasan}
              onChange={onChange("alasan")}
              required
              rows={5}
              className="neo-input w-full"
              placeholder="Ceritakan alasan kamu ingin bergabung..."
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="neo-button flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              data-testid="daftar-submit"
            >
              <span>{submitting ? "Mengirim..." : "Kirim Pendaftaran"}</span>
              <PaperPlaneRight size={18} weight="bold" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Daftar;
