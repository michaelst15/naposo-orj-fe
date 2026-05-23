import React, { useEffect, useState } from "react";
import { FingerprintSimple, Trash } from "@phosphor-icons/react";
import { clearCredentialId, getCredentialId, setCredentialId } from "@/auth/storage";
import { isWebAuthnSupported, registerPlatformCredential } from "@/auth/webauthn";

const DashboardVerifikasiMasuk = () => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [cred, setCred] = useState("");

  useEffect(() => {
    setCred(getCredentialId());
  }, []);

  const onRegister = async () => {
    setError("");
    if (!isWebAuthnSupported()) {
      setError("Browser/perangkat tidak mendukung verifikasi sidik jari.");
      return;
    }
    setBusy(true);
    try {
      const id = await registerPlatformCredential();
      setCredentialId(id);
      setCred(id);
    } catch (e) {
      setError(e?.message || "Gagal mendaftarkan sidik jari.");
    } finally {
      setBusy(false);
    }
  };

  const onClear = () => {
    clearCredentialId();
    setCred("");
  };

  return (
    <div className="space-y-6" data-testid="dashboard-verifikasi-masuk">
      <div className="neo-card p-6 bg-white">
        <div className="inline-block px-4 py-2 bg-pastel-lavender border-2 border-black rounded-full mb-4">
          <span className="text-xs font-black uppercase tracking-widest">Keamanan</span>
        </div>
        <h2 className="text-3xl font-black tracking-tight leading-none">Verifikasi Masuk</h2>
        <p className="text-sm font-medium text-[#404040] mt-2">
          Daftarkan sidik jari (WebAuthn/Passkey) untuk perangkat ini.
        </p>
      </div>

      <div className="neo-card p-6 bg-white">
        <div className="text-sm font-black uppercase tracking-widest mb-3">Status</div>
        <div className="font-bold">{cred ? "Terdaftar" : "Belum terdaftar"}</div>
        {cred && <div className="text-xs font-medium text-[#404040] mt-2 break-all">{cred}</div>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          disabled={busy}
          onClick={onRegister}
          className="neo-button bg-pastel-yellow w-full flex items-center justify-center gap-2"
        >
          <FingerprintSimple size={22} weight="bold" />
          <span>{busy ? "Memproses..." : "Daftarkan / Perbarui"}</span>
        </button>
        <button
          type="button"
          disabled={busy || !cred}
          onClick={onClear}
          className="neo-button bg-white hover:bg-pastel-peach w-full flex items-center justify-center gap-2"
        >
          <Trash size={22} weight="bold" />
          <span>Hapus</span>
        </button>
      </div>

      {error && (
        <div className="neo-card p-6 bg-pastel-peach">
          <p className="font-bold">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardVerifikasiMasuk;

