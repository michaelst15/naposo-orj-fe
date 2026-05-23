import React from "react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div className="space-y-6" data-testid="dashboard-home">
      <div className="neo-card p-6 bg-white">
        <div className="inline-block px-4 py-2 bg-pastel-mint border-2 border-black rounded-full mb-4">
          <span className="text-xs font-black uppercase tracking-widest">Pengurus</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight leading-none mb-2">Selamat Datang</h1>
        <p className="text-base font-medium text-[#404040]">
          Kelola data Pengurus, Anggota, Aktivitas, Galeri, dan Pendaftaran.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/dashboard/pengurus" className="neo-card p-6 bg-pastel-yellow border-2 border-black">
          <div className="text-sm font-black uppercase tracking-widest mb-2">Pengurus</div>
          <div className="text-2xl font-black">Lihat & Kelola</div>
        </Link>
        <Link to="/dashboard/naposo" className="neo-card p-6 bg-pastel-lavender border-2 border-black">
          <div className="text-sm font-black uppercase tracking-widest mb-2">Naposo</div>
          <div className="text-2xl font-black">Lihat & Kelola</div>
        </Link>
        <Link to="/dashboard/aktivitas" className="neo-card p-6 bg-pastel-mint border-2 border-black">
          <div className="text-sm font-black uppercase tracking-widest mb-2">Aktivitas</div>
          <div className="text-2xl font-black">Lihat & Kelola</div>
        </Link>
        <Link to="/dashboard/pendaftaran" className="neo-card p-6 bg-pastel-peach border-2 border-black">
          <div className="text-sm font-black uppercase tracking-widest mb-2">Pendaftaran</div>
          <div className="text-2xl font-black">Lihat & Kelola</div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;

