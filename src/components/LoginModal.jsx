import React, { useEffect, useState } from "react";
import { FingerprintSimple, X } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { canLoginThisSession, getCredentialId, setCredentialId, setIsAuthed } from "@/auth/storage";
import { authenticateWithCredentialId, isWebAuthnSupported, registerPlatformCredential } from "@/auth/webauthn";

const LoginModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [hasCred, setHasCred] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!open) return;
    setError("");
    setBusy(false);
    const coarse = window.matchMedia ? window.matchMedia("(pointer: coarse)").matches : false;
    const small = typeof window !== "undefined" ? window.innerWidth < 768 : false;
    const mobile = coarse || small;
    setIsMobile(mobile);
    setHasCred(mobile ? !!getCredentialId() : false);
    setEmail("");
    setPassword("");
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const onRegister = async () => {
    setError("");
    if (!isWebAuthnSupported()) {
      setError("Browser/perangkat tidak mendukung verifikasi sidik jari.");
      return;
    }
    setBusy(true);
    try {
      const credId = await registerPlatformCredential();
      setCredentialId(credId);
      setHasCred(true);
    } catch (e) {
      setError(e?.message || "Gagal mendaftarkan sidik jari.");
    } finally {
      setBusy(false);
    }
  };

  const onLogin = async () => {
    setError("");
    if (!canLoginThisSession()) {
      setError("Sudah masuk di sesi lain. Silakan keluar dari sesi tersebut terlebih dahulu.");
      return;
    }
    if (!isWebAuthnSupported()) {
      setError("Browser/perangkat tidak mendukung verifikasi sidik jari.");
      return;
    }
    const credId = getCredentialId();
    setBusy(true);
    try {
      await authenticateWithCredentialId(credId);
      setIsAuthed(true);
      onClose();
      navigate("/dashboard");
    } catch (e) {
      setError(e?.message || "Gagal verifikasi sidik jari.");
    } finally {
      setBusy(false);
    }
  };

  const onDesktopLogin = async () => {
    setError("");
    if (!canLoginThisSession()) {
      setError("Sudah masuk di sesi lain. Silakan keluar dari sesi tersebut terlebih dahulu.");
      return;
    }
    setBusy(true);
    try {
      const e = (email || "").trim().toLowerCase();
      const p = password || "";
      if (e !== "admin@gmail.com" || p !== "admin123") {
        setError("Email atau password salah.");
        return;
      }
      setIsAuthed(true);
      onClose();
      navigate("/dashboard");
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-6">
      <button
        type="button"
        aria-label="Tutup"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-md neo-card bg-white p-6 sm:p-8 border-2 border-black shadow-[10px_10px_0px_0px_rgba(23,23,23,1)] transition-all duration-200 ${
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

        <div className="inline-block px-4 py-2 bg-pastel-lavender border-2 border-black rounded-full mb-5">
          <span className="text-xs font-black uppercase tracking-widest">Masuk</span>
        </div>

        <h2 className="text-3xl font-black tracking-tight leading-none mb-2">Masuk sebagai Pengurus</h2>
        <p className="text-sm font-medium text-[#404040] mb-6">
          {isMobile
            ? "Gunakan verifikasi sidik jari (WebAuthn/Passkey) dari perangkat kamu."
            : "Masuk menggunakan email dan password."}
        </p>

        <div className="space-y-3">
          {isMobile ? (
            <>
              {!hasCred ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={onRegister}
                  className="neo-button w-full flex items-center justify-center gap-2 bg-pastel-mint"
                >
                  <FingerprintSimple size={22} weight="bold" />
                  <span>{busy ? "Memproses..." : "Daftarkan Sidik Jari"}</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  onClick={onLogin}
                  className="neo-button w-full flex items-center justify-center gap-2 bg-pastel-yellow"
                >
                  <FingerprintSimple size={22} weight="bold" />
                  <span>{busy ? "Memproses..." : "Fingerprint"}</span>
                </button>
              )}
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-black uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="neo-input w-full"
                  placeholder="admin@gmail.com"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wider mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="neo-input w-full"
                  placeholder="admin123"
                />
              </div>
              <button
                type="button"
                disabled={busy}
                onClick={onDesktopLogin}
                className="neo-button w-full flex items-center justify-center gap-2 bg-pastel-yellow"
              >
                <span>{busy ? "Memproses..." : "Masuk"}</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/daftar");
            }}
            className="neo-button w-full bg-white hover:bg-pastel-peach"
          >
            Daftar Anggota
          </button>
        </div>

        {error && (
          <div className="mt-4 neo-card p-4 bg-pastel-peach border-2 border-black">
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        <div className="mt-5 text-xs font-medium text-[#404040]">
          {isMobile
            ? hasCred
              ? "Sidik jari sudah terdaftar di perangkat ini."
              : "Sidik jari belum terdaftar."
            : "Login desktop menggunakan email & password."}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
