import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getIsAuthed, touchActiveSession } from "@/auth/storage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import Pengurus from "@/pages/Pengurus";
import Aktivitas from "@/pages/Aktivitas";
import Naposo from "@/pages/Naposo";
import Galeri from "@/pages/Galeri";
import Daftar from "@/pages/Daftar";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import DashboardPengurus from "@/pages/dashboard/DashboardPengurus";
import DashboardNaposo from "@/pages/dashboard/DashboardNaposo";
import DashboardAktivitas from "@/pages/dashboard/DashboardAktivitas";
import DashboardGaleri from "@/pages/dashboard/DashboardGaleri";
import DashboardPendaftaran from "@/pages/dashboard/DashboardPendaftaran";
import DashboardVerifikasiMasuk from "@/pages/dashboard/DashboardVerifikasiMasuk";

const AppShell = () => {
  const location = useLocation();
  const [loginOpen, setLoginOpen] = useState(false);

  const isDashboardRoute = useMemo(() => location.pathname.startsWith("/dashboard"), [location.pathname]);

  useEffect(() => {
    if (!getIsAuthed()) return;
    touchActiveSession();
    const interval = setInterval(() => touchActiveSession(), 30000);
    const onVis = () => touchActiveSession();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [location.pathname]);

  if (getIsAuthed() && !isDashboardRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      {!isDashboardRoute && <Navbar onOpenLogin={() => setLoginOpen(true)} />}
      {!isDashboardRoute && <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pengurus" element={<Pengurus />} />
        <Route path="/aktivitas" element={<Aktivitas />} />
        <Route path="/naposo" element={<Naposo />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/daftar" element={<Daftar />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="pengurus" element={<DashboardPengurus />} />
          <Route path="naposo" element={<DashboardNaposo />} />
          <Route path="aktivitas" element={<DashboardAktivitas />} />
          <Route path="galeri" element={<DashboardGaleri />} />
          <Route path="pendaftaran" element={<DashboardPendaftaran />} />
          <Route path="verifikasi-masuk" element={<DashboardVerifikasiMasuk />} />
        </Route>
      </Routes>

      {!isDashboardRoute && <Footer />}
    </>
  );
};

export default AppShell;
