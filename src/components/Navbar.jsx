import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Utama", path: "/" },
    { name: "Pengurus", path: "/pengurus" },
    { name: "Aktivitas", path: "/aktivitas" },
    { name: "Naposo ORJ", path: "/naposo" },
    { name: "Galeri", path: "/galeri" },
    { name: "Daftar", path: "/daftar" }
  ];

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
          <div className="md:hidden mt-4 pb-4 space-y-2" data-testid="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 font-bold rounded-lg border-2 ${
                  location.pathname === link.path
                    ? "bg-pastel-yellow border-black"
                    : "border-black bg-white hover:bg-pastel-mint"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
