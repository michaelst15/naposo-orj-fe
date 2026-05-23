import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearAuth, getIsAuthed } from "@/auth/storage";
import { List, X } from "@phosphor-icons/react";

const items = [
  { name: "Pengurus", path: "/dashboard/pengurus" },
  { name: "Naposo", path: "/dashboard/naposo" },
  { name: "Aktivitas", path: "/dashboard/aktivitas" },
  { name: "Galeri", path: "/dashboard/galeri" },
  { name: "Pendaftaran", path: "/dashboard/pendaftaran" },
  { name: "Verifikasi Masuk", path: "/dashboard/verifikasi-masuk" }
];

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("mobile-menu-open");
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.classList.remove("mobile-menu-open");
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[#FAFAF9]" data-testid="dashboard-layout">
      <div className="border-b-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-pastel-yellow border-2 border-black rounded-lg flex items-center justify-center">
              <span className="text-xs font-black">N.ORJ</span>
            </div>
            <div>
              <div className="text-xl font-black leading-none">Dashboard</div>
              <div className="text-xs font-bold text-[#404040]">Naposo ORJ</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Menu dashboard"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center bg-pastel-yellow"
            >
              <List size={24} weight="bold" />
            </button>

            {getIsAuthed() && (
              <button
                type="button"
                className="neo-button bg-white hover:bg-pastel-peach"
                onClick={() => {
                  clearAuth();
                  navigate("/");
                }}
              >
                Keluar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="neo-card p-4 bg-white">
              <div className="text-xs font-black uppercase tracking-widest mb-4">Menu</div>
              <div className="space-y-2">
                {items.map((it) => {
                  const active = location.pathname === it.path;
                  return (
                    <Link
                      key={it.path}
                      to={it.path}
                      className={`block px-4 py-3 font-bold rounded-lg border-2 transition-colors ${
                        active ? "bg-pastel-yellow border-black" : "border-black bg-white hover:bg-pastel-mint"
                      }`}
                    >
                      {it.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-9">
            <Outlet />
          </main>
        </div>
      </div>

      {menuOpen &&
        (typeof document !== "undefined"
          ? createPortal(
              <div className="lg:hidden fixed inset-0 z-[999]" data-testid="dashboard-mobile-menu">
                <div className="absolute inset-0 bg-black/20" onClick={() => setMenuOpen(false)} />
                <div className="relative h-full bg-white/85">
                  <div className="border-b-2 border-black bg-white/80">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-pastel-yellow border-2 border-black rounded-lg flex items-center justify-center">
                          <span className="text-xs font-black">N.ORJ</span>
                        </div>
                        <span className="text-xl font-black tracking-tight">Dashboard</span>
                      </div>
                      <button
                        type="button"
                        aria-label="Tutup menu"
                        onClick={() => setMenuOpen(false)}
                        className="w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center bg-pastel-yellow"
                      >
                        <X size={24} weight="bold" />
                      </button>
                    </div>
                  </div>

                  <div className="max-w-7xl mx-auto px-6 py-6 space-y-3 overflow-y-auto h-[calc(100vh-82px)]">
                    {items.map((it) => {
                      const active = location.pathname === it.path;
                      return (
                        <Link
                          key={it.path}
                          to={it.path}
                          onClick={() => setMenuOpen(false)}
                          className={`block px-4 py-4 font-bold rounded-lg border-2 ${
                            active ? "bg-pastel-yellow border-black" : "border-black bg-white hover:bg-pastel-mint"
                          }`}
                        >
                          {it.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>,
              document.body
            )
          : null)}
    </div>
  );
};

export default DashboardLayout;
