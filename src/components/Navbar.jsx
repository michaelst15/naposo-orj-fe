import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { CaretDown, List, X } from "@phosphor-icons/react";

const Navbar = ({ onOpenLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const desktopAuthRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { name: "Utama", path: "/" },
    { name: "Pengurus", path: "/pengurus" },
    { name: "Aktivitas", path: "/aktivitas" },
    { name: "Naposo ORJ", path: "/naposo" },
    { name: "Galeri", path: "/galeri" }
  ];

  useEffect(() => {
    setAuthOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("mobile-menu-open");
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.classList.remove("mobile-menu-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!authOpen) return;
      const desktopEl = desktopAuthRef.current;
      if (desktopEl && desktopEl.contains(e.target)) return;
      setAuthOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [authOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-black animate-fade-down" data-testid="main-navbar">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <div className="w-12 h-12 bg-pastel-yellow border-2 border-black rounded-lg flex items-center justify-center transition-transform duration-150 hover:-translate-y-0.5">
              <span className="text-xs font-black">N.ORJ</span>
            </div>
            <span className="text-xl font-black tracking-tight hidden sm:block">NAPOSO ORJ</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
                className={`px-4 py-2 font-bold text-sm rounded-lg border-2 border-transparent transition-all duration-150 ${
                  location.pathname === link.path
                    ? "bg-pastel-yellow border-black"
                    : "hover:bg-pastel-mint hover:border-black"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="relative" ref={desktopAuthRef}>
              <button
                type="button"
                onClick={() => setAuthOpen((v) => !v)}
                className={`px-4 py-2 font-bold text-sm rounded-lg border-2 transition-all duration-150 flex items-center gap-2 ${
                  location.pathname === "/daftar"
                    ? "bg-pastel-yellow border-black"
                    : "border-transparent hover:bg-pastel-mint hover:border-black"
                }`}
              >
                <span>Daftar</span>
                <CaretDown size={16} weight="bold" />
              </button>

              {authOpen && (
                <div className="absolute right-0 mt-2 w-56 neo-card bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(23,23,23,1)] overflow-hidden">
                  <Link to="/daftar" className="block px-4 py-3 font-bold hover:bg-pastel-yellow border-b-2 border-black">
                    Daftar
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthOpen(false);
                      onOpenLogin?.();
                    }}
                    className="w-full text-left px-4 py-3 font-bold hover:bg-pastel-mint"
                  >
                    Masuk
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            data-testid="mobile-menu-button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center bg-pastel-yellow"
          >
            {isOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>

        {isOpen && (
          typeof document !== "undefined"
            ? createPortal(
                <div className="md:hidden fixed inset-0 z-[999]" data-testid="mobile-menu">
                  <div
                    className="absolute inset-0 bg-black/20"
                    onClick={() => setIsOpen(false)}
                  />
                  <div className="relative h-full bg-white/85">
                    <div className="border-b-2 border-black bg-white/80">
                      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <Link
                          to="/"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3"
                          data-testid="mobile-menu-logo-link"
                        >
                          <div className="w-12 h-12 bg-pastel-yellow border-2 border-black rounded-lg flex items-center justify-center">
                            <span className="text-xs font-black">N.ORJ</span>
                          </div>
                          <span className="text-xl font-black tracking-tight">NAPOSO ORJ</span>
                        </Link>
                        <button
                          type="button"
                          aria-label="Tutup menu"
                          onClick={() => setIsOpen(false)}
                          className="w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center bg-pastel-yellow"
                        >
                          <X size={24} weight="bold" />
                        </button>
                      </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 py-6 space-y-3 overflow-y-auto h-[calc(100vh-82px)]">
                      {navLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-4 font-bold rounded-lg border-2 ${
                            location.pathname === link.path
                              ? "bg-pastel-yellow border-black"
                              : "border-black bg-white hover:bg-pastel-mint"
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}

                      <Link
                        to="/daftar"
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-4 font-bold rounded-lg border-2 ${
                          location.pathname === "/daftar"
                            ? "bg-pastel-yellow border-black"
                            : "border-black bg-white hover:bg-pastel-mint"
                        }`}
                      >
                        Daftar
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          onOpenLogin?.();
                        }}
                        className="w-full text-left px-4 py-4 font-bold rounded-lg border-2 border-black bg-white hover:bg-pastel-mint"
                      >
                        Masuk
                      </button>
                    </div>
                  </div>
                </div>,
                document.body
              )
            : null
        )}
      </div>
    </nav>
  );
};

export default Navbar;
